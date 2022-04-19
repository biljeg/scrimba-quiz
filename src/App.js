import "./App.css"
import { useState } from "react"
import Overlay from "./components/overlay/Overlay.component"
import Quiz from "./components/quiz/Quiz.component"

function App() {
	const [overlay, setOverlay] = useState(true)
	function startGame() {
		setOverlay(false)
	}
	return overlay ? (
		<Overlay handleClick={startGame} />
	) : (
		<Quiz startNewGame={setOverlay} />
	)
}

export default App
