import React, {useState, useEffect} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';
import {db} from "./services/Firebase";
import Helmet from "react-helmet";

function Mote(props: any) {
    const key = props.match.params.key;
    const [title, setTitle] = useState<string>("");
    const [creationTime, setCreationTime] = useState<string>("");
    const [notes, setNotes] = useState<string>(``);

    useEffect(() => {

        db.collection("motes").doc(key).get().then((d: any) => {
            let data = d.data();
            setTitle(data.title);
            setCreationTime(data.creationTime.toString());
            setNotes(data.notes)
        })
    }, [key])

    return (
        <>
            <Helmet>
                <title>Motes | {title}</title>  
            </Helmet>

            <div className="moteWrapper">
                <Navbar/>
                    <div className="moteContent">
                        <h1>{title}</h1>
                        <p>{notes}</p>

                        <div className="moteInfo">
                            <h1>Your Mote</h1>
                            <p>Key: <span>{key}</span></p>
                            <p>Creation Time: <span>{creationTime}</span></p>
                            <p>To share your notes with someone you have to give them your Mote Key, also, the key matters, anyone can view your notes if they know your key.</p>
                        </div>
                    </div>
                <Footer />
            </div>
        </>
    )
}

export default Mote
