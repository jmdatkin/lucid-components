import { MouseEventHandler, ReactNode } from "react";
import '../styles/icon-button.scss';


type IconButtonProps = {
    onClick: MouseEventHandler,
    className?: string,
    disabled?: boolean,
    children: ReactNode
}

const IconButton = (props: IconButtonProps) => {

    return (
        <button disabled={props.disabled} onClick={props.onClick} className={`lucid-icon-button ${props.className ? props.className : ''}`}>
            {props.children}
        </button>
    )
}

IconButton.defaultProps = {
    disabled: false
};

export default IconButton;