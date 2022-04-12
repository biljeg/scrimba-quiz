import "./Button.styles.scss"

export default function Button(props){
    const styles = {
        fontWeight: `${props.fontWeight}`,
        fontSize: `${props.fontSize}`
    }
    return(
        <button className="btn" style={styles} onClick={props.handleClick}>{props.children}</button>
    )
}