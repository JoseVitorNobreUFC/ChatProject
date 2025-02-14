const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const userInput = req.body.text;

        console.log("Texto recebido do React:", userInput);

        // Atualize para a URL da API Python hospedada na Vercel
        const API_URL = "https://chat-project-iota-smoky.vercel.app/api/predict";

        // Faz a requisição para a API Python
        const response = await axios.post(API_URL, { text: userInput });

        console.log("Resposta da API Python:", response.data);

        // Retorna a previsão para o front-end
        res.status(200).json({ result: response.data.prediction[0] });
    } catch (error) {
        console.error("Erro ao chamar a API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erro ao classificar o texto" });
    }
};
