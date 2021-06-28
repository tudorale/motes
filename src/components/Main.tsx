import React, {useState} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';
import {useHistory} from "react-router-dom"
import {db} from "./services/Firebase";

function Main() {
    const [key, setKey] = useState<string>("");
    const [status, setStatus] = useState<string>("");
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

            db.collection("motes").get().then((data) => {
                data.forEach(doc => {
                    motes.push(doc.id);
                })
            }).then(() => {
                for(let i = 0; i < motes.length; i++){
                   if(key === motes[i]){
                       history.push(`/mote/${motes[i]}`)
                   }else{
                        const moteData = {
                            title: "This is a new mote, you can edit this title by clicking it.",
                            
                        }

                        db.collection("motes").doc(key).set(moteData).then(() => {
                            setStatus("You will be redirected to the mote.")
                            history.push(`/mote/${key}`)
                        })
                   }
                }
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
                    <button>Join/Create Mote <span>*</span></button>
                </form>
                <p className="status">{status}</p>
                <p className="note">* If a mote with that key doesn't exist, it will create one, if it exists it will join the mote.</p>
            </div>

            <Footer />
        </div>
    )
}

export default Main
