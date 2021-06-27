import React, {useState} from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';

function Main() {
    const [key, setKey] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    return (
        <div className="main">
            <Navbar/>

            <div className="content">
                <h1>Join or create a mote</h1>
                <form>
                    <div className="inputField">
                        <label htmlFor="key">Mote key</label>
                        <input type="text" id="key" value={key} onChange={e => setKey(e.target.value)}/>
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
