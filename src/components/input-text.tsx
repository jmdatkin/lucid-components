// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";
import '@/styles/InputText.scss';

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>,
    glyph?: JSX.Element,
    className?: string,
    password?: boolean,
    label?: string,
    name?: string,
    placeholder?: string
};

function InputText(props: Props) {

    const { className, onChange, password, label, name, placeholder, ...restProps } = props;

    return (
        <div className="lucid-inputtext-wrapper" style={{ display: "flex", alignItems: "center" }}>
            {props.glyph &&
                <span style={{ fontSize: '1.5rem' }}>{props.glyph}</span>}
            <input className={`lucid-inputtext ${className}`} type={password ? 'password' : 'text'}
                placeholder={placeholder}
                aria-label={label}
                name={name}
                onChange={onChange}
                {...restProps}
            ></input>
        </div >
    );
}

InputText.defaultProps = {
    password: false
};

export default InputText;