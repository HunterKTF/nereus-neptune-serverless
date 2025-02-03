'use server'

import XLSX from "xlsx";


export async function ParseDataBalance(file, clientId, year) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const months = workbook.SheetNames;
    const sheet = workbook.Sheets['ene'];

    let metrics = {
        caja: { sum: 0, year: year, client_id: clientId },
        bancos: { sum: 0, year: year, client_id: clientId },
        inversiones: { sum: 0, year: year, client_id: clientId },
    }

    for (let month in months) {
        let currentSheet = months[month];
        let worksheet = workbook.Sheets[currentSheet];

        metrics.caja[currentSheet] = worksheet.B8.v; metrics.caja.sum += worksheet.B8.v;
        metrics.bancos[currentSheet] = worksheet.B9.v; metrics.bancos.sum += worksheet.B9.v;
        metrics.inversiones[currentSheet] = worksheet.B10.v; metrics.inversiones.sum += worksheet.B10.v;
    }

    console.log(metrics);

    return metrics;
}