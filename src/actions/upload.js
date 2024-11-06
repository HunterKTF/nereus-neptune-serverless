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
    let account_index = "000-00-000";
    let account_data = { year: 0, cargos: 0.0, abonos: 0.0 };
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

            if (accounts[1] !== '00') {
                account_index = accounts[0] + '-' + accounts[1] + '-000';
                account_group = parseInt(accounts[0][0] + '00');
                if (account_group in groupedData) { }
                else {
                    groupedData[account_group] = {};
                }
                account_data = { year: 0, cargos: 0.0, abonos: 0.0 };
            }
        }

        // Look for data and make the sum
        if (account_num.v != ' ' && account_num.v.includes('/')) {
            date = account_num.v.split('/');
            account_data.year = date[2];
            account_data.cargos += cargos.v;
            account_data.abonos += abonos.v;
        }

        // Save data in dictionary when breakpoint appears
        if (breaker.v === "Total:" && account_data.year !== 0) {
            if (account_index in groupedData[account_group]) {
                groupedData[account_group][account_index].cargos += account_data.cargos;
                groupedData[account_group][account_index].abonos += account_data.abonos;
            } else {
                groupedData[account_group][account_index] = account_data;
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

            // Test temporal metric output
            // console.log(tmp_metric);
        }
        else {
            tmp_metric = sumByReq(metrics_ref[line].requires, dataBook);

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

async function sumByGroup(group, db, sums, takes) {
    const accounts = db[group];
    let group_sum = 0;
    let year = '';

    // Iterate over group elements
    for (let subaccount in accounts){
        group_sum += accounts[subaccount][sums] - accounts[subaccount][takes]
        year = accounts[subaccount]['year'];
    }

    return { sum: group_sum, year: year };
}

async function sumByReq() {

    return {};
}