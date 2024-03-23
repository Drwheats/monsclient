import Coach from "./Coach";
import Pokemon from "./Pokemon";
import {useState} from "react";

export default function PokeHome({coaches, expanded, dex, week}) {
    week -=1;



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
    coaches = coaches.sort((a, b) => {
        if (a.winLoss[0] > b.winLoss[0]) return -1;
        else if (a.winLoss[0] < b.winLoss[0]) return 1;
        if (a.winLoss[2] < b.winLoss[2]) return -1;
        else if (a.winLoss[2] > b.winLoss[2]) return 1;
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
    dex = dex.sort((a,b) => {
        if (Number(a.kills) > Number(b.kills)) {return -1;}
        else if (Number(a.kills) < Number(b.kills)) {return 1;}
        if (Number(a.gamesWon) > Number(b.gamesWon)) {return -1;}
        else if (Number(a.gamesWon) < Number(b.gamesWon)) {return 1;}
        if (Number(a.deaths) > Number(b.deaths)) {return -1;}
        else if (Number(a.deaths) < Number(b.deaths)) {return 1;}

    })

    let noRepeats = [];


    return (
        <div className="monHomePage">
            <h1 className="monPageHeader">Coach Leaderboard:</h1>
            <div className={expanded ? "realCoachHolderBig" : "realCoachHolder"} id="none">
                {
                    coaches.slice(0,4).map(s => {
                        return <Coach key={s.coachNum} coachNum={s.coachNum} coachName={s.coachName} winLoss={s.winLoss}
                                      teamName={s.teamName} expanded={expanded} mons={s.mons}
                                      leagueRank={coaches.indexOf(s)}
                        />
                    })
                }
            </div>
            <h1 className="monPageHeader">Mons Leaderboard:</h1>
            <div>
            {

                dex.slice(0,15).map(s => {
                     return s.owner !== "" ? <Pokemon key={s.smogonName} owned={s.owner !== ""} mon={s}/> :
                    <p></p>

                })
            }
            </div>
            <h1 className="monPageHeader"> Week {week + 1} Matchups :</h1>
            <div>
                <table id="monMatchupTable">
                    <tr>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Replay</th>

                    </tr>

                    {
                        coaches.map(s => {
                            noRepeats.push(s.matchups[week  ].Opponent)
                            return !noRepeats.includes(s.teamName) ? <tr className={johto.includes(s.teamName) ? "kantoHeader" : "johtoHeader"}>
                                    <td><a href={"/mons/coach/" + s.coachNum}>{s["teamName"]}</a>
                                    </td>
                                    <td>{s.matchups[week].Opponent}</td>
                                    <td><a href={s.matchups[week].Replay}> {s.matchups[week].Replay}</a></td>
                                </tr>
                                : <div></div>

                        })

                    }
                </table>
            </div>
        </div>
    )
}