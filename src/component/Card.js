import { useState , useRef } from 'react';

import './Card.css'
function Cards(props){
    const iframeRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [scr, setScr] = useState('')
    const onCLickHandler = () => {
        
        props.deleteCard(props.id);
    }
    const onEditHandler = () => {
        const xD = {'title':`${props.title}`, 'src':`${props.src}`, 'type':`${props.type}`, 'id': `${props.id}`}
        props.editCard(xD);
    
    }
    const onPlayHandler =() => {
        console.log(props.src);
        let source = 'https://www.youtube.com/embed/';
        let videoID='';
        for(let i = props.src.length - 1; i>0; i--){
            if(props.src[i] !== '/'){
                videoID += props.src[i];
            }
            else{
                break;
            }
        }
        let reversedString = videoID.split("").reverse().join("");
        source += reversedString;
        console.log(source);
        setScr(source);
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const historyDetails = {'title' : `${props.title}`, 'src' : `${props.src}`, 'time' : `${hours}:${minutes}:${seconds}`}
        props.historyEdit(historyDetails);
        setIsPlay(true);

    }
    const onCloseHandler = () => {
    //     const iframe = iframeRef.current;
    //     const iframeContent = iframe.contentWindow.document;

    // // Pause or stop the video player
    //     const video = iframeContent.getElementsByTagName("video")[0];
    //     video.pause(); // 
        setIsPlay(false);
    }
    return (
            <>
                <div className={`${isPlay ? 'video_player': 'hidden'}`}>
                    <iframe ref={iframeRef} width="560" height="315" src={scr} frameBorder="0" allowFullScreen crossOrigin="use-credentials"></iframe>
                    <button onClick={onCloseHandler}>Close</button>

                </div>
                <div className="card__container">
                    <h3>{props.title}</h3>
                    <button className='delete' onClick={onCLickHandler}>➖</button>
                    <button className='edit' onClick={onEditHandler}>✏️</button>
                    <button className='play' onClick={onPlayHandler}>▶️</button>
                    <p>{props.src}</p>

                </div>
            </>
            
    )
}

export default Cards;