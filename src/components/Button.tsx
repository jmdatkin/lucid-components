import '@/styles/Button.scss';
import { ReactNode, useRef } from 'react';

type Props = {
    style?: object,
    disabled?: boolean,
    className?: string,
    label?: string,
    onClick?: Function,
    children?: ReactNode,
}

function Button(props: Props) {

    const buttonElRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: any) => {
        e.preventDefault();
        if (props.onClick)
            props.onClick();
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            buttonElRef.current!.click();
        }
    };

    return (
        <button disabled={props.disabled} style={props.style} aria-label={props.label} ref={buttonElRef} className={`fc-button ${props.className ? props.className : ''}`} onClick={handleClick} onKeyDown={handleKeyDown}>
            {props.children ? props.children : props.label}
        </button>
    );
}

Button.defaultProps = {
    disabled: false
};

export default Button;