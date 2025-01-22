export function MessageBot({...props}) {
    return (
    <div className="message">
        <img src="./iconBot.png" alt="" />
        <div className="texts">
            <p>{props.text}</p>
        </div>
    </div>)
}

export function Message({...props}) {
    return (
    <div className="message own">
        <div className="texts">
            <p>{props.text}</p>
        </div>
    </div>)
}