import React, {useState} from "react";
 
const QuestionBox = ({question, options, slected}) =>{
    const [answer, setAnswer] = useState(options)
    return(
        <div className="questionBox">
            <div className="quesion">{question}</div>
            {answer.map((text, index)=>
                <button 
                    key={index} 
                    className="answerBtn"
                    onClick={()=>{
                        setAnswer([text]);
                        slected(text)
                    }}
                >
                    {text}
                </button>
            )}
        </div>
    );
}

export default QuestionBox;