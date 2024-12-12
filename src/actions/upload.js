'use server'

import XLSX from "xlsx";
import reference from './reference.json';
import kpiBlueprints from './kpiBlueprints.json';
import { fun_indicators } from "./kpiFunctions";

export async function ParseData(file) {
    // Read sheet file from buffer
    const workbook = XLSX.read(file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Get doc general info
    const dates = worksheet.A3.v.replace("del ", "").split(" al ");
    const documentInfo = {
        init_date: dates[0],
        end_date: dates[1],
    }

    // Decode the file length for max_rows
    const rows = XLSX.utils.decode_range(worksheet['!ref']);
    const max_rows = rows.e.r;

    const dataBook = await TransformData(worksheet, max_rows);
    // console.log(dataBook);

    return dataBook;
}

export async function TransformData(worksheet, max_rows) {
    // Declare pointer variables 
    let account_num, account_name;
    let breaker, cargos, abonos, date;

    // Declare dynamic analytics data
    let groupedData = {};
    let sub_account = "000-00-000";
    let account_data = {};
    let data_cargos = {};
    let data_abonos = {};
    const data_reset = {
        ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
        jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
    };
    let accounts = ['000', '00', '000'];
    let account_group = 0;

    // Begin main for loop
    for (let i = 9; i < max_rows; i++) {
        // Get cell data related to account, account name and date
        account_num = worksheet[`A${i}`] || { v: ' ' };
        // account_name = worksheet[`B${i}`] || { v: ' ' };

        // Get cell data related to breakpoint, credit and debit
        breaker = worksheet[`E${i}`] || { v: ' ' };
        cargos = worksheet[`F${i}`] || { v: 0 };
        abonos = worksheet[`G${i}`] || { v: 0 };

        // Look for subaccounts
        if (account_num.v != ' ' && account_num.v.includes('-')) {
            // Set new account
            accounts = account_num.v.split('-');

            // Filter for sub- or micro-accounts
            if (accounts[1] !== '00') {
                sub_account = accounts[0] + '-' + accounts[1] + '-000';
                account_group = parseInt(accounts[0][0] + '00');
                if (account_group in groupedData) { }
                else {
                    groupedData[account_group] = {};
                }
                account_data = { year: 0, cargos: {}, abonos: {} };
                data_cargos = {
                    ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
                    jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
                };
                data_abonos = {
                    ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
                    jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
                };
            }
        }

        // Look for data and make the sum
        if (account_num.v != ' ' && account_num.v.includes('/')) {
            // Split dates found into an array
            date = account_num.v.split('/');

            // Store dates into variables
            let year = date[2];
            let month = date[1].toLowerCase();

            // Set the current data year
            account_data.year = year;

            // Set the data from 'cargos' in current month and total sum
            data_cargos[month] += cargos.v;
            data_cargos['sum'] += cargos.v;

            // Set the data from 'abonos' in current month and total sum
            data_abonos[month] += abonos.v;
            data_abonos['sum'] += abonos.v;
        }

        // Save data in dictionary when breakpoint appears
        if (breaker.v === "Total:" && account_data.year !== 0) {
            if (sub_account in groupedData[account_group]) {
                for (let months in data_reset) {
                    groupedData[account_group][sub_account].cargos[months] += data_cargos[months];
                    groupedData[account_group][sub_account].abonos[months] += data_abonos[months];
                }
            } else {
                account_data.cargos = data_cargos;
                account_data.abonos = data_abonos;
                groupedData[account_group][sub_account] = account_data;
            }
        }
    }

    return groupedData;
}

export async function ParseMetrics(dataBook, clientId) {
    // Declare global variables
    let db_metrics = [];
    let index_metrics = {};

    // Get the metrics conditions from json file
    const metrics_ref = reference.metrics;

    // Iterate over the metrics condition generation
    for (let line in metrics_ref) {
        // Temporal metric will act as row to append
        let tmp_metric = {};

        // Decalre requirements constraints
        let group = metrics_ref[line].group;
        let req = metrics_ref[line].requires;

        // Decalre group constraints
        let sums = metrics_ref[line].sums;
        let takes = metrics_ref[line].takes;

        let accounts;

        // Redirect to function with multiple groups
        if (Number.isInteger(group)) {
            // Declare the accounts to iterate from
            accounts = dataBook[group];
        } else {
            accounts = {};
            // Get accounts into a bigger book
            for (let idx in group) {
                let current_group = group[idx];
                let book = dataBook[current_group];
                for (let account in book) {
                    accounts[account] = book[account];
                }
            }
        }

        // Check for metric condition as group or requirements
        if (Number.isInteger(req)) {
            // Pass data to local function and extract temporal metric value
            tmp_metric = await sumByGroup(accounts, sums, takes);

        } else {
            // Pass data to local function and extract temporal metric value
            tmp_metric = await sumByReq(accounts, req, sums, takes);

        }

        // Add parameters to temporal metric variable
        tmp_metric.client_id = clientId;
        tmp_metric.name = metrics_ref[line].name;

        // Check if data is available
        if (tmp_metric.year !== '') {
            // Create global metrics index
            index_metrics[tmp_metric.name] = tmp_metric;

            // Add metric to dabatase metrics
            db_metrics.push(tmp_metric);
        }
    }

    // Test return of completed database metrics
    // console.log(db_metrics);
    // console.log(index_metrics);

    ParseIndicators(index_metrics);

    // Return the ordered metrics
    return db_metrics;
}

async function sumByGroup(accounts, sums, takes) {
    let data_list = {
        ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
        jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
    };
    let year = '';

    // Iterate over group elements
    for (let subaccount in accounts) {
        for (let index in data_list) {
            data_list[index] += accounts[subaccount][sums][index] - accounts[subaccount][takes][index];
        }
        year = accounts[subaccount]['year'];
    }

    return {
        ene: data_list.ene.toFixed(2), feb: data_list.feb.toFixed(2), mar: data_list.mar.toFixed(2),
        abr: data_list.abr.toFixed(2), may: data_list.may.toFixed(2), jun: data_list.jun.toFixed(2),
        jul: data_list.jul.toFixed(2), ago: data_list.ago.toFixed(2), sep: data_list.sep.toFixed(2),
        oct: data_list.oct.toFixed(2), nov: data_list.nov.toFixed(2), dic: data_list.dic.toFixed(2),
        sum: data_list.sum.toFixed(2), year: year
    };
}

async function sumByReq(accounts, req, sums, takes) {
    let data_list = {
        ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
        jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
    };
    let year = '';

    // Iterate over requirement list elements
    for (let elements in req) {
        let subaccount = req[elements];  // Declare subaccounts and verify existing data
        if (subaccount in accounts) {  // Check if subaccount exists
            for (let index in data_list) {
                data_list[index] += accounts[subaccount][sums][index] - accounts[subaccount][takes][index];
            }
            year = accounts[subaccount]['year'];
        }
    }

    return {
        ene: data_list.ene.toFixed(2), feb: data_list.feb.toFixed(2), mar: data_list.mar.toFixed(2),
        abr: data_list.abr.toFixed(2), may: data_list.may.toFixed(2), jun: data_list.jun.toFixed(2),
        jul: data_list.jul.toFixed(2), ago: data_list.ago.toFixed(2), sep: data_list.sep.toFixed(2),
        oct: data_list.oct.toFixed(2), nov: data_list.nov.toFixed(2), dic: data_list.dic.toFixed(2),
        sum: data_list.sum.toFixed(2), year: year
    };
}

async function ParseIndicators(metrics) {
    let kpi_index = {};
    let indicators = kpiBlueprints.indicators;

    let res;
    for (let kpi in indicators) {
        let i = indicators[kpi];
        if (i.indicator) {
            res = fun_indicators[i.code](i.name, metrics, kpi_index);
        } else {
            res = fun_indicators[i.code](i.name, metrics);
        }
        kpi_index[i.code] = res;
    }

    console.log(kpi_index);

    return [];
}