// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";
import '@/styles/InputText.scss';

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>,
    className?: string,
    password?: boolean,
    label?: string,
    name?: string,
    placeholder?: string
};

function InputText(props: Props) {

    const {className, onChange, password, label, name, placeholder, ...restProps} = props;

    return (
        <input className={`fc-inputtext ${className}`} type={password ? 'password' : 'text'}
            placeholder={placeholder}
            aria-label={label}
            name={name}
            onChange={onChange}
            {...restProps} 
            ></input>
    );
}

InputText.defaultProps = {
    password: false
};

export default InputText;