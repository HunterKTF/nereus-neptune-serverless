'use server'

import { connectToDB } from "@/utils/mongodb";


// Function to read data from MongoDB
async function readFromMongo(params) {
    // Begin mongoDB connection to metrics collection
    const { client, db } = await connectToDB();

    // Declare group data array
    let response = [];

    try {
        const myColl = db.collection(process.env.MONGODB_COLL);

        // Define the query to look
        const query = { client_id: { $eq: params } };

        // find code goes here
        const cursor = myColl.find(query);

        // Print a message if no documents were found
        if ((await myColl.countDocuments(query)) === 0) {
            console.log("No documents found!");
            return { message: "No documents found!", data: [], error: [] };
        }

        // Iterate over found elements
        for await (const doc of cursor) {
            response.push(doc);
        }

        // Print the retrieved data in console
        // console.log(response);

        // Return the message of successfull upload
        return { message: "Documents retrieved", data: response, error: [] };
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