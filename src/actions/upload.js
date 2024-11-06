'use server'

import XLSX from "xlsx";
import reference from './reference.json';

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

    // Get the metrics conditions from json file
    const metrics_ref = reference.metrics;

    // Iterate over the metrics condition generation
    for (let line in metrics_ref) {
        // Temporal metric will act as row to append
        let tmp_metric = {};

        // Check for metric condition as group or requirements
        if (metrics_ref[line].group) {
            // Decalre group constraints
            let sums = metrics_ref[line].sums;
            let takes = metrics_ref[line].takes;
            let group = metrics_ref[line].requires;

            // Pass data to local function and extract temporal metric value
            tmp_metric = await sumByGroup(group, dataBook, sums, takes);

        } else {
            // Decalre requirements constraints
            let sums = metrics_ref[line].sums;
            let takes = metrics_ref[line].takes;
            let req_list = metrics_ref[line].requires;

            // Pass data to local function and extract temporal metric value
            tmp_metric = sumByReq(group, dataBook, sums, takes);

            // Test temporal metrics by requirement
            // console.log(tmp_metric);
        }

        // Add parameters to temporal metric variable
        tmp_metric.client_id = clientId;
        tmp_metric.name = metrics_ref[line].name;

        // Check if data is available
        if (tmp_metric.year !== '') {
            // Add metric to dabatase metrics
            db_metrics.push(tmp_metric);
        }
    }

    // Test return of completed database metrics
    console.log(db_metrics);

    // Return the ordered metrics
    return db_metrics;
}

async function sumByGroup(group, dataBook, sums, takes) {
    const accounts = dataBook[group];
    let group_ene = 0.0;
    let group_feb = 0.0;
    let group_mar = 0.0;
    let group_abr = 0.0;
    let group_may = 0.0;
    let group_jun = 0.0;
    let group_jul = 0.0;
    let group_ago = 0.0;
    let group_sep = 0.0;
    let group_oct = 0.0;
    let group_nov = 0.0;
    let group_dic = 0.0;
    let group_sum = 0.0;
    let year = '';

    // Iterate over group elements
    for (let subaccount in accounts) {
        group_ene += accounts[subaccount][sums].ene - accounts[subaccount][takes].ene;
        group_feb += accounts[subaccount][sums].feb - accounts[subaccount][takes].feb;
        group_mar += accounts[subaccount][sums].mar - accounts[subaccount][takes].mar;
        group_abr += accounts[subaccount][sums].abr - accounts[subaccount][takes].abr;
        group_may += accounts[subaccount][sums].may - accounts[subaccount][takes].may;
        group_jun += accounts[subaccount][sums].jun - accounts[subaccount][takes].jun;
        group_jul += accounts[subaccount][sums].jul - accounts[subaccount][takes].jul;
        group_ago += accounts[subaccount][sums].ago - accounts[subaccount][takes].ago;
        group_sep += accounts[subaccount][sums].sep - accounts[subaccount][takes].sep;
        group_oct += accounts[subaccount][sums].oct - accounts[subaccount][takes].oct;
        group_nov += accounts[subaccount][sums].nov - accounts[subaccount][takes].nov;
        group_dic += accounts[subaccount][sums].dic - accounts[subaccount][takes].dic;
        group_sum += accounts[subaccount][sums].sum - accounts[subaccount][takes].sum;
        year = accounts[subaccount]['year'];
    }

    return { 
        ene: group_ene.toFixed(2),
        feb: group_feb.toFixed(2),
        mar: group_mar.toFixed(2),
        abr: group_abr.toFixed(2),
        may: group_may.toFixed(2),
        jun: group_jun.toFixed(2),
        jul: group_jul.toFixed(2),
        ago: group_ago.toFixed(2),
        sep: group_sep.toFixed(2),
        oct: group_oct.toFixed(2),
        nov: group_nov.toFixed(2),
        dic: group_dic.toFixed(2),
        sum: group_sum.toFixed(2), 
        year: year 
    };
}

async function sumByReq(group, dataBook, sums, takes) {

    return {};
}