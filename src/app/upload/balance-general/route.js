'use server'

import { ParseData } from "@/actions/balance-general";
import { connectToDB } from "@/utils/mongodb";


// TODO: Function to upload data to MongoDB

// POST method to upload contpaqi file
export async function POST (request) {
    try {
        const formData = await request.formData();

        const clientId = formData.get('clientId');
        const file = formData.get('file');

        if (!file) {
            console.log('No file was uploaded');
            return Response.json({ message: "No file was found in request", status: 404 });
        } else {
            const buffer = Buffer.from(await file.arrayBuffer());

            const dataBook = await ParseData(buffer, clientId);

            return Response.json({ message: "Balance General uploaded correctly", data: dataBook, status: 201 })
        }
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not upload Balance General", status: 400 })
    }
}