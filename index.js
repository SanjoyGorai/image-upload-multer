import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.json());

// Use the upload routes
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send({
    name: "Sanjoy Gorai ",
    age: 24,
    phone: 9064619983,
    email: "sanjoygorai@gmail.com",
    address: "123 Main St, Bankura, India",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

