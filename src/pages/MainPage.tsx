import React, { useState } from "react";
import axios from "axios";
import Chat from "./../components/chat/Chat";
import { MessageBot, Message } from "./../components/message/message";
import { Bottom } from "./../components/bottom/bottom";
import "./../components/chat/Chat.css";
import "./../App.css";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
    const [text, setText] = useState<string>(""); 
    const [result, setResult] = useState<React.ReactNode>(""); 

    const handleSubmit = async (e: React.FormEvent, texto: string): Promise<void> => {
        e.preventDefault(); 

        setResult(""); 
        setText(texto); 

        try {
            const response = await axios.post<{ result: number }>("http://localhost:3001/classify", { text: texto });
            const prediction = response.data.result;

            const message: React.ReactNode =
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

            setResult(message); 
        } catch (err) {
            console.error("Erro no React:", err);
            setResult(<p className="prediction">Ocorreu um erro ao tentar classificar a notícia.</p>);
        }
    };

    return (
        <div className="container">
            <Chat>
                <MessageBot 
                        text={
                            <>
                                Olá! Eu sou um bot que classifica notícias como falsas ou verdadeiras. Por usar modelos de inteligência artificial, minhas informações não são 100% corretas. Não tome minhas respostas como verdade absoluta! 
                                Para mais informações clique em <Link to="/saiba-mais">Saiba Mais</Link>.
                            </>
                        } 
                    />
                <MessageBot text="Para obter melhores respostas, prefira usar mensagens sem ponto de interrogação. Por exemplo, ao invés de utilizar 'o céu é azul?' use 'o céu é azul', que o nosso modelo consegue entender melhor! Também estamos limitados a questões relacionadas a política, então perguntas fora do tema não há como garantir uma resposta adequada do modelo. " />
                {text && <Message text={text} />}
                {result && <MessageBot text={result as string} />}
                <Bottom handleSubmit={handleSubmit} />
            </Chat>
        </div>
    );
};

export default MainPage;
