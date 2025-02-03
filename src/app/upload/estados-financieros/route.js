'use server'

import { ParseDataBalance } from "@/actions/balance-general";
import { ParseDataEstado } from "@/actions/estado-resultados";

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
            return Response.json({ message: message, status: 200, year: year, clientId: clientId });
        };
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not read uploaded files", status: 400 });
    }
}