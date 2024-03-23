import {useEffect, useReducer, useState} from "react";
import Pokemon from "./Pokemon";
import axios from "axios";
import TypeShow2 from "./TypeShow";
import WeaknessChart from "./WeaknessChart";
import TypeShow from "./TypeShow2";
let server = "https://api.fuggo.lol/"
// let server = "http://localhost:4000/";
export default function CoachPage() {
    let pageLoc = window.location.pathname.split('/')[2];

    const currentWeek = 6;
    const [heroActiveName, setHeroActiveName] = useState(false);
    const [villainActiveName, setVillainActiveName] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [allCoaches, setAllCoaches] = useState([]);
    const [leData, setLeData] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [oppPokemons, setOppPokemons] = useState([]);
    const [activeMons, setActiveMons] = useState([]);
    const [oppMoves, setOppMoves] = useState([]);
    const [heroMoves, setHeroMoves] = useState([]);
    const [matchups, setMatchups] = useState([]);
    const [thisCoach, setThisCoach] = useState({
        coachName: "",
        coachNum: 0,
        teamName: "",
        winLoss: 0,
        mons: [],
    })
    const [thatCoach, setThatCoach] = useState({
        coachName: "",
        coachNum: 0,
        teamName: "",
        winLoss: 0,
        mons: [],
    })
    const [moveAPIdata, setMoveAPIdata] = useState([]);
    const getLeagueRank = () => {
        let coaches = allCoaches.sort((a, b) => {
            if (a.winLoss[0] > b.winLoss[0]) return -1;
            else if (a.winLoss[0] < b.winLoss[0]) return 1;
            if (a.winLoss[2] > b.winLoss[2]) return -1;
            else if (a.winLoss[2] < b.winLoss[2]) return 1;
            let diffA = a.winLoss.split('(')[1];
            diffA = diffA.slice(0, diffA.length - 1)
            diffA = diffA.substring(1);
            diffA = Number(diffA)
            let diffB = b.winLoss.split('(')[1];
            diffB = diffB[1].slice(0, diffB.length - 1)
            diffB = Number(diffB)

            if (diffA > diffB) {
                return -1;
            }
            else return 1;
        })
        return coaches.indexOf(thisCoach);
    }
    let badMoves = ['308', '505', '1', '3', '325', '472', '477', '810', '469', '501', '108', '172', '511', '88', '378', '21', '186', '584', '35', '40', '51', '61', '132', '599', '791', '17', '364', '385', '77', '171', '71', '351', '338', '345', '670', '6', '458', '154', '426', '222', '48', '90', '487', '30', '12', '63', '319', '16', '416', '272', '507', '23', '82', '380', '93', '110', '321', '31', '285', '514', '432', '373', '66', '101', '109', '118', '130', '138', '139','212', '513', '466','502', '673', '185', '313', '52', '64', '28', '297', '340', '811','289', '203', '122', '226', '555', '608', '343', '341', '39', '113', '115', '72', '204', '81', '20', '526', '5', '10', '15', '19', '22', '24', '25', '29', '33', '36', '37', '43', '44', '45', '55', '70', '75', '84', '91', '99', '102', '103', '104', '106', '111', '117', '129', '148', '156', '164', '168', '173', '175', '180', '182', '184', '189', '197', '205', '206', '207', '209', '210', '213', '214', '216', '218', '225', '230', '232', '237', '239', '249', '253', '259', '260', '263', '270', '275', '279', '332', '446', '286', '290', '291', '310', '314', '335', '342', '356', '363', '365', '372', '374', '388', '429', '431', '445', '496', '497', '498', '574', '590', '693'];
    // Function to add our give multiple cache data
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
    const callAPImove = async (num) => {
        if (window.localStorage.getItem(num) === null || window.localStorage.getItem(num) === undefined ) {
            // console.log('we dont have this in storage')
            console.log("calling move API")

            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/move/' + num
                );
                const data = await response.json();
                let tempType = "normal";
                let tempAcc = 0;
                let tempPower = 0;
                let tempDesc = "";
                let tempDamageType = "";
                let tempEffect = 0;

                try {
                    tempDamageType = data.damage_class.name;
                    tempType = data.type.name;
                    tempAcc = data.accuracy + "%";
                    tempPower = data.power + "";
                    tempDesc = data.effect_entries[0].short_effect;
                    tempEffect = data.effect_chance;
                }
                catch (e) {
                    console.log(e)
                }
                if (tempAcc === "null%"){
                    tempAcc = "N/A"
                }
                if (tempPower === "null") {
                    tempPower = ""
                }

                tempDesc = tempDesc.replace('$effect_chance%', tempEffect + "%")
                var pushedData = {"type": tempType, "acc": tempAcc, "power": tempPower, "desc": tempDesc, "damageType": tempDamageType, "effectChance": tempEffect}
                pushedData = JSON.stringify(pushedData)
                localStorage.setItem(num, pushedData );

            } catch (err) {
                console.log(err);
            }
        }
        else {
            return localStorage.getItem(num);
        }
    };
    const callAPI = async () => {
            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/move/?offset=0&limit=1000'
                );

                const data = await response.json();
                localStorage.setItem('all pokemom moves :)', JSON.stringify(data));
                setMoveAPIdata(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        // the below function makes API calls if local storage doesn't have all the moves and types saved to it.
        if (window.localStorage.length === 0 ) {
        callAPI();
            let allTypes = ['normal', 'fighting', 'dark', 'psychic', 'ghost', 'fire', 'water', 'grass', 'electric', 'bug', 'flying', 'dragon', 'steel', 'fairy', 'rock', 'ground', 'ice', 'poison']
            for (let i = 0; i < allTypes.length; i++) {
                getTypingAPI(allTypes[i]);
            }
        console.log("calling API")
    }
    useEffect(() => {


        if (window.localStorage !== undefined) {
            const data = window.localStorage.getItem('all pokemom moves :)');
            if (data !== null) {

            } setMoveAPIdata(JSON.parse(data));
        }

        if (leData) {
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
                        setAllCoaches(result);
                        setThisCoach(result[pageLoc])
                        setPokemons(result[pageLoc].mons)
                        setMatchups(result[pageLoc].matchups)
                        setLeData(false);

                    }
                )
        }
        if (!leData) {
            getOpp(matchups[currentWeek - 1].Opponent);

        }

    }, [leData, allCoaches, pageLoc, matchups])


   async function setHeroActive(mon) {
            if (mon === {}) {
                document.getElementById("typeChartHolder").style.display = "flex"; }
        document.getElementById("actives").style.display = "block";

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].active = false;
        }
        mon.active = true;
        setActiveMons(mon);
        getMove(mon);
        forceUpdate();
        getMove(mon);
    }
    async function setVillainActive(mon) {
        document.getElementById("actives").style.display = "block";

        for (let i = 0; i < oppPokemons.length; i++) {
            oppPokemons[i].active = false;
        }
        mon.active = true;
        setActiveMons(mon);
        getMove(mon);
        forceUpdate();
        getMove(mon);


    }
    function sortPoints() {
        let tempMons = pokemons.sort((a, b) => b.pts - a.pts);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.pts - a.pts));
        setOppPokemons(oppPokemons.sort((a, b) => b.pts - a.pts));
        forceUpdate(); // i dont care that it sbad
    }
    function sortSpeed() {
        let tempMons = pokemons.sort((a, b) => b.spe - a.spe);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.spe - a.spe));
        setOppPokemons(oppPokemons.sort((a, b) => b.spe - a.spe));
        forceUpdate(); // i dont care that it sbad
    }
    function sortAttack() {
        let tempMons = pokemons.sort((a, b) => b.atk - a.atk);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.atk - a.atk));
        setOppPokemons(oppPokemons.sort((a, b) => b.atk - a.atk));
        forceUpdate(); // i dont care that it sbad
    }
    function sortDefense() {
        let tempMons = pokemons.sort((a, b) => b.def - a.def);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.def - a.def));
        setOppPokemons(oppPokemons.sort((a, b) => b.def - a.def));
        forceUpdate(); // i dont care that it sbad
    }
    function sortSpecialAttack() {
        let tempMons = pokemons.sort((a, b) => b.spa - a.spa);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.spa - a.spa));
        setOppPokemons(oppPokemons.sort((a, b) => b.spa - a.spa));
        forceUpdate(); // i dont care that it sbad
    }
    function sortSpecialDefense() {
        let tempMons = pokemons.sort((a, b) => b.spd - a.spd);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.spd - a.spd));
        setOppPokemons(oppPokemons.sort((a, b) => b.spd - a.spd));
        forceUpdate(); // i dont care that it sbad
    }
    function sortHP() {
        let tempMons = pokemons.sort((a, b) => b.hp - a.hp);
        setPokemons(tempMons);
        setPokemons(pokemons.sort((a, b) => b.hp - a.hp));
        setOppPokemons(oppPokemons.sort((a, b) => b.hp - a.hp));
        forceUpdate(); // i dont care that it sbad
    }
    const getOpp = (value) => {
        for (let i = 0; i < allCoaches.length; i++) {
            if (allCoaches[i].teamName === value) {
                setOppPokemons(allCoaches[i].mons);
                setThatCoach(allCoaches[i])
                document.getElementById("coachPageVillainHeader").style.display = "block";
                document.getElementById("typeChartOpp").style.display = "block";
                break;
            }
        }
    };
    const getMove = async (pokemon) => {
        let tempname = pokemon.smogonName.toLowerCase();
        if (tempname == "mimikyu") {tempname += "-busted"}
        if (tempname == "zygarde") {tempname += "-50"}
        if (tempname == "tornadus") {tempname += "-incarnate"}
        if (tempname == "lycanroc") {tempname = "lycanroc-midday"}

        tempname = tempname.replace("tapu", "tapu-")
        tempname = tempname.replace("iron", "iron-")
        tempname = tempname.replace("sandy", "sandy-")
        tempname = tempname.replace("slither", "slither-")
        tempname = tempname.replace("raging", "raging-")
        tempname = tempname.replace("chien", "chien-")
        tempname = tempname.replace("tinglu", "ting-lu")
        tempname = tempname.replace("roaringmoon", "roaring-moon")
        tempname = tempname.replace("screamtail", "scream-tail")
        tempname = tempname.replace("gougingfire", "gouging-fire")
        tempname = tempname.replace("mrrime", "mr-rime")

        console.log("getting moves for :" + tempname)
            axios.get('https://pokeapi.co/api/v2/pokemon/' + tempname, {})
                .then(response => {
                    let tempList = [];
                    const resp1 = response.data.moves;
                    for (let i = 0; i < resp1.length; i++) {
                        tempList[i] = resp1[i].move;
                    }
                    
                    for (let i = 0; i < pokemons.length; i++) {
                        if (pokemons[i].name === pokemon.name) {
                            setHeroMoves(tempList);
                            setHeroActiveName(pokemon.name)
                            forceUpdate();
                            return tempList;
                        }
                    }
                    for (let i = 0; i < oppPokemons.length; i++) {
                        if (oppPokemons[i].name === pokemon.name) {
                            setOppMoves(tempList);
                            setVillainActiveName(pokemon.name)
                            forceUpdate();
                            return tempList;
                        }
                    }



                })



    }

    return (

        <div className="coachPage" key={pageLoc}>
            <span  className="coachPageHeroHeader">

            <h1 className="coachPageHeroName">{thisCoach.coachName} ({thisCoach.teamName})             <h6>Score: {thisCoach.winLoss}</h6>
</h1>
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

                                <div className="dropdown" key={0}>
                <button className="dropbtn" key={1}>matchups</button>
                <div className="dropdown-content">MATCHUPS:
                    {matchups.map((matchup, index) => {
                        return <button onClick={(e) => getOpp(e.currentTarget.id)} className="sortButton" id={matchup.Opponent} key={index}>Week {index + 1} : {matchup.Opponent}</button>

                    })}

                </div>
                                    </div>

            </span>
                {/*<div className="coachBlurb">*/}
                {/*    Rank #{getLeagueRank() + 1}*/}
                {/*</div>*/}
                  <div className="heroMonHolder">
            {pokemons.map((mon, le_Key) => {
                if (mon.active === true) {
                    return <span className="monColumnHolderGlowing" key={le_Key} >

               <Pokemon key={mon.name} mon={mon}/>
                   <span className="monButtonHolder"><button className="monButton" onClick={() => {
                       window.open("https://www.smogon.com/dex/sv/pokemon/" + mon.smogonName)}} >Info</button><button className="monButton" onClick={() => setHeroActive(mon)}>Moves</button></span>
</span>
                }
               else return <span className="monColumnHolder">

               <Pokemon key={mon.name} mon={mon}/>
                   <span className="monButtonHolder"><button className="monButton" onClick={() => {
                       window.open("https://www.smogon.com/dex/sv/pokemon/" + mon.smogonName)}}>  Info</button><button className="monButton" onClick={() => setHeroActive(mon)}>Moves</button></span>
</span>
            })}
                </div>


<div>
    <span className="coachPageVillainHeader" id="coachPageVillainHeader"><h1>VS:<a
        href={"https://ben.place/mons/coach/" + thatCoach.coachNum}> {thatCoach.coachName}</a> <a
        href={"https://ben.place/mons/coach/" + thatCoach.coachNum}> ({thatCoach.teamName})</a></h1><h3>Score: {thatCoach.winLoss}</h3></span>
</div>

            <div className="villainMonHolder">
                {oppPokemons.map((mon, le_key) => {
                    if (mon.active === true) {
                        return <span className="monColumnHolderGlowingV" key={le_key}>
               <Pokemon key={mon.name} mon={mon}/>
                   <span><button className="monButton" onClick={() => {
                       window.open("https://www.smogon.com/dex/sv/pokemon/" + mon.smogonName)
                   }}>  Info</button><button className="monButton" onClick={() => setVillainActive(mon)}>moves</button></span>
</span>
                    } else return <span className="monColumnHolder">
               <Pokemon key={mon.name} mon={mon}/>
                   <span className="monButtonHolder"><button className="monButton" onClick={() => {
                       window.open("https://www.smogon.com/dex/sv/pokemon/" + mon.smogonName)}} >info</button><button className="monButton" onClick={() => setVillainActive(mon)}>moves</button></span>
</span>
                })}
            </div>

            <div className="actives" id="actives">

                <div className="moveHolder">

                    <table className="heroMoves">
                        <th>{heroActiveName ? <h2>{heroActiveName}'s Moves</h2> : <h3> </h3>}</th>

                        {heroMoves.map((move, le_key) => {
                            let tempNum = move.url.split('/')[6];

                            if (!badMoves.includes(tempNum)) {
                                let temp = callAPImove(tempNum);
                                let tempData = JSON.parse(window.localStorage.getItem(tempNum));
                                let tempDesc = "";
                                let tempType = null;
                                let tempAcc = 0;
                                let tempPower = 0;
                                let tempDamageType = "none";
                                try {
                                    if (typeof tempData.type === "string") {
                                        tempType = tempData.type;
                                    } else {
                                        tempType = tempData.type.name;
                                    }
                                    tempAcc = tempData.acc;
                                    tempPower = tempData.power;
                                    tempDamageType = tempData.damageType;
                                    tempDesc = tempData.desc;
                                } catch (e) {
                                    console.log(e)
                                }
                                return <span> <ul className="moveList" key={le_key}>  <span
                                    className="nameCol"><a
                                    href={"https://www.smogon.com/dex/sv/moves/" + move.name} target="_blank"
                                    rel="noreferrer">{move.name} </a></span>  <span className="typeCol"><TypeShow2
                                    type={tempType}/></span>  <span className="accCol">{tempAcc}</span> <span
                                    className="bpCol">{tempPower} {tempDamageType}:</span> <span
                                    className="descriptionCol"> {tempDesc}</span></ul> </span>
                            } else return null;
                        })}
                    </table>
                    <table className="oppMoves">
                        <div>{villainActiveName ? <h2>Enemy {villainActiveName}'s Moves</h2> : <h3> </h3>}</div>

                        {oppMoves.map((move, le_key) => {
                            let tempNum = move.url.split('/')[6];
                            if (!badMoves.includes(tempNum)) {
                                let temp = callAPImove(tempNum);
                                let tempData = JSON.parse(window.localStorage.getItem(tempNum));
                                //type: tempType, acc: tempAcc, power: tempPower, desc: tempDesc, damageType: tempDamageType, effectChance: tempEffect
                                let tempDesc = "";
                                let tempType = null;
                                let tempAcc = 0;
                                let tempPower = 0;
                                let tempDamageType = "none";
                                try {
                                    tempType = tempData.type;
                                    tempAcc = tempData.acc;
                                    tempPower = tempData.power;
                                    tempDamageType = tempData.damageType;
                                    tempDesc = tempData.desc;
                                } catch (e) {
                                    console.log(e)
                                }
                                return <span> <li className="moveList" key={le_key}> <a
                                    href={"https://www.smogon.com/dex/sv/moves/" + move.name}> <span
                                    className="nameCol">{move.name} </span> </a> <span className="typeCol"><TypeShow2
                                    type={tempType}/></span>  <span className="accCol">{tempAcc} </span> <span
                                    className="bpCol">{tempPower} {tempDamageType}:</span> <span
                                    className="descriptionCol">{tempDesc}</span> </li> </span>
                            } else return null;
                        })}
                    </table>

                </div>
                <table id="monMatchupTable">
                    <tr>
                        <th>Week</th>
                        <th>Opponent</th>
                        <th>Result</th>
                        <th>Replay</th>

                    </tr>
                    {matchups.map((match, le_key) => {
                        return match.WinLoss === "W" ?
                            <tr className="coachHistoryWin"
                                key={le_key}>
                                <td>{le_key + 1}</td>
                                <td>{match.Opponent}</td>
                                <td>+{match.Differential}</td>
                                <td><a
                                    href={match.Replay}>(Replay 👀)</a></td>

                            </tr>
                            : match.WinLoss === "L" ?
                                <tr className="coachHistoryLoss"
                                    key={le_key}>
                                    <td>{le_key + 1}</td>
                                    <td>{match.Opponent}</td>
                                    <td>{match.Differential}</td>
                                    <td><a
                                        href={match.Replay}>(Replay 👀)</a></td>
                                </tr> :
                                <tr className="coachHistoryNeutral"
                                    key={le_key}>
                                    <td>{le_key + 1}</td>
                                    <td>{match.Opponent}</td>
                                    <td></td>
                                    <td></td>

                                </tr>

                    })}
                </table>
                <div className="typeChartHolder" id="typeChartHolder">
                    <div className="typeChart"><h1 className="typeChartHeader">{thisCoach.coachName}'s Weaknesses</h1>
                        <span className="decorationHolders"><TypeShow type="normal"/>
                            <TypeShow type="fighting"/>
                            <TypeShow type="water"/><TypeShow type="fire"/><TypeShow
                            type="grass"/><TypeShow type="electric"/><TypeShow type="dragon"/><TypeShow
                            type="fairy"/><TypeShow type="steel"/><TypeShow type="rock"/><TypeShow type="ice"/><TypeShow
                            type="ground"/><TypeShow type="bug"/><TypeShow type="poison"/><TypeShow
                            type="psychic"/><TypeShow type="dark"/><TypeShow type="ghost"/><TypeShow
                            type="flying"/></span>
                        {pokemons.map((mon, le_key) => {
                            return <WeaknessChart key={le_key} type1={mon.type1} type2={mon.type2} name={mon.name}/>
                        })}</div>

                    <div className="typeChartOpp" id="typeChartOpp"><h1
                        className="typeChartHeaderOpp">{thatCoach.coachName}'s Weaknesses</h1>
                        <span className="decorationHolders"><TypeShow type="normal"/> <TypeShow
                            type="fighting"/><TypeShow type="water"/><TypeShow type="fire"/><TypeShow
                            type="grass"/><TypeShow type="electric"/><TypeShow type="dragon"/><TypeShow
                            type="fairy"/><TypeShow type="steel"/><TypeShow type="rock"/><TypeShow type="ice"/><TypeShow
                            type="ground"/><TypeShow type="bug"/><TypeShow type="poison"/><TypeShow
                            type="psychic"/><TypeShow type="dark"/><TypeShow type="ghost"/><TypeShow
                            type="flying"/></span>
                        {oppPokemons.map((mon, le_key) => {
                            return <WeaknessChart key={le_key} type1={mon.type1} type2={mon.type2} name={mon.name}/>
                        })}</div>
                </div>
            </div>
        </div>
    )
}