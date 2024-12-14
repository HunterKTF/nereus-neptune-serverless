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

        console.log(`Calculando... ${name}:`);
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

        console.log(`Calculando... ${name}`);
        return res;
    },
    utilidad_neta: (name, metrics, indicators) => {
        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'];
        let impuestos = metrics['Impuestos'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = utilidad_operativa[i] - intereses[i] - impuestos[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    roe: (name, metrics, indicators) => {
        let utilidad_neta = indicators['utilidad_neta']
        let capital_contable = metrics['Capital contable'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = utilidad_neta[i] / capital_contable[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    roa: (name, metrics, indicators) => {
        let utilidad_neta = indicators['utilidad_neta'];
        let activos_totales = metrics['Activo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = utilidad_neta[i] / activos_totales[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_activos: (name, metrics) => {
        let ventas = metrics['Ingresos'];
        let activos_totales = ['Activo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = ventas[i] / activos_totales[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_inventarios: (name, metrics) => {
        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let inventario = metrics['Inventario'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = costo_de_venta[i] / inventario[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_cuentas_por_cobrar: (name, metrics) => {
        let cuentas_por_cobrar = metrics['Cuentas y documentos por cobrar a c.p.'];
        let ventas = metrics['Ingresos'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = ventas[i] / cuentas_por_cobrar[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_cuentas_por_pagar: (name, metrics) => {
        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let cuentas_por_pagar = metrics['Cuentas por pagar a corto plazo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = costo_de_venta[i] / cuentas_por_pagar[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_circulante: (name, metrics) => {
        let activos_circulantes = metrics['Activo a corto plazo'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = activos_circulantes[i] / pasivos_circulantes[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_rapida: (name, metrics) => {
        let activos_circulantes = metrics['Activo a corto plazo'];
        let inventario = metrics['Inventario'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let tmp_val = 0.0;

        for (let i in res) {
            tmp_val = activos_circulantes[i] - inventario[i];
            res[i] = tmp_val / pasivos_circulantes[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    cobertura_deuda: (name, metrics, indicators) => {
        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = utilidad_operativa[i] / intereses[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    dias_cuentas_por_cobrar: (name, metrics, indicators) => {
        let rotacion_cuentas_por_cobrar = indicators['rotacion_cuentas_por_cobrar'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = 365 / rotacion_cuentas_por_cobrar[i];
        }

        console.log(`Calculando... ${name}`)
        return res;
    },
    dias_de_inventario: (name, metrics, indicators) => {
        let rotacion_de_inventarios = indicators['rotacion_de_inventarios'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = 365 / rotacion_de_inventarios[i];
        }

        console.log(`Calculando... ${name}`)
        return res;
    },
    dias_cuentas_por_pagar: (name, metrics, indicators) => {
        let rotacion_cuentas_por_pagar = indicators['rotacion_cuentas_por_pagar'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = 365 / rotacion_cuentas_por_pagar[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    ciclo_conversion_de_efectivo: (name, metrics, indicators) => {
        let dias_cuentas_por_cobrar = indicators['dias_cuentas_por_cobrar'];
        let dias_de_inventario = indicators['dias_de_inventario'];
        let dias_cuentas_por_pagar = indicators['dias_cuentas_por_pagar'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = dias_cuentas_por_cobrar[i] + dias_de_inventario[i] - dias_cuentas_por_pagar[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    capital_empleado: (name, metrics) => {
        let activos_totales = ['Activo'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = activos_totales[i] - pasivos_circulantes[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_capital_empleado: (name, metrics, indicators) => {
        let ventas = metrics['Ingresos'];
        let capital_empleado = indicators['capital_empleado'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = ventas[i] - capital_empleado[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    roce: (name, metrics) => {
        let utilidad_operativa = indicators['utilidad_operativa'];
        let capital_empleado = indicators['capital_empleado'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        const ISR = 0.3;
        const const_val = 1 - ISR;

        for (let i in res) {
            res[i] = utilidad_operativa[i] * const_val / capital_empleado[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_de_apalancamiento: (name, metrics) => {
        let pasivos_totales = metrics['Pasivo'];
        let capital_contable = metrics['Capital contable'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        for (let i in res) {
            res[i] = pasivos_totales[i] / capital_contable[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    },
    deuda_neta_ebit: (name, metrics, indicators) => {
        let deuda = metrics['Deuda total'];
        let efectivo = metrics['Caja'];
        let utilidad_operativa = indicators['utilidad_operativa'];

        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let tmp_val = 0.0;

        for (let i in res) {
            tmp_val = deuda[i] - efectivo[i];
            res[i] = tmp_val / utilidad_operativa[i];
        }

        console.log(`Calculando... ${name}`);
        return res;
    }
}