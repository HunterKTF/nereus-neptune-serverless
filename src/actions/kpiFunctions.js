export const fun_indicators = {
    utilidad_bruta: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let ingresos = metrics['Ingresos'];
        let costo_de_venta = metrics['Costo de venta y/o servicio'];

        for (let i in res) {
            res[i] = ingresos[i] - costo_de_venta[i];
        }

        res.year = ingresos['year'];
        res.client_id = ingresos['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}:`);
        return res;
    },
    utilidad_operativa: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_bruta = indicators['utilidad_bruta'];
        let gastos = metrics['Gastos'];
        let depreciacion_contable = metrics['Depreciacion contable'];
        let amortizacion_contable = metrics['Amortizacion contable'] || res;

        for (let i in res) {
            res[i] = utilidad_bruta[i] - gastos[i] - depreciacion_contable[i] - amortizacion_contable[i];
        }

        res.year = gastos['year'];
        res.client_id = gastos['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    utilidad_neta: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'] || res;
        let impuestos = metrics['Impuestos'];

        for (let i in res) {
            res[i] = utilidad_operativa[i] - intereses[i] - impuestos[i];
        }

        res.year = utilidad_operativa['year'];
        res.client_id = utilidad_operativa['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    roe: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_neta = indicators['utilidad_neta']
        let capital_contable = metrics['Capital contable'] || res;

        for (let i in res) {
            res[i] = utilidad_neta[i] / capital_contable[i];
        }

        res.year = utilidad_neta['year'];
        res.client_id = utilidad_neta['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    roa: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_neta = indicators['utilidad_neta'];
        let activos_totales = metrics['Activo'];

        for (let i in res) {
            res[i] = utilidad_neta[i] / activos_totales[i];
        }

        res.year = utilidad_neta['year'];
        res.client_id = utilidad_neta['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_activos: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let ventas = metrics['Ingresos'] || res;
        let activos_totales = ['Activo'] || res;

        for (let i in res) {
            res[i] = ventas[i] / activos_totales[i];
        }

        res.year = ventas['year'];
        res.client_id = ventas['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_inventarios: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let inventario = metrics['Inventario'];

        for (let i in res) {
            res[i] = costo_de_venta[i] / inventario[i];
        }

        res.year = costo_de_venta['year'];
        res.client_id = costo_de_venta['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_cuentas_por_cobrar: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let cuentas_por_cobrar = metrics['Cuentas y documentos por cobrar a c.p.'] || res;
        let ventas = metrics['Ingresos'];

        for (let i in res) {
            res[i] = ventas[i] / cuentas_por_cobrar[i];
        }

        res.year = cuentas_por_cobrar['year'];
        res.client_id = cuentas_por_cobrar['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_cuentas_por_pagar: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let cuentas_por_pagar = metrics['Cuentas por pagar a corto plazo'] || res;

        for (let i in res) {
            res[i] = costo_de_venta[i] / cuentas_por_pagar[i];
        }

        res.year = costo_de_venta['year'];
        res.client_id = costo_de_venta['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_circulante: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let activos_circulantes = metrics['Activo a corto plazo'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        for (let i in res) {
            res[i] = activos_circulantes[i] / pasivos_circulantes[i];
        }

        res.year = activos_circulantes['year'];
        res.client_id = activos_circulantes['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_rapida: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let activos_circulantes = metrics['Activo a corto plazo'];
        let inventario = metrics['Inventario'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        let tmp_val = 0.0;

        for (let i in res) {
            tmp_val = activos_circulantes[i] - inventario[i];
            res[i] = tmp_val / pasivos_circulantes[i];
        }

        res.year = activos_circulantes['year'];
        res.client_id = activos_circulantes['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    cobertura_deuda: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'] || res;        

        for (let i in res) {
            res[i] = utilidad_operativa[i] / intereses[i];
        }

        res.year = utilidad_operativa['year'];
        res.client_id = utilidad_operativa['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    dias_cuentas_por_cobrar: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let rotacion_cuentas_por_cobrar = indicators['rotacion_cuentas_por_cobrar'];

        for (let i in res) {
            res[i] = 365 / rotacion_cuentas_por_cobrar[i];
        }

        res.year = rotacion_cuentas_por_cobrar['year'];
        res.client_id = rotacion_cuentas_por_cobrar['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`)
        return res;
    },
    dias_de_inventario: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let rotacion_de_inventarios = indicators['rotacion_de_inventarios'];

        for (let i in res) {
            res[i] = 365 / rotacion_de_inventarios[i];
        }

        res.year = rotacion_de_inventarios['year'];
        res.client_id = rotacion_de_inventarios['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`)
        return res;
    },
    dias_cuentas_por_pagar: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let rotacion_cuentas_por_pagar = indicators['rotacion_cuentas_por_pagar'];

        for (let i in res) {
            res[i] = 365 / rotacion_cuentas_por_pagar[i];
        }

        res.year = rotacion_cuentas_por_pagar['year'];
        res.client_id = rotacion_cuentas_por_pagar['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    ciclo_conversion_de_efectivo: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let dias_cuentas_por_cobrar = indicators['dias_cuentas_por_cobrar'];
        let dias_de_inventario = indicators['dias_de_inventario'];
        let dias_cuentas_por_pagar = indicators['dias_cuentas_por_pagar'];

        for (let i in res) {
            res[i] = dias_cuentas_por_cobrar[i] + dias_de_inventario[i] - dias_cuentas_por_pagar[i];
        }

        res.year = dias_cuentas_por_cobrar['year'];
        res.client_id = dias_cuentas_por_cobrar['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    capital_empleado: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let activos_totales = ['Activo'] || res;
        let pasivos_circulantes = metrics['Pasivo a corto plazo'] || res;

        for (let i in res) {
            res[i] = activos_totales[i] - pasivos_circulantes[i];
        }

        res.year = activos_totales['year'];
        res.client_id = activos_totales['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    rotacion_de_capital_empleado: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let ventas = metrics['Ingresos'] || res;
        let capital_empleado = indicators['capital_empleado'] || res;

        for (let i in res) {
            res[i] = ventas[i] - capital_empleado[i];
        }

        res.year = ventas['year'];
        res.client_id = ventas['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    roce: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'] || res;
        let capital_empleado = indicators['capital_empleado'] || res;

        const ISR = 0.3;
        const const_val = 1 - ISR;

        for (let i in res) {
            res[i] = utilidad_operativa[i] * const_val / capital_empleado[i];
        }

        res.year = utilidad_operativa['year'];
        res.client_id = utilidad_operativa['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    razon_de_apalancamiento: (name, metrics) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let pasivos_totales = metrics['Pasivo'];
        let capital_contable = metrics['Capital contable'] || res;

        for (let i in res) {
            res[i] = pasivos_totales[i] / capital_contable[i];
        }

        res.year = pasivos_totales['year'];
        res.client_id = pasivos_totales['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    },
    deuda_neta_ebit: (name, metrics, indicators) => {
        let res = {
            ene: 1.0, feb: 1.0, mar: 1.0, abr: 1.0, may: 1.0, jun: 1.0,
            jul: 1.0, ago: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dic: 1.0, sum: 1.0
        };

        let deuda = metrics['Deuda total'];
        let efectivo = metrics['Caja'];
        let utilidad_operativa = indicators['utilidad_operativa'];

        let tmp_val = 0.0;

        for (let i in res) {
            tmp_val = deuda[i] - efectivo[i];
            res[i] = tmp_val / utilidad_operativa[i];
        }

        res.year = deuda['year'];
        res.client_id = deuda['client_id'];
        res.name = name;

        console.log(`Calculando... ${name}`);
        return res;
    }
}