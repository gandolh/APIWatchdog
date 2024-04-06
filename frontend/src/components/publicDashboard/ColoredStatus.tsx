import { Status } from "../../types/Status";



interface ColoredStatusProps {
 status : Status
}

function getTextColor(status : Status){
    switch (status) {
        case "Healthy":
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
        case "Healthy":
            return " bg-green-500 "
        case "Unstable":
            return " bg-yellow-500 "
        case "Down":
            return " bg-red-500 "
        default:
            break;
    }
}


const ColoredStatus = ({status} : ColoredStatusProps) => {
    
    
    return ( 
        <span className={getTextColor(status)}>{status}</span>
    );
}

export {getTextColor, getBgColor}
export default ColoredStatus;