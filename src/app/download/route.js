'use server'

import { connectToDB } from "@/utils/mongodb";


// Function to read data from MongoDB
async function readFromMongo(params) {
    // Begin mongoDB connection to metrics collection
    const { client, db } = await connectToDB();

    // Declare group data array
    let metrics = [];
    let kpis = [];

    try {
        const metricsColl = db.collection(process.env.MONGODB_COLL_MET);
        const kpiColl = db.collection(process.env.MONGODB_COLL_KPI);

        // Define the query to look
        const query = { client_id: { $eq: params } };

        // find code goes here
        const cursor = metricsColl.find(query);
        const cursor2 = kpiColl.find(query);

        // Print a message if no documents were found
        if ((await metricsColl.countDocuments(query)) === 0) {
            console.log("No documents found!");
            return { message: "No documents found!", data: [], error: [] };
        }

        // Print a message if no documents were found
        if ((await kpiColl.countDocuments(query)) === 0) {
            console.log("No documents found!");
            return { message: "No documents found!", data: [], error: [] };
        }

        // Iterate over found elements
        for await (const doc of cursor) {
            metrics.push(doc);
        }

        // Iterate over found elements
        for await (const doc of cursor2) {
            kpis.push(doc);
        }

        // Print the retrieved data in console
        // console.log(metrics);

        // Return the message of successfull upload
        return { message: "Documents retrieved", data: [{metrics: metrics}, {kpis: kpis}], error: [] };
    } catch (e) {
        // Print error message and correctly uploaded docs
        console.log(`Error making a query of multiple documents.`);
        console.log(e);

        return { message: "Error while retrieving your data", data: [], error: [e] };
    }
}


// GET function to retrieve client data
export async function POST(request) {
    try {
        let formData = await request.formData();  // Get form-data from body

        // Extract data from form
        const clientId = formData.get('clientId');

        // Retrieve metrics from MongoDB
        const response = await readFromMongo(clientId);

        return Response.json(response);
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not download data correctly", status: 400 });
    }
}