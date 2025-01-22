import React from "react";
import { Link } from "react-router-dom";

const SaibaMaisPage: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Saiba Mais</h1>
            <p>
                Este é um bot que utiliza inteligência artificial para classificar notícias como falsas ou verdadeiras.
                Lembre-se de verificar sempre suas informações em fontes confiáveis.
            </p>
            <p>
                Para mais informações sobre nosso projeto, entre em contato conosco.
            </p>
            <Link to="/">Voltar para a página principal</Link>
        </div>
    );
};

export default SaibaMaisPage;
