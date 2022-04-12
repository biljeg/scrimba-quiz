import blobBlue from "../../assets/blob-blue.png"
import blobYellow from "../../assets/blob-yellow.png"
import "./Overlay.styles.scss"
import Button from "../button/Button.component"

export default function Overlay({handleClick}){
    return(
        <div className="overlay">
            <img className="overlay--yellow" alt="" src={blobYellow} aria-hidden="true"/>
            <img className="overlay--blue" alt="" src={blobBlue} aria-hidden="true"/>
            <h1 className="overlay--heading">Quizzical</h1>
            <p className="overlay--description">A general trivia quiz</p>
            <Button fontSize="16px" fontWeight={"400"} handleClick={handleClick}>Start quiz</Button>
        </div>
    )
}