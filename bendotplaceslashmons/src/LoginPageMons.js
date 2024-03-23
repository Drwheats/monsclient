import {useEffect, useState} from "react";

export default function LoginPageMons() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUserNameChange(e) {
        setUsername(e.target.value);
    }    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    return (
        <div className="pokeDexContainer">
            <h1 className="monPageHeader" style={{padding: "10px"}}>Welcome Trainer!</h1>
            <div className="floating">
                <input id="inputId" className="floating__input" style={{width: "250px", marginLeft: "10px"}} name="input name"
                       onChange={handleUserNameChange}
                       value={username} placeholder="Placeholder"/>
                <label htmlFor="inputId" className="floating__label" data-content="username">
                </label>
            </div>
            <div className="floating">
                <input id="inputId" className="floating__input" name="input name" type="password" style={{width: "250px", marginLeft: "10px"}}
                       onChange={handlePasswordChange}
                       value={password} placeholder="Placeholder"/>
                <label htmlFor="inputId" className="floating__label" data-content="password">
                </label>
                <h2 style={{padding: "10px"}}>Coming soon...</h2>
            </div>
        </div>
    )
}