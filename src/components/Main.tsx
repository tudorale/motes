import React, {useState} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';
import {useHistory} from "react-router-dom"

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

    return (
        <div className="main">
            <Navbar/>

            <div className="content">
                <h1>Join or create a mote</h1>
                <form>
                    <div className="inputField">
                        <label htmlFor="key" id="keylabel">Mote Key</label>
                        <input type="text" id="key" maxLength={10} minLength={5} value={key} onChange={e => setKey(e.target.value)} onFocus={() => handleFocus("#keylabel", "#key")} onBlur={() => handleBlur("#keylabel", "#key")}/>
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
