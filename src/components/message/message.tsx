export function MessageBot({ text }: { text: string | JSX.Element }) {
    return (
      <div className="message">
        <img src="./iconBot.png" alt="Bot Icon" />
        <div className="texts">
          <p>{text}</p>
        </div>
      </div>
    );
  }
  
  export function Message({ text }: { text: string | JSX.Element }) {
    return (
      <div className="message own">
        <div className="texts">
          <p>{text}</p>
        </div>
      </div>
    );
  }
  