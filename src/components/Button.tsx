import '@/styles/Button.scss';
import { useRef } from 'react';

type Props = {
    style?: object,
    className?: string,
    label: string,
    onClick?: Function
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
        <button style={props.style} aria-label={props.label} ref={buttonElRef} className={`fc-button ${props.className}`} onClick={handleClick} onKeyDown={handleKeyDown}>
            {props.label}
        </button>
    );
}

export default Button;