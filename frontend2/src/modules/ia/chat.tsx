import { type ReactNode, useState } from "react";
import "./chat.css";
import { FaComment } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { FaRobot } from "react-icons/fa6";

import { SendPrompt } from "@/api/ia/gemini";


type PropsWithChildren<P> = P & { children?: ReactNode };

export const ChatIA = () => {

    const [textMsg, setTextMsg] = useState("")
    const [msgList, setMsgList] = useState<{msg:string, type:"incomming"| "outgoing"}[]>([])

    //let msgList:{msg:string, type:"incomming"| "outgoing"}[] = []

    const btnSendClick = () => {
        
        setMsgList(prevMsgList => [...prevMsgList, {type:"outgoing", msg:textMsg}])

        SendPrompt(textMsg).then(r=>{
            r.json().then((data:string) => {
                console.log("data", data);
                setMsgList(prevMsgList => [...prevMsgList, {type:"incomming", msg:data}])
            })
        }).catch(e=>{
            console.log(e);
        })
        setTextMsg("")
        
    }

    console.log("chat");
    return (
        <div className="chat_ia">
            <header>
                <h2>salusito</h2>
            <span>
                <FaX />
            </span>
            </header>
            <ul className="chatbox">
            {msgList.map(e=>{
                if (e.type == "incomming"){
                    return MessageIncomming(e.msg)
                }else{
                    return MessageOutgoing(e.msg)
                }
            })
            }
            </ul>

            <footer className="chat-input">
                <textarea required value={textMsg} onChange={e=>{setTextMsg(e.target.value)}}></textarea>
                <span onClick={btnSendClick}><IoSendSharp size={20}/></span>
            </footer>
        </div>
    );
};

const MessageStyle = (props:PropsWithChildren<{className:string}>)=>{
    return (
        <li className={"chat"+ " "+ props.className}>{props.children}</li>
    )
}

const MessageIncomming= (msg:string/*msgs:string[]*/)=>{
    if (!msg) msg = "Hola 👋≧◉ᴥ◉≦" //["Hola 👋≧◉ᴥ◉≦"];
    return (

    <MessageStyle className="incoming">
        <span><FaRobot size={32}/></span>
        <p>{msg}</p>
    </MessageStyle>
    )
}

const MessageOutgoing = (msg:string) => {
    if (!msg) msg = "Hola 👋≧◉ᴥ◉≦"
return(
    
    <MessageStyle className="outgoing">
        <p>{msg}</p>
    </MessageStyle>
)
}

export const ChatIABotton = () => {
    return (
        <button
            className="chatbot-toggler"
            onClick={() => document.body.classList.toggle("show-chatbot")}
        >
            {/* <span className="material-symbols-outlined">mode_comment</span> */}
            <span>
                <FaComment />
            </span>
            {/* <span className="material-symbols-outlined">close</span> */}
            <span>
                <FaX />
            </span>
        </button>
    );
};
