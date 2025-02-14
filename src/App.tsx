import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./components/chat/Chat"; // Componente principal do chat
import { MessageBot, Message } from "./components/message/message"; // Componentes para mensagens
import { Bottom } from "./components/bottom/bottom"; // Componente para a parte inferior da interface
import "./components/chat/Chat.css"; // Estilos do chat
import './App.css'; // Estilos gerais

const App = () => {
    const [text, setText] = useState(""); // Texto do usuário
    const [result, setResult] = useState(""); // Resultado da classificação
    const [messages, setMessages] = useState([]); // Histórico de mensagens

    // Carrega as mensagens iniciais ao montar o componente
    useEffect(() => {
        const initialMessages = [
            {
                type: "bot",
                text: "Olá! Eu sou um bot que classifica notícias como falsas ou verdadeiras. Por usar modelos de inteligência artificial, minhas informações não são 100% corretas. Não tome minhas respostas como verdade absoluta!",
            },
            {
                type: "bot",
                text: "Para obter melhores respostas, prefira usar mensagens sem ponto de interrogação. Por exemplo, ao invés de utilizar 'o céu é azul?' use 'o céu é azul', que o nosso modelo consegue entender melhor! Também estamos limitados a questões relacionadas a política, então perguntas fora do tema não há como garantir uma resposta adequada do modelo.",
            },
        ];

        setMessages(initialMessages); // Mensagens iniciais
    }, []);

    // Função para enviar a mensagem e obter o resultado da classificação
    const handleSubmit = async (e, texto) => {
        e.preventDefault();
        setText(texto);
        
        if (!texto.trim()) return; // Não enviar se o campo estiver vazio

        // Adiciona a mensagem do usuário ao histórico
        const userMessage = { type: "user", text: texto };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post("http://localhost:3001/classify", { text: texto });
            const prediction = response.data.result;

            const message =
                prediction === 1 ? (
                    <p className="prediction">
                        A notícia enviada foi identificada como falsa pelo nosso modelo. No entanto, isso não significa que
                        ela de fato é falsa. Sempre verifique suas informações em agências de checagem de fatos confiáveis, como{" "}
                        <a href="https://www.aosfatos.org/" target="_blank" rel="noopener noreferrer">
                            Agência aos Fatos
                        </a>,{" "}
                        <a href="https://lupa.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Agência Lupa
                        </a>, e até mesmo nos grandes jornais como{" "}
                        <a href="https://www.opovo.com.br/" target="_blank" rel="noopener noreferrer">
                            O Povo
                        </a>,{" "}
                        <a href="https://www.folha.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Folha de São Paulo
                        </a>, e{" "}
                        <a href="https://oglobo.globo.com/" target="_blank" rel="noopener noreferrer">
                            O Globo
                        </a>{" "}
                        para confirmar se sua notícia é mesmo falsa.
                    </p>
                ) : (
                    <p className="prediction">
                        A notícia enviada pode ser verdadeira, nosso modelo não apontou como falsa. No entanto, isso não
                        significa que ela de fato é verdadeira. Sempre verifique suas informações em agências de checagem
                        de fatos confiáveis, como{" "}
                        <a href="https://www.aosfatos.org/" target="_blank" rel="noopener noreferrer">
                            Agência aos Fatos
                        </a>,{" "}
                        <a href="https://lupa.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Agência Lupa
                        </a>, e até mesmo nos grandes jornais como{" "}
                        <a href="https://www.opovo.com.br/" target="_blank" rel="noopener noreferrer">
                            O Povo
                        </a>,{" "}
                        <a href="https://www.folha.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Folha de São Paulo
                        </a>, e{" "}
                        <a href="https://oglobo.globo.com/" target="_blank" rel="noopener noreferrer">
                            O Globo
                        </a>{" "}
                        para confirmar se sua notícia é mesmo verdadeira.
                    </p>
                );

            // Adiciona a mensagem do bot com o resultado ao histórico
            setMessages((prevMessages) => [...prevMessages, { type: "bot", text: message }]);
        } catch (err) {
            console.error("Erro no React:", err);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "bot", text: "Ocorreu um erro ao tentar classificar a notícia. Tente novamente mais tarde." },
            ]);
        }
    };

    return (
        <div className="container">
            <Chat>
                {messages.map((message, index) => {
                    return message.type === "bot" ? (
                        <MessageBot key={index} text={message.text} />
                    ) : (
                        <Message key={index} text={message.text} />
                    );
                })}
                <Bottom handleSubmit={handleSubmit} setText={setText} text={text} />
            </Chat>
        </div>
    );
};

export default App;
