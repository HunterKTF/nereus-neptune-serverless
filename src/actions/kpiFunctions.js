export const fun_indicators = {
    utilidad_bruta: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let ingresos = metrics['Ingresos'];
        let costo_de_venta = metrics['Costo de venta y/o servicio'];

        if (ingresos !== undefined && costo_de_venta !== undefined) {
            for (let i in res) {
                res[i] = ingresos[i] - costo_de_venta[i];
            }
    
            res.year = ingresos['year'];
            res.client_id = ingresos['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}:`);
            return res;
        } else {
            return res;
        }
    },




    utilidad_operativa: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_bruta = indicators['utilidad_bruta'];
        let gastos = metrics['Gastos'];
        let depreciacion_contable = metrics['Depreciacion contable'] || res;
        let amortizacion_contable = metrics['Amortizacion contable'] || res;

        if (utilidad_bruta !== undefined && gastos !== undefined) {
            for (let i in res) {
                res[i] = utilidad_bruta[i] - gastos[i] - depreciacion_contable[i] - amortizacion_contable[i];
            }
    
            res.year = gastos['year'];
            res.client_id = gastos['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    utilidad_neta: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'] || res;
        let impuestos = metrics['Impuestos'];
        let utilidad = metrics['Utilidad Neta'];

        if (utilidad !== undefined) {
            return utilidad;
        } else {
            if (utilidad_operativa !== undefined && impuestos !== undefined) {
                for (let i in res) {
                    res[i] = utilidad_operativa[i] - intereses[i] - impuestos[i];
                }
        
                res.year = utilidad_operativa['year'];
                res.client_id = utilidad_operativa['client_id'];
                res.name = name;
        
                console.log(`Calculando... ${name}`);
                return res;
            } else {
                return res;
            }
        }
    },




    roe: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_neta = indicators['utilidad_neta'];
        let capital_contable = metrics['Capital contable'];

        if (utilidad_neta !== undefined && capital_contable !== undefined) {
            for (let i in res) {
                res[i] = utilidad_neta[i] / capital_contable[i];
            }
    
            res.year = utilidad_neta['year'];
            res.client_id = utilidad_neta['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    roa: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_neta = indicators['utilidad_neta'];
        let activos_totales = metrics['Activo'];

        if (utilidad_neta !== undefined && activos_totales !== undefined) {
            for (let i in res) {
                res[i] = utilidad_neta[i] / activos_totales[i];
            }
    
            res.year = utilidad_neta['year'];
            res.client_id = utilidad_neta['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    rotacion_de_activos: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let ventas = metrics['Ingresos'];
        let activos_totales = metrics['Activo'];

        if (ventas !== undefined && activos_totales !== undefined) {
            for (let i in res) {
                res[i] = ventas[i] / activos_totales[i];
            }
    
            res.year = ventas['year'];
            res.client_id = ventas['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    rotacion_de_inventarios: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let inventario = metrics['Inventario'];

        if (costo_de_venta !== undefined && inventario !== undefined) {
            for (let i in res) {
                res[i] = costo_de_venta[i] / inventario[i];
            }
    
            res.year = costo_de_venta['year'];
            res.client_id = costo_de_venta['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    rotacion_cuentas_por_cobrar: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let cuentas_por_cobrar = metrics['Cuentas y documentos por cobrar a c.p.'];
        let ventas = metrics['Ingresos'];

        if (cuentas_por_cobrar !== undefined && ventas !== undefined) {
            for (let i in res) {
                res[i] = ventas[i] / cuentas_por_cobrar[i];
            }
    
            res.year = cuentas_por_cobrar['year'];
            res.client_id = cuentas_por_cobrar['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    rotacion_cuentas_por_pagar: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let costo_de_venta = metrics['Costo de venta y/o servicio'];
        let cuentas_por_pagar = metrics['Cuentas por pagar a corto plazo'];

        if (costo_de_venta !== undefined && cuentas_por_pagar !== undefined) {
            for (let i in res) {
                res[i] = costo_de_venta[i] / cuentas_por_pagar[i];
            }
    
            res.year = costo_de_venta['year'];
            res.client_id = costo_de_venta['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },




    razon_circulante: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let activos_circulantes = metrics['Activo a corto plazo'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        if (activos_circulantes !== undefined && pasivos_circulantes !== undefined) {
            for (let i in res) {
                res[i] = activos_circulantes[i] / pasivos_circulantes[i];
            }
    
            res.year = activos_circulantes['year'];
            res.client_id = activos_circulantes['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    razon_rapida: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let activos_circulantes = metrics['Activo a corto plazo'];
        let inventario = metrics['Inventario'] || res;
        let pasivos_circulantes = metrics['Pasivo a corto plazo'];

        let tmp_val = 0.0;

        if (activos_circulantes !== undefined && pasivos_circulantes !== undefined) {
            for (let i in res) {
                tmp_val = activos_circulantes[i] - inventario[i];
                res[i] = tmp_val / pasivos_circulantes[i];
            }
    
            res.year = activos_circulantes['year'];
            res.client_id = activos_circulantes['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    cobertura_deuda: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'];
        let intereses = metrics['Intereses'];

        if (utilidad_operativa !== undefined && intereses !== undefined) {
            for (let i in res) {
                res[i] = utilidad_operativa[i] / intereses[i];
            }
    
            res.year = utilidad_operativa['year'];
            res.client_id = utilidad_operativa['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    dias_cuentas_por_cobrar: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let rotacion_cuentas_por_cobrar = indicators['rotacion_cuentas_por_cobrar'];

        if (rotacion_cuentas_por_cobrar !== undefined) {
            for (let i in res) {
                res[i] = 365 / rotacion_cuentas_por_cobrar[i];
            }
    
            res.year = rotacion_cuentas_por_cobrar['year'];
            res.client_id = rotacion_cuentas_por_cobrar['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`)
            return res;
        } else {
            return res;
        }
    },


    dias_de_inventario: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let rotacion_de_inventarios = indicators['rotacion_de_inventarios'];

        if (rotacion_de_inventarios !== undefined) {
            for (let i in res) {
                res[i] = 365 / rotacion_de_inventarios[i];
            }
    
            res.year = rotacion_de_inventarios['year'];
            res.client_id = rotacion_de_inventarios['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`)
            return res;
        } else {
            return res;
        }
    },


    dias_cuentas_por_pagar: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let rotacion_cuentas_por_pagar = indicators['rotacion_cuentas_por_pagar'];

        if (rotacion_cuentas_por_pagar !== undefined) {
            for (let i in res) {
                res[i] = 365 / rotacion_cuentas_por_pagar[i];
            }
    
            res.year = rotacion_cuentas_por_pagar['year'];
            res.client_id = rotacion_cuentas_por_pagar['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    ciclo_conversion_de_efectivo: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let dias_cuentas_por_cobrar = indicators['dias_cuentas_por_cobrar'] || res;
        let dias_de_inventario = indicators['dias_de_inventario'] || res;
        let dias_cuentas_por_pagar = indicators['dias_cuentas_por_pagar'] || res;

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
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let activos_totales = metrics['Activo'];
        let pasivos_circulantes = metrics['Pasivo a corto plazo'] || res;

        if (activos_totales !== undefined) {
            for (let i in res) {
                res[i] = activos_totales[i] - pasivos_circulantes[i];
            }
    
            res.year = activos_totales['year'];
            res.client_id = activos_totales['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    rotacion_de_capital_empleado: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let ventas = metrics['Ingresos'];
        let capital_empleado = indicators['capital_empleado'];

        if (ventas !== undefined && capital_empleado !== undefined) {
            for (let i in res) {
                res[i] = ventas[i] - capital_empleado[i];
            }
    
            res.year = ventas['year'];
            res.client_id = ventas['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    roce: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let utilidad_operativa = indicators['utilidad_operativa'];
        let capital_empleado = indicators['capital_empleado'];

        const ISR = 0.3;
        const const_val = 1 - ISR;

        if (utilidad_operativa !== undefined && capital_empleado !== undefined) {
            for (let i in res) {
                res[i] = utilidad_operativa[i] * const_val / capital_empleado[i];
            }
    
            res.year = utilidad_operativa['year'];
            res.client_id = utilidad_operativa['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    razon_de_apalancamiento: (name, metrics) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let pasivos_totales = metrics['Pasivo'] || res;
        let capital_contable = metrics['Capital contable'];

        if (capital_contable !== undefined) {
            for (let i in res) {
                res[i] = pasivos_totales[i] / capital_contable[i];
            }
    
            res.year = pasivos_totales['year'];
            res.client_id = pasivos_totales['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    },


    deuda_neta_ebit: (name, metrics, indicators) => {
        let res = {
            ene: 0.0, feb: 0.0, mar: 0.0, abr: 0.0, may: 0.0, jun: 0.0,
            jul: 0.0, ago: 0.0, sep: 0.0, oct: 0.0, nov: 0.0, dic: 0.0, sum: 0.0
        };

        let deuda = metrics['Deuda total'] || res;
        let efectivo = metrics['Caja'];
        let utilidad_operativa = indicators['utilidad_operativa'];

        let tmp_val = 0.0;

        if (efectivo !== undefined && utilidad_operativa !== undefined) {
            for (let i in res) {
                tmp_val = deuda[i] - efectivo[i];
                res[i] = tmp_val / utilidad_operativa[i];
            }
    
            res.year = deuda['year'];
            res.client_id = deuda['client_id'];
            res.name = name;
    
            console.log(`Calculando... ${name}`);
            return res;
        } else {
            return res;
        }
    }
}