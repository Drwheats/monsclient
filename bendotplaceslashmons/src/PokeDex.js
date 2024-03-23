import {useEffect, useReducer, useState} from "react";
import Pokemon from "./Pokemon";

export default function PokeDex({expanded, pokedex}) {
    const [dex, setDex] = useState();
    const [showing, setShowing] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // These are ALL for the form:
    const [type1, setType1] = useState("Type 1:")
    const [type2, setType2] = useState("Type 2:")
    const [minSpeed, setMinSpeed] = useState(0);
    const [minPoints, setMinPoints] = useState(0);
    const [maxPoints, setMaxPoints] = useState(25);
    const [monsToShow, setMonsToShow] = useState(75);

    const [monNamePartial, setMonNamePartial] = useState("")
    const [megaChecked, setMegaChecked] = useState(false);
    const [ownedChecked, setOwnedChecked] = useState(false);

    useEffect(() => {
        setDex(pokedex);

    }, []);
    const checkHandleMega = () => {
        setMegaChecked(!megaChecked)
    }
    const checkHandleOwned = () => {
        setOwnedChecked(!ownedChecked)
    }
    function clearButton() {
        setMinSpeed(0);
        setMaxPoints(25);
        setMinPoints(0);
        setType2("Type 2:")
        setType1("Type 1:")
        setShowing([])
        setOwnedChecked(false)
        setMegaChecked(false)
    }
    function sendSearchButton() {
        let tempHolder = []
        let tempMonNamePartial = monNamePartial.toLowerCase();
        let tempMinPoints = Number(minPoints);
        let tempMaxPoints = Number(maxPoints);
        let tempSpeedValue = Number(minSpeed);
        if (type1 !== "Type 1:" && type2 !== "Type 2:") {
            for (let i = 0; i < dex.length; i++) {
                if (dex[i].type1 == type1 || dex[i].type2 == type1) {
                    if (dex[i].type1 == type2 || dex[i].type2 == type2) {
                        if (Number(dex[i].pts) >= tempMinPoints && dex[i].pts <= tempMaxPoints && dex[i].spe >= tempSpeedValue && dex[i].smogonName.includes(tempMonNamePartial)) {
                            if (dex[i].smogonName.includes("mega") && megaChecked) {
                                continue;
                            }
                            if (dex[i].owner !== "" && ownedChecked) {
                                continue;
                            }
                            tempHolder.push(dex[i])

                        }
                    }
                }
            }
        }
        else if (type1 !== "Type 1:") {
            for (let i = 0; i < dex.length; i++) {
                if (dex[i].type1 == type1 || dex[i].type2 === type1) {
                    if (Number(dex[i].pts) >= tempMinPoints && dex[i].pts <= tempMaxPoints && dex[i].spe >= tempSpeedValue && dex[i].smogonName.includes(tempMonNamePartial)) {
                        if (dex[i].smogonName.includes("mega") && megaChecked) {
                            continue;
                        }
                        if (dex[i].owner !== "" && ownedChecked) {
                            continue;
                        }
                        tempHolder.push(dex[i])}
                }
            }
        }
        else if (type1 === "Type 1:" && type2 === "Type 2:") {
            for (let i = 0; i < dex.length; i++) {
                if (Number(dex[i].pts) >= tempMinPoints && dex[i].pts <= tempMaxPoints && dex[i].spe >= tempSpeedValue && dex[i].smogonName.includes(tempMonNamePartial)) {
                        if (dex[i].smogonName.includes("mega") && megaChecked) {
                            continue;
                        }
                        if (dex[i].owner !== "" && ownedChecked) {
                            continue;
                        }
                         tempHolder.push(dex[i])

                        }


            }
        }
        setShowing(tempHolder)
    }
    function handleTextareaChangeMonName(e) {
        setMonNamePartial(e.target.value);
    }
    function handleTextareaChangeMinPoints(e) {
        setMinPoints(e.target.value);
    }
    function handleTextareaChangeMaxPoints(e) {
        setMaxPoints(e.target.value);
    }
    function handleTextareaChangeMinSpeed(e) {
        setMinSpeed(e.target.value);
    }

    function handleTextareaChangeMonsToShow(e) {
        setMonsToShow(e.target.value);
    }


    function sortSpeed() {
        let tempShow = showing.sort((a, b) => b.spe - a.spe);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortAttack() {
        let tempShow = showing.sort((a, b) => b.atk - a.atk);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortSpecialAttack() {
        let tempShow = showing.sort((a, b) => b.spa - a.spa);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortDefense() {
        let tempShow = showing.sort((a, b) => b.def - a.def);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortSpecialDefense() {
        let tempShow = showing.sort((a, b) => b.spd - a.spd);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortHP() {
        let tempShow = showing.sort((a, b) => b.hp - a.hp);
        setShowing(tempShow);
        forceUpdate();
    }
    function sortPoints() {
        let tempShow = showing.sort((a, b) => b.pts - a.pts);
        setShowing(tempShow);
        forceUpdate();
    }

    return (
        <div>
            <div className="pokeDexContainer">
                <div className="pokeDexChromeHolder">
                    <div className="floating">
                        <input id="inputId" className="floating__input" name="input name"
                               onChange={handleTextareaChangeMonName}
                               value={monNamePartial} placeholder="Placeholder"/>
                        <label htmlFor="inputId" className="floating__label" data-content="Name">
                        </label>
                    </div>
                    <div className="dropdown">
                        <button className="monDexDropdown">{type1}</button>
                        <div className="dropdown-content">
                            <button style={{
                                backgroundColor: 'red'
                            }} onClick={() => {
                                setType1("Type 1:")
                            }} className="sortButton">None
                            </button>
                            <button onClick={() => {
                                setType1("Normal")
                            }} className="sortButton">Normal
                            </button>
                            <button onClick={() => {
                                setType1("Fighting")
                            }} className="sortButton">Fighting
                            </button>
                            <button onClick={() => {
                                setType1("Water")
                            }} className="sortButton">Water
                            </button>
                            <button onClick={() => {
                                setType1("Fire")
                            }} className="sortButton">Fire
                            </button>
                            <button onClick={() => {
                                setType1("Grass")
                            }} className="sortButton">Grass
                            </button>
                            <button onClick={() => {
                                setType1("Electric")
                            }} className="sortButton">Electric
                            </button>
                            <button onClick={() => {
                                setType1("Dragon")
                            }} className="sortButton">Dragon
                            </button>
                            <button onClick={() => {
                                setType1("Fairy")
                            }} className="sortButton">Fairy
                            </button>
                            <button onClick={() => {
                                setType1("Steel")
                            }} className="sortButton">Steel
                            </button>
                            <button onClick={() => {
                                setType1("Rock")
                            }} className="sortButton">Rock
                            </button>
                            <button onClick={() => {
                                setType1("Ice")
                            }} className="sortButton">Ice
                            </button>
                            <button onClick={() => {
                                setType1("Ground")
                            }} className="sortButton">Ground
                            </button>
                            <button onClick={() => {
                                setType1("Bug")
                            }} className="sortButton">Bug
                            </button>
                            <button onClick={() => {
                                setType1("Poison")
                            }} className="sortButton">Poison
                            </button>
                            <button onClick={() => {
                                setType1("Psychic")
                            }} className="sortButton">Psychic
                            </button>
                            <button onClick={() => {
                                setType1("Dark")
                            }} className="sortButton">Dark
                            </button>
                            <button onClick={() => {
                                setType1("Ghost")
                            }} className="sortButton">Ghost
                            </button>
                            <button onClick={() => {
                                setType1("Flying")
                            }} className="sortButton">Flying
                            </button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="monDexDropdown">{type2}</button>

                        <div className="dropdown-content">
                            <button style={{
                                backgroundColor: 'red'
                            }} onClick={() => {

                                setType2("Type 2:")
                            }} className="sortButton">None
                            </button>
                            <button onClick={() => {
                                setType2("Normal")
                            }} className="sortButton">Normal
                            </button>
                            <button onClick={() => {
                                setType2("Fighting")
                            }} className="sortButton">Fighting
                            </button>
                            <button onClick={() => {
                                setType2("Water")
                            }} className="sortButton">Water
                            </button>
                            <button onClick={() => {
                                setType2("Fire")
                            }} className="sortButton">Fire
                            </button>
                            <button onClick={() => {
                                setType2("Grass")
                            }} className="sortButton">Grass
                            </button>
                            <button onClick={() => {
                                setType2("Electric")
                            }} className="sortButton">Electric
                            </button>
                            <button onClick={() => {
                                setType2("Dragon")
                            }} className="sortButton">Dragon
                            </button>
                            <button onClick={() => {
                                setType2("Fairy")
                            }} className="sortButton">Fairy
                            </button>
                            <button onClick={() => {
                                setType2("Steel")
                            }} className="sortButton">Steel
                            </button>
                            <button onClick={() => {
                                setType2("Rock")
                            }} className="sortButton">Rock
                            </button>
                            <button onClick={() => {
                                setType2("Ice")
                            }} className="sortButton">Ice
                            </button>
                            <button onClick={() => {
                                setType2("Ground")
                            }} className="sortButton">Ground
                            </button>
                            <button onClick={() => {
                                setType2("Bug")
                            }} className="sortButton">Bug
                            </button>
                            <button onClick={() => {
                                setType2("Poison")
                            }} className="sortButton">Poison
                            </button>
                            <button onClick={() => {
                                setType2("Psychic")
                            }} className="sortButton">Psychic
                            </button>
                            <button onClick={() => {
                                setType2("Dark")
                            }} className="sortButton">Dark
                            </button>
                            <button onClick={() => {
                                setType2("Ghost")
                            }} className="sortButton">Ghost
                            </button>
                            <button onClick={() => {
                                setType2("Flying")
                            }} className="sortButton">Flying
                            </button>
                        </div>
                    </div>
                </div>
                <div className="pokeDexChromeHolder">
                    <div className="floating">
                        <input id="inputId" className="floating__input" name="input name"
                               onChange={handleTextareaChangeMinPoints}
                               value={minPoints} placeholder="Placeholder"/>
                        <label htmlFor="inputId" className="floating__label" data-content="Min Points">
                        </label>
                    </div>

                    <div className="floating">
                        <input id="inputId" className="floating__input" name="input name"
                               onChange={handleTextareaChangeMaxPoints}
                               value={maxPoints} placeholder="Placeholder"/>
                        <label htmlFor="inputId" className="floating__label" data-content="Max Points">
                        </label>
                    </div>
                    <div className="floating">
                        <input id="inputId" className="floating__input" name="input name"
                               onChange={handleTextareaChangeMinSpeed}
                               value={minSpeed} placeholder="Placeholder"/>
                        <label htmlFor="inputId" className="floating__label" data-content="Min Speed">
                        </label>
                    </div>
                </div>
                <div className="pokeDexChromeHolder">
                    <label className="toggleLabel">hide megas</label>
                    <label className="switch">
                        <input type="checkbox" checked={megaChecked} onChange={checkHandleMega}></input>
                        <span className="slider round"></span>
                    </label>
                    <label className="toggleLabel">free agents</label>

                    <label className="switch">
                        <input type="checkbox" checked={ownedChecked} onChange={checkHandleOwned}></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="pokeDexChromeHolder">
                    <div className="dropdown">
                        <button className="dropbtn">SORT</button>
                        <div className="dropdown-content">
                            <button onClick={sortSpeed} className="sortButton">Speed</button>
                            <button onClick={sortAttack} className="sortButton">Attack</button>
                            <button onClick={sortSpecialAttack} className="sortButton">Special Attack</button>
                            <button onClick={sortDefense} className="sortButton">Defense</button>
                            <button onClick={sortSpecialDefense} className="sortButton">Special Defense</button>
                            <button onClick={sortHP} className="sortButton">Hit Points</button>
                            <button className="sortButton" onClick={sortPoints}>Points</button>
                        </div>
                    </div>
                </div>
                <div className="pokeDexChromeHolder">
                    <div className="floating">
                        <input id="inputId" className="floating__input" name="input name"
                               onChange={handleTextareaChangeMonsToShow}
                               value={monsToShow} placeholder="Placeholder"/>
                        <label htmlFor="inputId" className="floating__label" data-content="results per page">
                        </label>
                    </div>
                </div>


                <div className="pokeDexChromeHolder">
                    <button className="monDexSearchButton" onClick={sendSearchButton}>Search!</button>
                    <button className="monDexClearButton" onClick={clearButton}>Clear</button>

                </div>

            </div>
            {

                showing.slice(0, monsToShow).map(s => {
                    return <Pokemon key={s.smogonName} owned={s.owner !== ""} mon={s}/>

                })
            }</div>
    )
}