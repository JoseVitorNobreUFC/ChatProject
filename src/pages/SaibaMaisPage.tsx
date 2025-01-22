import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/chat/Chat";
import { MessageBot } from "../components/message/message";

const SaibaMaisPage: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <div className="container">
            <Chat>
                <MessageBot 
                        text={
                            <>
                                Olá! Eu sou um bot que classifica notícias como falsas ou verdadeiras. Por usar modelos de inteligência artificial, minhas informações não são 100% corretas. Não tome minhas respostas como verdade absoluta! 
                                Para mais informações clique aqui <Link to="/">Voltar para a página principal</Link>
                            </>
                        } 
                    />
                <MessageBot text="Para obter melhores respostas, prefira usar mensagens sem ponto de interrogação. Por exemplo, ao invés de utilizar 'o céu é azul?' use 'o céu é azul', que o nosso modelo consegue entender melhor! Também estamos limitados a questões relacionadas a política, então perguntas fora do tema não há como garantir uma resposta adequada do modelo. " />
            </Chat>
                
            </div>
        </div>
    );
};

export default SaibaMaisPage;
