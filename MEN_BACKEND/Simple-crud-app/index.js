import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from node api");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message:"Product not found"})
    }
    res.status(200).json({message:"Product deleted successfully"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://Chandak06:Hchandak06%400605@backend-01.ii7qx6s.mongodb.net/CRUD-API?retryWrites=true&w=majority&appName=Backend-01"
  )

  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
