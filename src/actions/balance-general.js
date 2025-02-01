'use server'

import XLSX from "xlsx";
import kpiBlueprints from './kpiBlueprints.json';


export async function ParseData(file) {
    // Read file from buffered data
    const workbook = XLSX.read(file);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Get document information
    const client_name = worksheet.C1.v;
    const date = worksheet.A2.v.replace("Posición Financiera, Balance General al ", "");

    const doc_info = {
        client: client_name,
        date: date
    }
    console.log(doc_info);

    const docMetrics = {
        activo: {
            corto_plazo: {
                caja: worksheet.B8.v,
                bancos: worksheet.B9.v,
                inversiones: worksheet.B10.v,
                otros_instr_fin: worksheet.B11.v,
                clientes: worksheet.B12.v,
                ctas_y_doctos_x_c: worksheet.B13.v,
                deudores_div: worksheet.B14.v,
                estimacion_ctas_incob: worksheet.B15.v,
                pagos_anticipados: worksheet.B16.v,
                subsidio_empleo_aplic: worksheet.B17.v,
                cdto_diesel_acredit: worksheet.B18.v,
                otros_estimulos: worksheet.B19.v,
                impuestos_a_favor: worksheet.B20.v,
                pagos_provisionales: worksheet.B21.v,
                inventario: worksheet.B22.v,
                estim_inv_obsoletos: worksheet.B23.v,
                obras_en_proceso_inm: worksheet.B24.v,
                impuestos_acr_pagados: worksheet.B25.v,
                impuestos_acr_por_pagar: worksheet.B26.v,
                anticipo_proveedores: worksheet.B27.v,
                otros_activos_corto_plazo: worksheet.B28.v,
                terrenos: worksheet.B29.v,
                edificios: worksheet.B30.v,
                maquinaria_y_equipo: worksheet.B31.v,
                automoviles_autob_camiones_carga: worksheet.B32.v,
                mob_y_equipo_oficina: worksheet.B33.v,
                eq_computo: worksheet.B34.v,
                eq_comunicacion: worksheet.B35.v,
                activos_biologicos_etc: worksheet.B36.v,
                obras_en_proceso_activos_fijos: worksheet.B37.v,
                otros_activos_fijos: worksheet.B38.v,
                ferrocariles: worksheet.B39.v,
                embarcaciones: worksheet.B40.v,
                aviones: worksheet.B41.v,
                troqueles_moldes_matrices_herramental: worksheet.B42.v,
                equipo_comunicaciones_telefónicas: worksheet.B43.v,
                equipo_comunicacion_satelital: worksheet.B44.v,
                eq_adaptaciones_personas_capac_dif: worksheet.B45.v,
                maq_eq_generación_energía_ftes_renov: worksheet.B46.v,
                otra_maquinaria_equipo: worksheet.B47.v,
                adaptaciones_mejoras: worksheet.B48.v,
                depreciacion_acumulada_activos_fijos: worksheet.B49.v,
                perdida_x_deterioro_acum_activos_fijos: worksheet.B50.v,
                gastos_diferidos: worksheet.B51.v,
                gastos_pre_operativos: worksheet.B52.v,
                regalias_asistencia_tecnica_gtos_dif: worksheet.B53.v,
                activos_intangibles: worksheet.B54.v,
                gastos_organizacion: worksheet.B55.v,
                investigacion_desarrollo_mercado: worksheet.B56.v,
                marcas_patentes: worksheet.B57.v,
                credito_mercantil: worksheet.B58.v,
                gastos_instalacion: worksheet.B59.v,
                otros_activos_diferidos: worksheet.B60.v,
                amortizacion_acumulada_activos_diferidos: worksheet.B61.v,
                depositos_en_garantia: worksheet.B62.v,
                impuestos_diferidos: worksheet.B63.v,
                cuentas_documentos_x_cobrar_largo_plazo: worksheet.B64.v,
                part_trabajadores_utilidades_dif: worksheet.B65.v,
                inversiones_permanentes_acciones: worksheet.B66.v,
                estim_x_deterioro_inv_permanentes_acciones: worksheet.B67.v,
                otros_instrumentos_financieros: worksheet.B68.v,
                otros_activos_largo_plazo: worksheet.B69.v,
                total: worksheet.B71.v,
            }
        },
        suma_activo: worksheet.B75.v,
        pasivo: {
            corto_plazo: {
                proveedores: worksheet.E8.v,
                cuentas_x_pagar_corto_plazo: worksheet.E9.v,
                cobros_anticipados_corto_plazo: worksheet.E10.v,
                instrumentos_financieros_a_corto_plazo: worksheet.E11.v,
                acreedores_diversos_a_corto_plazo: worksheet.E12.v,
                anticipo_de_cliente: worksheet.E13.v,
                impuestos_trasladados: worksheet.E14.v,
                impuestos_trasladados_cobrados: worksheet.E15.v,
                impuestos_trasladados_no_cobrados: worksheet.E16.v,
                provisión_de_sueldos_y_salarios_x_pagar: worksheet.E17.v,
                provisión_de_contribuciones_segsocial_x_pagar: worksheet.E18.v,
                provisión_de_imoto_estatal_s_nómina_x_pagar: worksheet.E19.v,
                impuestos_y_derechos_por_pagar: worksheet.E20.v,
                dividendos_por_pagar: worksheet.E21.v,
                ptu_por_pagar: worksheet.E22.v,
                impuestos_retenidos: worksheet.E23.v,
                pagos_realizados_x_cta_de_terceros: worksheet.E24.v,
                otros_pasivos_a_corto_plazo: worksheet.E25.v,
                acreedores_diversos_a_largo_plazo: worksheet.E26.v,
                cuentas_por_pagar_a_largo_plazo: worksheet.E27.v,
                cobros_anticipados_a_largo_plazo: worksheet.E28.v,
                instrumentos_financieros_a_largo_plazo: worksheet.E29.v,
                pasivos_por_benefi_a_empleados_go_plzo: worksheet.E30.v,
                otros_pasivos_a_largo_plazo: worksheet.E31.v,
                participación_de_los_trabaj_en_util_dif: worksheet.E32.v,
                obligaciones_contraídas_de_fideicomisos: worksheet.E33.v,
                impuestos_diferidos: worksheet.E34.v,
                pasivos_diferidos: worksheet.E35.v,
                total: worksheet.E37.v,
            }
        },
        suma_pasivo: worksheet.E59.v,
        capital: {
            capital_social: worksheet.E63.v,
            patrimonio: worksheet.E64.v,
            reserva_legal: worksheet.E65.v,
            resultado_de_ejercicios_anteriores: worksheet.E66.v,
            resultado_del_ejercicio: worksheet.E67.v,
            otras_cuentas_de_capital: worksheet.E68.v,
            utilidad_o_perdida_ejercicio: worksheet.E69.v,
        },
        suma_capital: worksheet.E71.v,
        suma_pasivo_capital: worksheet.E75.v,
    }

    return docMetrics;
}