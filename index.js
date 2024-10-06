import express from "express";
import dotenv from "dotenv";

import { connectionDB } from "./Backend/database/db.js";

import productroutes from "./Backend/routes/product.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products/", productroutes);

app.listen(PORT, () => {
	connectionDB();
	console.log(`Server start at http:/localhost${PORT}`);
})

