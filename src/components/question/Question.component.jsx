import "./Question.styles.scss"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

export default function Question({
	question,
	answersArray,
	handleClick,
	isGameOver,
	correctAnswer,
}) {
	return (
		<div className="question-wrapper">
			<h3 className="question">{question}</h3>
			<div className="answer-wrapper">
				{answersArray.map((answer, idx) => {
					if (isGameOver) {
						return (
							<div
								key={nanoid()}
								className={`answer answer-end ${idx === 0 && "first-answer"} ${
									correctAnswer.text === answer.text
										? "answer-green"
										: answer.isSelected && "answer-red"
								}`}
							>
								{answer.text}
							</div>
						)
					} else {
						return (
							<div
								onClick={() => handleClick(answer)}
								key={nanoid()}
								className={`answer ${answer.isSelected && "selected"} ${
									idx === 0 && "first-answer"
								}`}
							>
								{answer.text}
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}
