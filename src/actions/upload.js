'use server'

import XLSX from "xlsx";

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
    console.log(dataBook);

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
                if (account_group in groupedData) {} 
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
