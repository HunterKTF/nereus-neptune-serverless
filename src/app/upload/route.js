'use server'

import { ParseData } from "@/actions/upload";

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

    return Response.json({ dataBook }, { status: 200 });
  }
}