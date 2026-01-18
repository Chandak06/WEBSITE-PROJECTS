import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express"
import {inngest,functions} from './lib/inngest.js'
import cors from 'cors'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();

app.use(express.json());
app.use(cors({origin : ENV.CLIENT_URL,credentials : true}))
app.use("/api/inngest",serve({client :inngest,functions}))

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server", error);
  }
};
startServer();
