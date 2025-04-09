import { MdVerified } from "react-icons/md";

const SVG_Verified:React.FC<React.ComponentPropsWithoutRef<'svg'>> = ({
    className,
    style,
    ...props
})=>{
    return <MdVerified className={`text-2xl flex-shrink-0 items-end ${className}`} style={style} {...props} />
}

export default SVG_Verified;