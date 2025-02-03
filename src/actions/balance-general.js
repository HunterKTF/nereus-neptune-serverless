'use server'

import XLSX from "xlsx";


export async function ParseDataBalance(file, clientId, year) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const months = workbook.SheetNames;

    let metrics = {
        capital_contable: { sum: 0, year: year, client_id: clientId, name: "Capital contable" },
        activo: { sum: 0, year: year, client_id: clientId, name: "Activo" },
        inventario: { sum: 0, year: year, client_id: clientId, name: "Inventario" },
        cuentas_y_docs_x_cobrar_a_cp: { sum: 0, year: year, client_id: clientId, name: "Cuentas y documentos por cobrar a c.p." },
        cuentas_x_pagar: { sum: 0, year: year, client_id: clientId, name: "Cuentas por pagar a corto plazo" },
        activos_circulantes: { sum: 0, year: year, client_id: clientId, name: "Activo a corto plazo" },
        pasivos_circulantes: { sum: 0, year: year, client_id: clientId, name: "Pasivo a corto plazo" },
        pasivo: { sum: 0, year: year, client_id: clientId, name: "Pasivo" },
        deuda_cp: { sum: 0, year: year, client_id: clientId, name: "Deuda a corto plazo" },
        deuda_lp: { sum: 0, year: year, client_id: clientId, name: "Deuda a largo plazo" },
        deuda_total: { sum: 0, year: year, client_id: clientId, name: "Deuda total" },
        caja: { sum: 0, year: year, client_id: clientId, name: "Caja" },
    }

    for (let month in months) {
        let currentSheet = months[month];
        let worksheet = workbook.Sheets[currentSheet];

        metrics.capital_contable[currentSheet] = worksheet.E71.v; metrics.capital_contable.sum += worksheet.E71.v;
        metrics.activo[currentSheet] = worksheet.B75.v; metrics.activo.sum += worksheet.B75.v;
        metrics.inventario[currentSheet] = worksheet.B22.v; metrics.inventario.sum += worksheet.B22.v; 
        metrics.cuentas_y_docs_x_cobrar_a_cp[currentSheet] = worksheet.B13.v; metrics.cuentas_y_docs_x_cobrar_a_cp.sum += worksheet.B13.v;
        metrics.cuentas_x_pagar[currentSheet] = worksheet.E9.v; metrics.cuentas_x_pagar.sum += worksheet.E9.v;
        metrics.activos_circulantes[currentSheet] = worksheet.B71.v; metrics.activos_circulantes.sum += worksheet.B71.v;
        metrics.pasivos_circulantes[currentSheet] = worksheet.E37.v; metrics.pasivos_circulantes.sum += worksheet.E37.v;;
        metrics.pasivo[currentSheet] = worksheet.E59.v; metrics.pasivo.sum += worksheet.E59.v;
        metrics.deuda_cp[currentSheet] = worksheet.E12.v; metrics.deuda_cp.sum += worksheet.E12.v;
        metrics.deuda_lp[currentSheet] = worksheet.E26.v; metrics.deuda_lp.sum += worksheet.E26.v;
        metrics.deuda_total[currentSheet] = worksheet.E12.v + worksheet.E26.v; metrics.deuda_total.sum += worksheet.E12.v + worksheet.E26.v;
        metrics.caja[currentSheet] = worksheet.B8.v; metrics.caja.sum += worksheet.B8.v;
    }

    return metrics;
}