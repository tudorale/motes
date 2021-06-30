import React from 'react'
import Navbar from './subcomponent/Navbar'
import "../style/css/main.css";
import Footer from './subcomponent/Footer';

function About() {
    return (
        <>
            <Navbar /> 
                <div className="about">
                    <h1>What is "Motes"</h1>
                    <p>Motes is a place where you can keep all your notes in one place, the project started with the idea of a global Notes App as you have on your phone or computer, now you can keep all your notes here and you can access them on every device by going to your mote. Motes isn't a place to keep your notes secure, everyone can access your note if they know your key, this is also a feature, you can share your notes with everyone, giving them access to your mote.</p>
                
                    <h1>How does it work?</h1>
                    <p>On the main page you can create a mote or join one, when you enter the key if a mote exists with that key, it will join and you will see the notes that were typed by someone, if a mote doesn't exist, it will create one with placeholders, you can edit them by clicking on the text. Everything is automatically saved after 1 second, after you pressed the last key, into the database.</p>
                
                    <p className="note">Mote - we are using the word "mote" to refer to a room, a global place where you type your actual notes or something else.</p>
                </div>
        </>
    )
}

export default About
