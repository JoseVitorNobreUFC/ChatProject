import React, { useState } from "react";

interface BottomProps {
    handleSubmit: (e: React.FormEvent, text: string) => void;
}

export const Bottom: React.FC<BottomProps> = ({ handleSubmit }) => {
    const [text, setText] = useState<string>("");

    return (
        <div className="bottom">
            <div className="form-container">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e, text);
                        setText("");
                    }}
                >
                    <label>
                        Insira a notícia:
                    </label>
                        <textarea
                            id="text"
                            name="text"
                            value={text}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e, text);
                                    setText("");
                                }
                            }}
                            className="chatInput"
                            onChange={(e) => setText(e.target.value)}
                        />
                    
                    <br />
                    <button type="submit" className="sendButton">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};
