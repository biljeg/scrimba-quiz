import { useState, useEffect } from "react"
import blobBlue from "../../assets/blob-blue2.png"
import blobYellow from "../../assets/blob-yellow2.png"
import Question from "../question/Question.component"
import axios from "axios"
import { nanoid } from "nanoid"
import "./Quiz.styles.scss"
import {decode} from "html-entities"
import Button from "../button/Button.component"

export default function Quiz(props){
    const [questionData, setQuestionData] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const [correctGuesses, setCorrectGuesses] = useState(0)
    useEffect(()=>{
        axios("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res =>{
            res.data.results.map(q =>{
                const question = decode(q.question)
                function formatAnswer(text){
                    return(
                        {
                            text: decode(text),
                            isCorrect: text === q.correct_answer ? true : false,
                            isSelected: false
                        }
                    )
                }
                const correctAnswer = formatAnswer(q.correct_answer)
                const incorrectAnswers = q.incorrect_answers.map(ans => formatAnswer(ans))
                const shuffledAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
                const questionObject = {
                    question,
                    correctAnswer,
                    incorrectAnswers,
                    shuffledAnswers
                }
                function saveInitState(prevData){
                    if(prevData.length){
                        return([...prevData, questionObject])
                    } else{
                        return([questionObject])
                    }
                }
                setQuestionData(prevData => saveInitState(prevData))
            })
        })
        .catch(err =>{
            console.error("Error fetching data", err)
        })
    },[])
    function handleClick(answer){
        setQuestionData(prevData =>(
            prevData.map(prevQue =>{
                const shuffledAnswers = prevQue.shuffledAnswers.map(prevAns => {
                    if(prevAns.text === answer.text){
                        prevQue.shuffledAnswers.forEach(a => a.isSelected = false)
                        return({
                            ...answer,
                            isSelected: !answer.isSelected
                        })
                    } else{
                        return(prevAns)
                    }
                })
                return({
                    ...prevQue,
                    shuffledAnswers
                })
            })  
        ))
    }
    function checkAnswers(){
        setIsGameOver(true)
        questionData.forEach(question =>(
            question.shuffledAnswers.forEach(ans =>{
                if(ans.isSelected && ans.isCorrect){
                    setCorrectGuesses(prevCorrect => prevCorrect + 1)
                }
            })
        ))
    }
    function newGame(){
        setIsGameOver(false)
        setQuestionData([])
        setCorrectGuesses(0)
        props.startNewGame(true)
    }
    return(
        <div className="quiz">
            <img className="overlay--yellow" alt="" src={blobYellow} aria-hidden="true"/>
            <img className="overlay--blue" alt="" src={blobBlue} aria-hidden="true"/>
            {
                questionData.map(qElement =>(
                    <Question 
                    key={nanoid()} 
                    question={qElement.question} 
                    answersArray={qElement.shuffledAnswers} 
                    handleClick={handleClick} 
                    isGameOver={isGameOver} 
                    correctAnswer={qElement.correctAnswer}/>
                ))
            }
            {
                isGameOver &&
                <div className="game-over">
                    <p>You scored {correctGuesses}/5 correct answers</p>
                    <Button fontWeight={"600"} fontSize={"10px"} handleClick={newGame}>Play again</Button>
                </div>
            }
            {!isGameOver &&
            <div className="check-answers">
                <Button fontWeight={"600"} fontSize={"16px"} handleClick={checkAnswers}>Check answers</Button>
            </div>
            }
        </div>
    )
}
