import { ReactNode } from "react"

const Blueprint = (props: {children: ReactNode}) => {
    return (
        <div className="relative">
            <div className="absolute h-[200vh] -top-[100vh] w-[1px] border-l left-0"></div>
            <div className="absolute h-[200vh] -top-[100vh] w-[1px] border-l right-0"></div>
            <div className="absolute w-[200vw] -left-[100vh] top-0 h-[1px] border-t"></div>
            <div className="absolute w-[200vw] -left-[100vh] bottom-0 h-[1px] border-t"></div>
            {props.children}
        </div>
    )
};

export default Blueprint;