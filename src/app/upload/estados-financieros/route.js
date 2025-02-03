'use server'

import { ParseDataBalance } from "@/actions/balance-general";
import { ParseDataEstado } from "@/actions/estado-resultados";
import { ParseIndicators } from "@/actions/upload";

import { connectToDB } from "@/utils/mongodb";


// TODO: Upload to MongoDB


// POST method to upload 2 contpaqi files
export async function POST (request) {
    try {
        const formData = await request.formData();

        const clientId = formData.get('clientId');
        const year = formData.get('year');

        const balance = formData.get('balance');
        const estado = formData.get('estado');

        if (!balance) {
            const message = "No file Balance General was uploaded";
            console.log(message);
            return Response.json({ message: message, status: 404 });
        }

        else if (!estado) {
            const message = "No file Estado de Resultados was uploaded";
            console.log(message);
            return Response.json({ message: message, status: 404 });
        }

        else {
            const message = "Correctly uploaded files";
            console.log(message);

            const fileBalance = Buffer.from(await balance.arrayBuffer());
            const fileEstado = Buffer.from(await estado.arrayBuffer());
            
            let db_balance = await ParseDataBalance(fileBalance, clientId, year);
            let db_estado = await ParseDataEstado(fileEstado, clientId, year);

            const metrics = { ...db_balance, ...db_estado };
            let metrics_idx = {};

            for (let idx in metrics) {
                let name = metrics[idx].name;
                metrics_idx[name] = { ...metrics[idx] };
            }

            let kpis = await ParseIndicators(metrics_idx);

            return Response.json({ message: message, status: 200, year: year, clientId: clientId, dict: kpis });
        };
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not read uploaded files", status: 400 });
    }
}