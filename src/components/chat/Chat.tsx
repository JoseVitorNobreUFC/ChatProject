function Chat ({...props}) {

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./iconBot.png"></img>
          <div className="name">
            <span>SinceroBot</span>
            <p>Bot oriundo do trabalho de conclusão de curso, com o objetivo de ajudar na detecção de notícias falsas</p>
          </div>
        </div>
      </div>
      <div className="body">
        {props.children}
      </div>
    </div>
  )
}

export default Chat