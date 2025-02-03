'use server'

import XLSX from "xlsx";
import kpiblueprints from './kpiblueprints.json';


export async function ParseDataBalance(file, clientId) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const months = workbook.SheetNames;
    const sheet = workbook.Sheets['ene'];

    const date = sheet.a2.v.replace("Posicion Financiera, balance General al ", "");
    const date_split = date.split('/');
    const year = date_split[2];
    console.log(year);

    let metrics = {
        caja: { sum: 0, year: year, client_id: clientId },
        bancos: { sum: 0, year: year, client_id: clientId },
        inversiones: { sum: 0, year: year, client_id: clientId },
    }

    for (let month in months) {
        let currentSheet = months[month];
        let worksheet = workbook.Sheets[currentSheet];

        metrics.caja[currentSheet] = worksheet.b8.v; metrics.caja.sum += worksheet.b8.v;
        metrics.bancos[currentSheet] = worksheet.b9.v; metrics.bancos.sum += worksheet.b9.v;
        metrics.inversiones[currentSheet] = worksheet.b10.v; metrics.inversiones.sum += worksheet.b10.v;
    }

    return metrics;
}