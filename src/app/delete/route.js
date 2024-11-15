'use server'

import { connectToDB } from "@/utils/mongodb";


// Function to read data from MongoDB
async function deleteFromMongo(clientId, year) {
    // Begin mongoDB connection to metrics collection
    const { client, db } = await connectToDB();

    // Declare group data array
    let response = [];

    try {
        const myColl = db.collection(process.env.MONGODB_COLL);

        // Define the query to look
        const query = { client_id: { $eq: clientId }, year: { $eq: year } };

        // find code goes here
        const result = await myColl.deleteOne(query);

        /* Print a message that indicates whether the operation deleted a
        document */
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            // Return the message of successfull upload
            return { message: "Successfully deleted document", data: 200, error: [] };
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            // Return the message of successfull upload
            return { message: "Documents retrieved", data: [], error: 400 };
        }
    } catch (e) {
        // Print error message and correctly uploaded docs
        console.log(`Error making a query of multiple documents.`);
        console.log(e);

        return { message: "Error while retrieving your data", data: [], error: [e] };
    }
}