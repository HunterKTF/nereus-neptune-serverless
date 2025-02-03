'use server'

import XLSX from "xlsx";


export async function ParseDataEstado(file, clientId, year) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const months = workbook.SheetNames;

    let metrics = {
        ingresos: { sum: 0, year: year, client_id: clientId, name: "Ingresos" },
        costo_de_venta: { sum: 0, year: year, client_id: clientId, name: "Costo de venta y/o servicio" },
        gastos: { sum: 0, year: year, client_id: clientId, name: "Gastos" },
        intereses: { sum: 0, year: year, client_id: clientId, name: "Intereses" },
        depreciacion_cont: { sum: 0, year: year, client_id: clientId, name: "Depreciacion contable" },
        amortizacion_cont: {
            name: "Amortizacion contable",
            year: year,
            client_id: clientId,
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0,
            may: 0.0, jun: 0.0, jul: 0.0, ago: 0.0,
            sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0,
            sum: 0.0
        },
        utilidad: {
            name: "Utilidad Neta",
            year: year,
            client_id: clientId,
            sum: 0.0
        }
    }

    for (let month in months) {
        let currentSheet = months[month];
        let worksheet = workbook.Sheets[currentSheet];

        metrics.ingresos[currentSheet] = worksheet.B11.v; metrics.ingresos.sum += worksheet.B11.v;
        metrics.costo_de_venta[currentSheet] = worksheet.B18.v; metrics.costo_de_venta.sum += worksheet.B18.v;
        metrics.gastos[currentSheet] = worksheet.B25.v; metrics.gastos.sum += worksheet.B25.v;
        metrics.intereses[currentSheet] = worksheet.B28.v; metrics.intereses.sum += worksheet.B28.v;
        metrics.depreciacion_cont[currentSheet] = worksheet.B23.v; metrics.depreciacion_cont.sum += worksheet.B23.v;
        metrics.utilidad[currentSheet] = worksheet.B38.v; metrics.utilidad.sum += worksheet.B38.v;
    }

    return metrics;
}