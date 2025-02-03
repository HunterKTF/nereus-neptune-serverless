'use server'

import XLSX from "xlsx";
// import kpiBlueprints from './kpiBlueprints.json';


export async function ParseDataEstado(file) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Get document information
    const client_name = worksheet.C1.v;
    const dates = worksheet.A2.v.replace("Estado de Resultados del  ", "").split("  al  ");

    const doc_info = {
        client: client_name,
        date_init: dates[0],
        date_end: dates[1]
    }
    console.log(doc_info);

    const docMetrics = {
        ingresos: {
            ingresos: worksheet.B8.v,
            otros_ingresos: worksheet.B9.v,
            total: worksheet.B11.v,
        },
        egresos: {
            costos: {
                compras: worksheet.B16.v,
                total: worksheet.B18.v,
            },
            gastos: {
                gastos_gen: worksheet.B21.v,
                gastos_admin: worksheet.B22.v,
                depr_cont: worksheet.B23.v,
                total: worksheet.B25.v,
            },
            resul_integ_fin: {
                gastos_fin: worksheet.B28.v,
                prod_fin: worksheet.B29.v,
                total: worksheet.B31.v,
            },
            total: worksheet.B34.v,
        },
        utilidad_perdida: worksheet.B38.v,
    }

    return docMetrics;
}