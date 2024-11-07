'use server'

import { ParseData, ParseMetrics } from "@/actions/upload";
import { connectToDB } from "@/utils/mongodb";


// Function to upload data to MongoDB
async function uploadToMongo(metrics) {
  try {
    // Begin MongoDB connection to metrics collection
    const { client, db } = await connectToDB();
    const myColl = db.collection(process.env.MONGODB_COLL);

    // Upload data
    const result = await myColl.insertMany(metrics);

    // Close MongoDB connection
    client.close();

    // Return the message of successfull upload
    return { message: `${result.insertedCount} documents were inserted.` };
  } catch (e) {
    // Print error message and correctly uploaded docs
    console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
    console.log(e);

    return { message: e };
  }
}


// POST method to upload Contpaqi file
export async function POST(request) {
  const formData = await request.formData();  // Get form-data from body

  // Extract data
  const clientId = formData.get('clientId');
  const file = formData.get('file');

  // Check if file is uploaded correctly
  if (!file) {
    console.log('No file was uploaded');
    return Response.json({ error: "No file encountered in form-data" }, { status: 404 });
  } else {
    // Get file data from buffer and parse data
    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse data into a dictionary
    const dataBook = await ParseData(buffer);

    // Parse dataBook into metrics to post to MongoDB
    const metrics = await ParseMetrics(dataBook, clientId);

    // Upload transformed metrics into MongoDB
    const response = await uploadToMongo(metrics);

    return Response.json(response);
  }
}