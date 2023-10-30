import { Severity } from "../types/severity";
import '../styles/badge.scss';

type BadgeProps = {
    severity: Severity
    label: string
}

const Badge = (props: BadgeProps) => {

    return (
        <span className={`lucid-badge lucid-badge-${props.severity}`}>
            {props.label}
        </span>
    );
}

Badge.defaultProps = {
    severity: Severity.PRIMARY
};

export default Badge;