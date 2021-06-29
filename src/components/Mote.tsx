import React, {useState, useEffect} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import {db} from "./services/Firebase";
import Helmet from "react-helmet";

function Mote(props: any) {
    const key = props.match.params.key;
    const [title, setTitle] = useState<string>("");
    const [creationTime, setCreationTime] = useState<string>("");
    const [notes, setNotes] = useState<string>(``);
    const [localKey, setLocalKey] = useState<string>(key)

    useEffect(() => {

        db.collection("motes").doc(key).get().then((d: any) => {
            let data = d.data();
            setTitle(data.title);
            setCreationTime(data.creationTime.toString());
            setNotes(data.notes)
        })
    }, [key])

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleNotes = (e: any) => {
        setNotes(e.target.value)
    }

    const handleKey = (e: any) => {
        setLocalKey(e.target.value)
    }

    const handleEditIcon = (input: string) => {
        let i = document.querySelector(`${input}`) as HTMLElement;
        i.focus();
    }

    return (
        <>
            <Helmet>
                <title>Motes | {title}</title>  
            </Helmet>

            <div className="moteWrapper">
                <Navbar/>

                <div className="moteContent">
                    <div className="titleWrapper">
                        <input type="text" value={title} onChange={e => handleTitle(e)} id="title" maxLength={45} />
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleEditIcon("#title")} width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                    </div>
                    
                    <textarea value={notes} id="notes" onChange={e => handleNotes(e)}></textarea>
                    <div className="moteInfo">
                        <h1>Mote info</h1>
                        <p className="keyWrapper">
                            Key: <input type="text" value={localKey} onChange={e => handleKey(e)} id="key" maxLength={10} minLength={5} />
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleEditIcon("#key")} width="24" height="24" viewBox="0 0 24 24"><path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                        </p>
                        <p>Creation Time: <span>{creationTime}</span></p>
                        <p>* Give this key to your firends or to somebody who wants to see your notes or modify them, everyone who has the key from this mote can edit the mote.</p>
                        <p>* When you change something is automatically saved, you don't have to press any keys or press a button to save a change.</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Mote
