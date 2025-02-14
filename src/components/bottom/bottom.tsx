import { useState } from 'react';

export function Bottom({ handleSubmit }) {
    const [text, setText] = useState("");
    return (
        <div className="bottom">
            <div>
                
                <form onSubmit={(e) => {
                    handleSubmit(e, text)
                    setText('');
                }}
                className='form-container'>
                    <label>
                        Insira a notícia:
                        <textarea id="text" name="text" 
                            value={text}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    handleSubmit(e, text)
                                    setText('');
                                }
                            }}
                            onChange={(e) => setText(e.target.value)}
                            />      
                    </label>
                    <br />
                    {
                    
                    //<div className="icons">
                    //    <img src="./upload.png" alt="" />
                    //</div>
                }
                    <button type='submit'className='sendButton'>Enviar</button>
                </form>
            </div>
    </div>
    )
}