import React, {useState} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';
import {useHistory} from "react-router-dom"
import {db} from "./services/Firebase";
import firebase from "firebase/app";

function Main() {
    const [key, setKey] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [buttonStatus, setButtonStatus] = useState<string>("Join/Create a Mote");
    const history = useHistory();

    const handleFocus = (label: string, input: string): void => {
        let l = document.querySelector<HTMLElement>(`${label}`)!;
        let i = document.querySelector<HTMLElement>(`${input}`)!;
        if (l) {
          l.style.top = `22px`;
          i.style.height = "55px";
          l.style.fontSize = ".9rem";
        }
    };
       
    const handleBlur = (label: string, input: string): void => {
        let l = document.querySelector<HTMLElement>(`${label}`)!;
        let i = document.querySelector(`${input}`) as HTMLInputElement;
        if (l) {
          if (i.value === "") {
            l.style.top = `32px`;
            i.style.height = "45px";
            l.style.fontSize = "1rem";
          } else {
            return;
          }
        }
    };

    const handleChange = (e: any) => {
        setKey(e.target.value);
        setStatus("");
    }

    const handleMote = (e:any) => {
        e.preventDefault();
        
        if(key.length > 10){
            setStatus("The key should have less than 10 characters.")
        }else if(key.length < 5){
            setStatus("The key should have more than 5 characters.")
        }else if(key.length >= 5 && key.length <= 10){
            // get the motes from database
            const motes: string[] = [];

            setButtonStatus("Loading...");
            let btn = document.querySelector("#actionButton") as HTMLButtonElement;
            btn.setAttribute("disabled", "");

            db.collection("motes").get().then((data) => {
                data.forEach(doc => {
                    motes.push(doc.id);
                })
            }).then(() => {
                if(motes.includes(key)){
                    history.push(`/mote/${key}`)
                }else{
                    const moteData = {
                        title: "This is a new mote, you can edit this title by clicking it.",
                        creationTime: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString(),
                        notes: ``,
                    }

                    db.collection("motes").doc(key).set(moteData).then(() => {
                        setStatus("You will be redirected to the mote.")
                        history.push(`/mote/${key}`)
                    })
                }
            }).catch(() => {
                setButtonStatus("Join/Create a Mote *");
                btn.removeAttribute("disabled");
            })
 
        }
    }

    return (
        <div className="main">
            <Navbar/>

            <div className="content">
                <h1>Join or create a mote</h1>
                <form onSubmit={(e) => handleMote(e)}>
                    <div className="inputField">
                        <label htmlFor="key" id="keylabel">Mote Key</label>
                        <input type="text" id="key" maxLength={10} minLength={5} value={key} onChange={e => handleChange(e)} onFocus={() => handleFocus("#keylabel", "#key")} onBlur={() => handleBlur("#keylabel", "#key")}/>
                    </div>
                    <button id="actionButton">{buttonStatus}</button>
                </form>
                <p className="status">{status}</p>
                <p className="note">* If a mote with that key doesn't exist, it will create one, if it exists it will join the mote.</p>
                <p className="note" style={{marginTop: "15px"}}>* Choose a complex key for the mote, everyone who has the key from your mote can edit and view your notes.</p>
            </div>

            <Footer />
        </div>
    )
}

export default Main
