import csvParser from "csv-parser";
import { useEffect } from "react";
import nouns from '../../data/nouns.json';
import { Converter } from "csvtojson/v2/Converter";



const csvFilePath = 'chemin/vers/le/fichier.csv';


const Word = ({noun}: any) => {
    return (
        <>
        <div className="word">
            <div className="native cell-lg">{noun.english}</div>
            <div className="to_learn cell-lg">{noun.french}</div>
            <div className="level cell-sm">{noun.level}</div>
            <div className="frequency cell-sm">{noun.frequency}</div>
            <div className="info cell-md">{noun.type}</div>
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

const AllWords = () => {
    console.log(nouns)
    return (
        <>
        <div className="all-words">
            {nouns.map(noun => <Word key={noun.english} noun={noun} />)}
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
            `}
        </style>
        </>
    )
}

export default AllWords;