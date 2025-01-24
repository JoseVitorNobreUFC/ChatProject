import React, { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./../components/chat/Chat";
import { MessageBot, Message } from "./../components/message/message";
import { Bottom } from "./../components/bottom/bottom";
import "./../components/chat/Chat.css";
import "./../App.css";
import { Link } from "react-router-dom";

interface MessageType {
    type: "bot" | "user";
    text: string | JSX.Element;
}

const MainPage: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initialMessages: MessageType[] = [
            {
                type: "bot",
                text: (
                    <>
                        Olá! Eu sou um bot que classifica notícias como falsas ou verdadeiras. Por usar modelos de inteligência artificial, minhas informações não são 100% corretas. Não tome minhas respostas como verdade absoluta! Para mais informações, acesse nossa página de{" "}
                        <Link to="/saiba-mais">Saiba Mais</Link>.
                    </>
                ),
            },
            {
                type: "bot",
                text: "Para obter melhores respostas, prefira usar mensagens sem ponto de interrogação. Por exemplo, ao invés de utilizar 'o céu é azul?' use 'o céu é azul', que o nosso modelo consegue entender melhor! Também estamos limitados a questões relacionadas a política, então perguntas fora do tema não há como garantir uma resposta adequada do modelo.",
            },
        ];

        setMessages(initialMessages); 
    }, []);

    const handleTypingEffect = async (fullMessage: JSX.Element | string) => {
        const addMessagePart = (partialText: JSX.Element | string) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = { type: "bot", text: partialText };
                return updatedMessages;
            });
        };
    
        const isJSX = React.isValidElement(fullMessage);
        if (typeof fullMessage === "string" || !isJSX) {
            // Para strings simples
            const text = typeof fullMessage === "string" ? fullMessage : "";
            let displayedText = "";
            for (let i = 0; i < text.length; i++) {
                displayedText += text[i];
                addMessagePart(displayedText);
                await new Promise((resolve) => setTimeout(resolve, 30)); // Intervalo entre caracteres
            }
        } else if (isJSX) {
            // Para JSX.Element
            const jsxParts = (fullMessage as JSX.Element).props.children;
            let displayedJSX: (string | JSX.Element)[] = [];
    
            for (let i = 0; i < jsxParts.length; i++) {
                displayedJSX.push(jsxParts[i]);
                addMessagePart(<>{displayedJSX}</>);
                await new Promise((resolve) => setTimeout(resolve, 100)); // Intervalo entre partes de JSX
            }
        }
    };
    
    

    const handleSubmit = async (e: React.FormEvent, texto: string) => {
        e.preventDefault();
        setText(texto);

        if (!texto.trim() || isLoading) return;

        setIsLoading(true);

        const userMessage: MessageType = { type: "user", text: texto };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const loadingMessage: MessageType = { type: "bot", text: <div className="loader"></div> };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        try {
            const response = await axios.post("http://localhost:3001/classify", { text: texto });
            const prediction = response.data.result;

            const message: JSX.Element =
                prediction === 1 ? (
                    <>
                        A notícia enviada foi identificada como falsa pelo nosso modelo. No entanto, isso não significa que
                        ela de fato é falsa. Sempre verifique suas informações em agências de checagem de fatos confiáveis, como {" "}
                        <a href="https://www.aosfatos.org/" target="_blank" rel="noopener noreferrer">
                            Agência aos Fatos
                        </a>, {" "}
                        <a href="https://lupa.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Agência Lupa
                        </a>, e até mesmo nos grandes jornais como {" "}
                        <a href="https://www.opovo.com.br/" target="_blank" rel="noopener noreferrer">
                            O Povo
                        </a>, {" "}
                        <a href="https://www.folha.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Folha de São Paulo
                        </a>, e {" "}
                        <a href="https://oglobo.globo.com/" target="_blank" rel="noopener noreferrer">
                            O Globo
                        </a> {" "}
                        para confirmar se sua notícia é mesmo falsa.
                    </>
                ) : (
                    <>
                        A notícia enviada pode ser verdadeira, nosso modelo não apontou como falsa. No entanto, isso não
                        significa que ela de fato é verdadeira. Sempre verifique suas informações em agências de checagem
                        de fatos confiáveis, como {" "}
                        <a href="https://www.aosfatos.org/" target="_blank" rel="noopener noreferrer">
                            Agência aos Fatos
                        </a>, {" "}
                        <a href="https://lupa.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Agência Lupa
                        </a>, e até mesmo nos grandes jornais como {" "}
                        <a href="https://www.opovo.com.br/" target="_blank" rel="noopener noreferrer">
                            O Povo
                        </a>, {" "}
                        <a href="https://www.folha.uol.com.br/" target="_blank" rel="noopener noreferrer">
                            Folha de São Paulo
                        </a>, e {" "}
                        <a href="https://oglobo.globo.com/" target="_blank" rel="noopener noreferrer">
                            O Globo
                        </a> {" "}
                        para confirmar se sua notícia é mesmo verdadeira.
                    </>
                );

            await handleTypingEffect(message);
        } catch (err) {
            console.error("Erro no React:", err);
            await handleTypingEffect(<>Ocorreu um erro ao tentar classificar a notícia. Tente novamente mais tarde.</>);
        } finally {
            console.log(messages)
            setIsLoading(false);
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
                <Bottom handleSubmit={handleSubmit} isLoading={isLoading} />
            </Chat>
        </div>
    );
};

export default MainPage;
