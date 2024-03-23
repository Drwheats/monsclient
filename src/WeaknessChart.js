export default function WeaknessChart(type1) {
    let tempType2 = "";
    let tempType = "";
    tempType = type1.type1.toLowerCase();
    try {
        tempType2 = type1.type2.toLowerCase();
    }
    catch (e) {}

    if (tempType === null || tempType === undefined) {
        console.log("type is le null!")
            return;
        }
    if (window.localStorage.getItem(tempType) === null || window.localStorage.getItem(tempType) === undefined) {
        console.log("cant find the data, exiting. This is a critical error and your code is broken.");
        return;
        }

        let tempWeak = {normal: 1, fighting: 1, dark: 1, psychic: 1, ghost: 1, fire: 1, water: 1, grass: 1, electric: 1, bug: 1, flying: 1, dragon: 1, steel: 1, fairy: 1, rock: 1, ground: 1, ice: 1, poison: 1}
        let type1toCheck = JSON.parse(localStorage.getItem(tempType));
        type1toCheck = type1toCheck.damage_relations;
        let dmgDouble = type1toCheck.double_damage_from;
        let dmgHalf = type1toCheck.half_damage_from;
        let dmgNone = type1toCheck.no_damage_from;
        for (let i = 0; i < dmgDouble.length; i++) {
            let tempName = dmgDouble[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = tempValue * 2;
            tempWeak[tempName] = tempValue;
        }
        for (let i = 0; i < dmgHalf.length; i++) {
            let tempName = dmgHalf[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = tempValue * 0.5;
            tempWeak[tempName] = tempValue;
        }
        for (let i = 0; i < dmgNone.length; i++) {
            let tempName = dmgNone[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = 0;
            tempWeak[tempName] = tempValue;
        }
        if (tempType2 === null || tempType2 === "") {
            return (
                <div className="typeChartMonHolder">
                    <span className="typeChartName">{type1.name}</span>
                    <span className={    tempWeak.normal > 1 ? "typeChartCellStrong" : tempWeak.normal < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.normal}</span>
                    <span className={    tempWeak.fighting > 1 ? "typeChartCellStrong" : tempWeak.fighting < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.fighting}</span>
                    <span className={    tempWeak.water > 1 ? "typeChartCellStrong" : tempWeak.water < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.water}</span>
                    <span className={    tempWeak.fire > 1 ? "typeChartCellStrong" : tempWeak.fire < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.fire}</span>
                    <span className={    tempWeak.grass > 1 ? "typeChartCellStrong" : tempWeak.grass < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.grass}</span>
                    <span className={    tempWeak.electric > 1 ? "typeChartCellStrong" : tempWeak.electric < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.electric}</span>
                    <span className={    tempWeak.dragon > 1 ? "typeChartCellStrong" : tempWeak.dragon < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.dragon}</span>
                    <span className={    tempWeak.fairy > 1 ? "typeChartCellStrong" : tempWeak.fairy < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.fairy}</span>
                    <span className={    tempWeak.steel > 1 ? "typeChartCellStrong" : tempWeak.steel < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.steel}</span>
                    <span className={    tempWeak.rock > 1 ? "typeChartCellStrong" : tempWeak.rock < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.rock}</span>
                    <span className={    tempWeak.ice > 1 ? "typeChartCellStrong" : tempWeak.ice < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.ice}</span>
                    <span className={    tempWeak.ground > 1 ? "typeChartCellStrong" : tempWeak.ground < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.ground}</span>
                    <span
                        className={tempWeak.bug > 1 ? "typeChartCellStrong" : tempWeak.bug < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.bug}</span>
                    <span className={    tempWeak.poison > 1 ? "typeChartCellStrong" : tempWeak.poison < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.poison}</span>
                    <span className={    tempWeak.psychic > 1 ? "typeChartCellStrong" : tempWeak.psychic < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.psychic}</span>
                    <span
                        className={tempWeak.dark > 1 ? "typeChartCellStrong" : tempWeak.dark < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.dark}</span>
                    <span className={    tempWeak.ghost > 1 ? "typeChartCellStrong" : tempWeak.ghost < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.ghost}</span>
                    <span className={tempWeak.flying > 1 ? "typeChartCellStrong" : tempWeak.flying < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.flying}</span>
                </div>

            )
        }
    try {
        type1toCheck = JSON.parse(localStorage.getItem(tempType2.toLowerCase()));
    }
        catch (e) {
            console.log("bemis")
        }
    type1toCheck = JSON.parse(localStorage.getItem(tempType2.toLowerCase()));
        type1toCheck = type1toCheck.damage_relations;
        dmgDouble = type1toCheck.double_damage_from;
        dmgHalf = type1toCheck.half_damage_from;
        dmgNone = type1toCheck.no_damage_from;
        for (let i = 0; i < dmgDouble.length; i++) {
            let tempName = dmgDouble[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = tempValue * 2;
            tempWeak[tempName] = tempValue;
        }
        for (let i = 0; i < dmgHalf.length; i++) {
            let tempName = dmgHalf[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = tempValue * 0.5;

            tempWeak[tempName] = tempValue;
        }
        for (let i = 0; i < dmgNone.length; i++) {
            let tempName = dmgNone[i].name;
            let tempValue = tempWeak[tempName];
            tempValue = 0;
            tempWeak[tempName] = tempValue;
        }

    // setMonWeak(tempWeak);

        return (
            <div className="typeChartMonHolder">
                <span className="typeChartName">
                    {type1.name}</span><span className={    tempWeak.normal < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.normal}</span>
                <span className={    tempWeak.fighting > 1 ? "typeChartCellStrong" : tempWeak.fighting < 1 ? "typeChartCellWeak" : "typeChartCell"}>{tempWeak.fighting}</span>
                <span className={    tempWeak.water > 1 ? "typeChartCellStrong" : tempWeak.water < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.water}</span>
                <span className={    tempWeak.fire > 1 ? "typeChartCellStrong" : tempWeak.fire < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.fire}</span>
                <span className={    tempWeak.grass > 1 ? "typeChartCellStrong" : tempWeak.grass < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.grass}</span>
                <span className={    tempWeak.electric > 1 ? "typeChartCellStrong" : tempWeak.electric < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.electric}</span>
                <span className={    tempWeak.dragon > 1 ? "typeChartCellStrong" : tempWeak.dragon < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.dragon}</span>
                <span className={    tempWeak.fairy > 1 ? "typeChartCellStrong" : tempWeak.fairy < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.fairy}</span>
                <span className={    tempWeak.steel > 1 ? "typeChartCellStrong" : tempWeak.steel < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.steel}</span>
                <span className={    tempWeak.rock > 1 ? "typeChartCellStrong" : tempWeak.rock < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.rock}</span>
                <span className={    tempWeak.ice > 1 ? "typeChartCellStrong" : tempWeak.ice < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.ice}</span>
                <span className={    tempWeak.ground > 1 ? "typeChartCellStrong" : tempWeak.ground < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.ground}</span>
                <span className={    tempWeak.bug > 1 ? "typeChartCellStrong" : tempWeak.bug < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.bug}</span>
                <span className={    tempWeak.poison > 1 ? "typeChartCellStrong" : tempWeak.poison < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.poison}</span>
                <span className={    tempWeak.psychic > 1 ? "typeChartCellStrong" : tempWeak.psychic < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.psychic}</span>
                <span className={    tempWeak.dark > 1 ? "typeChartCellStrong" : tempWeak.dark < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.dark}</span>
                <span className={    tempWeak.ghost > 1 ? "typeChartCellStrong" : tempWeak.ghost < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.ghost}</span>
                <span className={    tempWeak.flying > 1 ? "typeChartCellStrong" : tempWeak.flying < 1 ? "typeChartCellWeak" : "typeChartCell"
                }>{tempWeak.flying}</span>
            </div>
        )








}