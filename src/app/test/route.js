import { connectToDB } from "@/utils/mongodb";

export async function GET(req, res){
    const { client, db } = await connectToDB();

    const myColl = db.collection(process.env.MONGODB_COLL);

    const doc = { name: "Three cheeses pizza", shape: "square" };
    const result = await myColl.insertOne(doc);

    client.close();

    return Response.json({ message: `A document was inserted with the _id: ${result.insertedId}` });
}