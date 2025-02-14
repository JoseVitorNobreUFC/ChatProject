const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.status(204).end();
        return;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    try {
        const userInput = req.body.text;
        console.log("Texto recebido do React:", userInput);

        // Certifique-se de usar a URL correta da API Python
        const API_URL = "https://chat-project-iota-smoky.vercel.app/api/predict";

        const response = await axios.post(API_URL, { text: userInput });

        console.log("Resposta da API Python:", response.data);

        res.status(200).json({ result: response.data.prediction[0] });
    } catch (error) {
        console.error("Erro ao chamar a API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erro ao classificar o texto" });
    }
};
