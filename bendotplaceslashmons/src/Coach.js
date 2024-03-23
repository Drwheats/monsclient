import Pokemon from "./Pokemon";
export default function Coach({coachName, coachNum, teamName, winLoss, mons, leagueRank, expanded}) {

    let tempMons = mons.sort((a, b) => b.pts - a.pts);
    tempMons = tempMons.slice(0, 3);

    let kanto = ['Happy Farm Pokemon',
        'Wannabe Canadians',
        'Motown Crankers',
        'Abomasnow Avalanche',
        'Ottawa Battle Stantlers',
        'Halifax Hurricanes',
        'St. Lawrence Salamences',
        'Cleveland Escavaliers']
    let johto = [
'        Charlotte Beedrills',
        'Karma Charmeleon',
        'Georgia Gatrs',
        'Windsor Wartortles',
        'Seattle Krabby',
        'Toking Hard Charizard',
        'North Bay Golbattalion',
        'Sabeleye Gems'
    ]
    return (

        <div className={kanto.includes(teamName) ? "coachCardBlue" : "coachCardGreen"} key={coachNum}>

            <h1><a className="coachCardHeader" href={"/coach/" + coachNum}>
                {teamName}</a></h1>
            <h5 className="coachCardHeader">{winLoss[0]} Wins | {winLoss[2]} Losses (Differential
                of {winLoss.split("(")[1]}</h5>
            <div className="coachCardMonList">
                {expanded ? mons.map((mon) => {
                    return <Pokemon mon={mon}/>
                }) : tempMons.map((mon) => {
                    return <Pokemon mon={mon}/>
                })
                }

            </div>
            <span
                className="badge">#{leagueRank +1}</span>
        </div>
    )
}