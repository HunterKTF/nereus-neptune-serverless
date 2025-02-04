'use server'

import { ParseDataBalance } from "@/actions/balance-general";
import { ParseDataEstado } from "@/actions/estado-resultados";
import { ParseIndicators } from "@/actions/upload";

import { connectToDB } from "@/utils/mongodb";


// Function to upload data to MongoDB
async function uploadToMongo(metrics, kpis) {
    try {
      // Begin MongoDB connection to metrics collection
      const { client, db } = await connectToDB();
      const metricsColl = db.collection(process.env.MONGODB_COLL_MET);
      const kpiColl = db.collection(process.env.MONGODB_COLL_KPI);
  
      // Upload metrics
      const metricsRes = await metricsColl.insertMany(metrics);
      console.log(`${metricsRes.insertedCount} documents were inserted.`);
      
      // Upload kpis
      const kpiRes = await kpiColl.insertMany(kpis);
      console.log(`${kpiRes.insertedCount} documents were inserted.`);
  
      return { message: `${metricsRes.insertedCount} metrics were inserted. ${kpiRes.insertedCount} KPIs were inserted`, status: 200 };
    } catch (e) {
      // Print error message and correctly uploaded docs
      console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
      console.log(e);
  
      return { message: "Error uploading documents", status: 500 };
    }
  }


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
            let metrics_db = [];

            for (let idx in metrics) {
                let name = metrics[idx].name;
                metrics_idx[name] = { ...metrics[idx] };

                let data = metrics[idx];
                metrics_db.push(data);
            }

            let kpis = await ParseIndicators(metrics_idx);

            // Upload transformed metrics into MongoDB
            const response = await uploadToMongo(metrics_db, kpis);

            return Response.json(response);
        };
    } catch (e) {
        console.log(e);
        return Response.json({ message: "Could not read uploaded files", status: 400 });
    }
}