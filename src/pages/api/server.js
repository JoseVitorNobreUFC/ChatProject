import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "https://chat-project-iota-smoky.vercel.app", // Ajuste para seu domínio real
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());

const API_URL = "https://chat-project-iota-smoky.vercel.app/api/predict";

app.post("/api/classify", async (req, res) => {
    try {
        const userInput = req.body.text;

        console.log("Texto recebido do React:", userInput);

        const response = await axios.post(API_URL, { text: userInput });

        console.log("Resposta da API Python:", response.data);

        const prediction = response.data.prediction[0];

        res.json({ result: prediction });
    } catch (error) {
        console.error("Erro ao chamar a API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erro ao classificar o texto" });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
