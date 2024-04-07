import { Status } from "../../types/Status";



interface ColoredStatusProps {
 status : Status
 myClasses? : string
}

function getTextColor(status : Status){
    switch (status) {
        case "Stable":
            return " text-green-500 "
        case "Unstable":
            return " text-yellow-500 "
        case "Down":
            return " text-red-500 "
        default:
            break;
    }
}

function getBgColor(status : Status){
    switch (status) {
        case "Stable":
            return " bg-green-500 "
        case "Unstable":
            return " bg-yellow-500 "
        case "Down":
            return " bg-red-500 "
        default:
            break;
    }
}


const ColoredStatus = ({status, myClasses} : ColoredStatusProps) => {
    
    
    return ( 
        <span className={`${getTextColor(status)} ${myClasses}`}>{status}</span>
    );
}

export {getTextColor, getBgColor}
export default ColoredStatus;