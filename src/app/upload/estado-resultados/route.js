'use server'

import { ParseData } from "@/actions/estado-resultados";
import { connectToDB } from "@/utils/mongodb";

// TODO: Function to upload data to MongoDB

// POST method to upload contpaqi file
export async function POST(request) {
    try {
        const formData = await request.formData();  // Get form-data from body

        // Extract data required
        const clientId = formData.get('clientId');
        const file = formData.get('file');

        // Check if file is uploaded correctly
        if (!file) {
            console.log('No file was uploaded');
            return Response.json({ message: 'No file was found in request', status: 400 });
        } else {
            // Get file data from buffer and parse data
            const buffer = Buffer.from(await file.arrayBuffer());

            // Parse into a dictionary
            // TODO: File data dictionary parser
            const dataBook = await ParseData(buffer);

            // Parse data into metrics and KPIs
            // TODO: Metrics and KPIs object parser

            // Upload data to MongoDB
            // TODO: Upload data in specified format

            return Response.json({ message: "Estado de resultados uploaded correctly", data: dataBook, status: 201 });
        }
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not upload Estado de Resultados", status: 400 });
    }
}