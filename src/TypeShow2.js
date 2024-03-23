export default function TypeShow(type) {
        let nameClass = "smallColours"
        let tempType = type.type;
        let returnedType = type.type;
        if (tempType === null || tempType === undefined) {
            return;
        }
        try {
            tempType = tempType.toLowerCase();
        }

        catch (e) {
            console.log(e)
        }
    returnedType = returnedType.toUpperCase();
    returnedType = returnedType.slice(0, 3)
    // if (isDecoration) {returnedType = returnedType[0].toUpperCase()}

        if (tempType === "steel") {
            return <span className={nameClass} style={{background: "#B7B7CE"}}> {returnedType} </span>
        }

    if (tempType === "rock") {
        return <span className={nameClass} style={{background: "#B6A136"}}> {returnedType} </span>
    }

    else if (tempType === "water") {
            return <span className={nameClass} style={{background: "#6390F0"}}> {returnedType} </span>
        }
        else if (tempType === "electric") {
            return <span className={nameClass} style={{background: "#F7D02C"}}> {returnedType} </span>
        }
        else if (tempType === "poison") {
            return <span className={nameClass} style={{background: "#A33EA1"}}> {returnedType} </span>
        }
        else if (tempType === "fighting") {
            return <span className={nameClass} style={{background: "#C22E28"}}> {returnedType} </span>
        }
        else if (tempType === "ghost") {
            return <span className={nameClass} style={{background: "#735797"}}> {returnedType} </span>
        }
        else if (tempType === "psychic") {
            return <span className={nameClass} style={{background: "#F95587"}}> {returnedType} </span>
        }
        else if (tempType === "flying") {
            return <span className={nameClass} style={{background: "#A98FF3"}}> {returnedType} </span>
        }
        else if (tempType === "normal") {
            return <span className={nameClass} style={{background: "#A8A77A"}}> {returnedType} </span>
        }
        else if (tempType === "fire") {
            return <span className={nameClass} style={{background: "#EE8130"}}> {returnedType} </span>
        }
        else if (tempType === "grass") {
            return <span className={nameClass} style={{background: "#7AC74C"}}> {returnedType} </span>
        }
        else if (tempType === "dragon") {
            return <span className={nameClass} style={{background: "#6F35FC"}}> {returnedType} </span>
        }
        else if (tempType === "fairy") {
            return <span className={nameClass} style={{background: "#D685AD"}}> {returnedType} </span>
        }
        else if (tempType === "dark") {
            return <span className={nameClass} style={{background: "#705746"}}> {returnedType} </span>
        }
        else if (tempType === "ground") {
            return <span className={nameClass} style={{background: "#E2BF65"}}> {returnedType} </span>
        }
        else if (tempType === "bug") {
            return <span className={nameClass} style={{background: "#A6B91A"}}> {returnedType} </span>
        }
        else if (tempType === "ice") {
            return <span className={nameClass} style={{background: "#96D9D6"}}> {returnedType} </span>
        }






}