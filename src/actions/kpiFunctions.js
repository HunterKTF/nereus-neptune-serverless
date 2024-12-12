export const fun_indicators = {
    utilidad_bruta: (name, metrics) => {
        let ingresos = metrics['Ingresos'];
        let costo_de_venta = metrics['Costo de venta y/o servicio'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = ingresos[i] - costo_de_venta[i];
        }

        console.log(`Calculando... ${name}:`)
        return res;
    },
    utilidad_operativa: (name, metrics, indicators) => {
        let utilidad_bruta = indicators['utilidad_bruta'];
        let gastos = metrics['Gastos'];
        let depreciacion_contable = metrics['Depreciacion contable'];
        let amortizacion_contable = metrics['Amortizacion contable'] || {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = utilidad_bruta[i] - gastos[i] - depreciacion_contable[i] - amortizacion_contable[i];
        }

        console.log(`Calculando... ${name}`)
        return res;
    }
}

/* JSON
{
    "code": "utilidad_neta",
    "name": "Utilidad neta",
    "indicator": true
},
{
    "code": "roe",
    "name": "ROE",
    "indicator": false
},
{
    "code": "roa",
    "name": "ROA",
    "indicator": false
},
{
    "code": "rotacion_de_activos",
    "name": "Rotacion de activos",
    "indicator": false
},
{
    "code": "rotacion_de_inventarios",
    "name": "Rotacion de inventarios",
    "indicator": false
},
{
    "code": "rotacion_cuentas_por_cobrar",
    "name": "Rotacion cuentas por cobrar",
    "indicator": false
},
{
    "code": "rotacion_cuentas_por_pagar",
    "name": "Rotacion cuentas por pagar",
    "indicator": false
},
{
    "code": "razon_circulante",
    "name": "Razon circulante",
    "indicator": false
},
{
    "code": "razon_rapida",
    "name": "Razon rapida",
    "indicator": false
},
{
    "code": "cobertura_deuda",
    "name": "Cobertura deuda",
    "indicator": false
},
{
    "code": "dias_cuentas_por_cobrar",
    "name": "Dias cuentas por cobrar",
    "indicator": true
},
{
    "code": "dias_de_inventario",
    "name": "Dias de inventario",
    "indicator": true
},
{
    "code": "dias_cuentas_por_pagar",
    "name": "Dias cuentas por pagar",
    "indicator": true
},
{
    "code": "ciclo_conversion_de_efectivo",
    "name": "Ciclo conversion de efectivo",
    "indicator": true
},
{
    "code": "capital_empleado",
    "name": "Capital empleado",
    "indicator": false
},
{
    "code": "rotacion_de_capital_empleado",
    "name": "Rotacion de capital empleado",
    "indicator": true
},
{
    "code": "roce",
    "name": "ROCE",
    "indicator": true
},
{
    "code": "razon_de_apalancamiento",
    "name": "Razon de apalancamiento",
    "indicator": false
},
{
    "code": "deuda_neta_ebit",
    "name": "Deuda Neta EBIT",
    "indicator": true
}
*/

/*  KPI Functions
    utilidad_neta: (name, metrics) => {
        let ventas = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let costo_de_venta = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let gastos_operativos = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let intereses = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let impuestos = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    roe: (name, metrics) => {
        let utilidad_neta = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let capital_total = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    roa: (name, metrics) => {
        let utilidad_neta = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let activos_totales = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    rotacion_de_activos: (name, metrics) => {
        let ventas = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let activos_totales = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    rotacion_de_inventarios: (name, metrics) => {
        let costo_de_venta = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let inventario = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    rotacion_cuentas_por_cobrar: (name, metrics) => {
        let cuentas_por_cobrar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let ventas = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    rotacion_cuentas_por_pagar: (name, metrics) => {
        let costo_de_venta = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let cuentas_por_pagar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    razon_circulante: (name, metrics) => {
        let activos_circulantes = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let pasivos_circulantes = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    razon_rapida: (name, metrics) => {
        let activos_circulantes = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let inventario = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let pasivos_circulantes = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    cobertura_deuda: (name, metrics) => {
        let intereses = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let depreciacion = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let amortizacion = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let utilidad_operativa = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    dias_cuentas_por_cobrar: (name, metrics) => {
        let rotacion_cuentas_por_cobrar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    dias_de_inventario: (name, metrics) => {
        let rotacion_de_inventarios = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    dias_cuentas_por_pagar: (name, metrics) => {
        let rotacion_cuentas_por_pagar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    ciclo_conversion_de_efectivo: (name, metrics) => {
        let dias_cuentas_por_cobrar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let dias_de_inventario = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let dias_cuentas_por_pagar = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    capital_empleado: (name, metrics) => {
        let activos_totales = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let pasivos_circulantes = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    rotacion_de_capital_empleado: (name, metrics) => {
        let ventas = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let capital_empleado = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    roce: (name, metrics) => {
        let utilidad_operativa = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let capital_empleado = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    razon_de_apalancamiento: (name, metrics) => {
        let pasivos_totales = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let capital_total = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    },
    deuda_neta_ebit: (name, metrics) => {
        let deuda = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let efectivo = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };
        let utilidad_operativa = {
            ene: 10.0, feb: 10.0, mar: 10.0, abr: 10.0, may: 10.0, jun: 10.0,
            jul: 10.0, ago: 10.0, sep: 10.0, oct: 10.0, nov: 10.0, dic: 10.0, sum: 10.0
        };

        console.log(`Calculando... ${name}`)
        return {};
    }
*/