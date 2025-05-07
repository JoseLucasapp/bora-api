import "dotenv/config";
import Express, { Request, Response } from "express";
import Cors from "cors";
import mongoose from "mongoose"

import userRoutes from "./routes/users";
import groupsRouter from "./routes/groups";

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 8000;

const app = Express();

app.use(Cors());
app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Bora API");
})

app.use("/api", userRoutes);
app.use("/api", groupsRouter);

app.listen(PORT, () => console.log("Server running on port " + PORT));