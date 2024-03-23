import {useEffect, useState} from "react";
import PokeRules from "./PokeRules";
import CoachMap from "./CoachMap";
import PokeDex from "./PokeDex";
import PokeHome from "./PokeHome";
import LoginPageMons from "./LoginPageMons";
let server = "https://api.fuggo.lol/"
// let server = "http://localhost:4000/";

export default function Mons() {
    const [week, setWeek] = useState(7)
    const [dex, setDex] = useState([])
    const [expandedIcon, setExpandedIcon] = useState("+")
    const [expanded, setExpanded] = useState(false);
    const [mainElementShowing, setMainElementShowing] = useState("Home");
    const [allCoaches, setAllCoaches] = useState([]);
    const [leData, setLeData] = useState(true);
    const [leDex, setLeDex] = useState(true);

    // These 2 functions and helper IF are copied over from my coach page. I'm going to keep them in case someone tries to access the site through a coach page, but thsi is very bad.
    const getTypingAPI = async (type) => {
        if (type === null) return;

        let tempType = type.toLowerCase();
        if (window.localStorage.getItem(tempType) === null || window.localStorage.getItem(tempType) === undefined ) {
            console.log("we dont have " + tempType + ". Getting it ...")
            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/type/' + tempType
                );

                const data = await response.json();
                localStorage.setItem(tempType, JSON.stringify(data));
                console.log("now fetching" + data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const callMonsAPI = async () => {
        try {
            const response = await fetch(
                'https://api.fuggo.lol/pokedex'
            );

            const data = await response.json();
            setDex(data);
            setLeDex(false);
        } catch (err) {
            console.log(err);
        }
    };
    const callAPI = async () => {
        try {
            const response = await fetch(
                'https://pokeapi.co/api/v2/move/?offset=0&limit=1000'
            );

            const data = await response.json();
            localStorage.setItem('all pokemom moves :)', JSON.stringify(data));
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    function expandEverything() {
        if (!expanded) {
            setExpanded(true);
            setExpandedIcon("-")
        }
        else {
            setExpanded(false);
            setExpandedIcon("+")
        }
    }

    function callFuggoLolCoachesAPI() {
        const scoreJSON = {
            method: 'GET',
            headers: {
                "access-control-allow-origin": "*",
                'Content-Type': 'application/json'
            },
        }
        fetch(server + "coaches", scoreJSON)
            .then(res => res.json())
            .then(
                (result) => {
                    let tempCoaches = result;
                    setAllCoaches(tempCoaches);
                    setLeData(false);
                }
            )
    }

    if (window.localStorage.length === 0 ) {
        callAPI();
        let allTypes = ['normal', 'fighting', 'dark', 'psychic', 'ghost', 'fire', 'water', 'grass', 'electric', 'bug', 'flying', 'dragon', 'steel', 'fairy', 'rock', 'ground', 'ice', 'poison']
        for (let i = 0; i < allTypes.length; i++) {
            getTypingAPI(allTypes[i]);
        }
        console.log("calling API")
    }
    useEffect(() => {
        if (leData) {
            callFuggoLolCoachesAPI();
            callMonsAPI();
        }

    }, [leData, allCoaches, callMonsAPI])

    return (
        <div className="monPage">
            <div className="monPageHeader">
                <h1> OUBL - Week {week}</h1>

                <p>Welcome to the Official Page of the OUBL!</p>
            </div>

            <div className="monPageCoachHeader">
                    <div className="switch3-container">


                        <div className="switch3">

                            <input type="radio" id="switch3-radio1" name="radio" onClick={() => {
                                if (mainElementShowing !== "Home")
                                    setMainElementShowing("Home");
                            }}/>
                            <label htmlFor="switch3-radio1"

                            >Home</label>

                            <input type="radio" id="switch3-radio2" name="radio" onClick={() => {
                                if (mainElementShowing !== "Rules")
                                    setMainElementShowing("Rules");
                            }}/>
                            <label htmlFor="switch3-radio2">Info</label>

                            <input type="radio" id="switch3-radio3" name="radio" onClick={() => {
                                if (mainElementShowing !== "Pokedex")
                                    setMainElementShowing("Pokedex");
                            }}/>
                            <label htmlFor="switch3-radio3">Pokedex</label>

                            <input type="radio" id="switch3-radio4" name="radio" onClick={() => {
                                if (mainElementShowing !== "Coaches")
                                    setMainElementShowing("Coaches");
                            }}
                            />
                            <label htmlFor="switch3-radio4">Coaches</label>
                            <input type="radio" id="switch3-radio5" name="radio" onClick={() => {
                                if (mainElementShowing !== "Login")
                                    setMainElementShowing("Login");
                            }}
                            />
                            <label htmlFor="switch3-radio5">Login</label>

                        </div>
                    </div>
                <button className="expandButton" onClick={expandEverything}>{expandedIcon}</button>
            </div>

            {!leData && !leDex && mainElementShowing === "Home" ? <PokeHome week={week} coaches={allCoaches} dex={dex} expanded={expanded}/> :
                !leData && !leDex && mainElementShowing === "Pokedex" ? <PokeDex expanded={expanded} pokedex={dex}/> :
                    mainElementShowing === "Rules" ? <PokeRules expanded={expanded} /> :
                        !leData && mainElementShowing === "Coaches" ? <CoachMap coaches={allCoaches} transitionState={true} expanded={expanded}/> :
                        mainElementShowing === "Login" && !leData ? <LoginPageMons /> :
                        <img alt="loading spinner" className="circularLogo" src={"./amoguscircle.png"}/> }
                <div/>

            </div>



    )
}
