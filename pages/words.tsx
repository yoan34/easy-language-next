import csvParser from "csv-parser";
import { useEffect, useState } from "react";
import verbs from '../../result.json';
import { Converter } from "csvtojson/v2/Converter";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const csvFilePath = 'chemin/vers/le/fichier.csv';

interface VerbProps {
    english: string;
    french: string;
    level: string;
    frequency: string;
    type: string;
    info: string;
}

const Word = (verb: VerbProps) => {
    return (
        <>
        <div className="word">
            <div className="native cell-lg">{verb.english}</div>
            <div className="to_learn cell-lg">{verb.french}</div>
            <div className="level cell-sm">{verb.level}</div>
            <div className="frequency cell-sm">{verb.frequency}</div>
            <div className="info cell-md">{verb.type}</div>
        </div>
        <style jsx>
            {`
            .word {
                display: flex;
                background-color: white;
                border-radius: 4px;
                width: fit-content;
                margin: 5px 0;
            }
            .cell-lg, .cell-md, .cell-sm {
                height: 30px;
                line-height: 30px;
            }
            .cell-lg {width: 150px;}
            .cell-md {width: 100px;}
            .cell-sm {width: 50px;}
            `}
        </style>
        </>
    )
}
function valuetext(value: number) {
    return `${value}°C`;
  }
const AllWords = () => {
    const LEVEL = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const [value, setValue] = useState<number[]>([1, 10]);
    const [allCheckbox, setAllCheckbox] = useState([true, true, true, true ,true, true])
    

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleAllCheckbox = (event) => {
        console.log(parseInt(event.target.id) === 2)
        const newAllCheckbox = [ ...allCheckbox ]
        newAllCheckbox[parseInt(event.target.id) - 1] = !newAllCheckbox[parseInt(event.target.id) - 1]
        setAllCheckbox(newAllCheckbox)
    }

    let filteredVerbs = verbs.filter((verb) => {
        const index = LEVEL.indexOf(verb.level)
        console.log(index)
        return allCheckbox[index]
    })
    filteredVerbs = filteredVerbs.filter((verb) => {
        return parseInt(verb.frequency) <= value[1] && parseInt(verb.frequency) >= value[0]
    })


    console.log(filteredVerbs)

    return (
        <>
        <div className="all-words">
            <div>
                <div className="container-input">
                    <div>
                        <label>A1</label>
                        <input id="1" type="checkbox" checked={allCheckbox[0]} onChange={handleAllCheckbox} />
                    </div>
                    <div>
                        <label>A2</label>
                        <input id="2" type="checkbox" checked={allCheckbox[1]} onChange={handleAllCheckbox} />
                    </div>
                    <div>
                        <label>B1</label>
                        <input id="3" type="checkbox" checked={allCheckbox[2]} onChange={handleAllCheckbox} />
                    </div>
                    <div>
                        <label>B2</label>
                        <input id="4" type="checkbox" checked={allCheckbox[3]} onChange={handleAllCheckbox} />
                    </div>
                    <div>
                        <label>C1</label>
                        <input id="5" type="checkbox" checked={allCheckbox[4]} onChange={handleAllCheckbox} />
                    </div>
                    <div>
                        <label>C2</label>
                        <input id="6" type="checkbox" checked={allCheckbox[5]} onChange={handleAllCheckbox} />
                    </div>
                </div>
                <Box sx={{ width: 100, pt: 2 }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={1}
                        max={10}
                    />
                </Box>
                <p>Total verbs: {filteredVerbs.length}</p>
            </div>
            {filteredVerbs.map((verb: VerbProps) => <Word key={verb.english} {...verb} />)}
        </div>
        <style jsx>
            {`
            .all-words {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #f9f9f9;
            }
            .container-input {
                display: flex;
            }
            `}
        </style>
        </>
    )
}

export default AllWords;