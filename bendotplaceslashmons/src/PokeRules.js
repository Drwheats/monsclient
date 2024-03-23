import {RiArrowDropDownLine} from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import data from "./data";
export default function PokeRules({expanded}) {
    const AccordionItem = ({ question, answer, isOpen, onClick, index }) => {
        const contentHeight = useRef();
        return(
            <div className={'wrapper' + (index + 1 ) % 2}>
                <button className={`rule-container ${isOpen ? 'active' : ''}`} onClick={onClick} >
                    <pre className='rule-content'>{question}</pre>
                    <RiArrowDropDownLine className={`arrow ${isOpen ? 'active' : ''}`} />
                </button>

                <div ref={contentHeight} className="answer-container" style={
                    isOpen
                        ? { height: contentHeight.current.scrollHeight }
                        : { height: "0px" }
                }>
                    <pre className="answer-content">{answer}</pre>
                </div>
            </div>
        )
    }

    const Accordion = () => {
        const [activeIndex, setActiveIndex] = useState((expanded) => expanded ? [0,1,2,3,4,5,6,7,8,9,10] : []);

        useEffect(() => {
            if (expanded) {
                let tempIndex1 = [0,1,2,3,4,5,6,7,8,9,10];
                console.log("tempIndex is : " + tempIndex1)
                setActiveIndex(tempIndex1)
            }

        })

        const handleItemClick = (index) => {
            let tempIndex = Array.from(activeIndex);
            let location = tempIndex.indexOf(index)
            if (tempIndex.includes(index)) {
                if (tempIndex.length == 1) {
                    tempIndex.pop();
                }
                console.log("we found " + index)
                tempIndex.splice(location, location)

                setActiveIndex(tempIndex);
                console.log(tempIndex)
                return;

            }
            tempIndex.push(index)
            setActiveIndex(tempIndex);
            console.log(activeIndex)
        };

        return (
            <div className='container'>
                {data.map((item, index) => (
                    <AccordionItem
                        key={index}
                        index={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={activeIndex.includes(index)}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        )
    };

    return (
        <Accordion />
        )


}