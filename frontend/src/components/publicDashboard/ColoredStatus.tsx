import { Status } from "../../types/Status";



interface ColoredStatusProps {
 status : Status
}

function getColor(status : Status){
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

const ColoredStatus = ({status} : ColoredStatusProps) => {


    return ( 
        <span className={getColor(status)}>{status}</span>
     );
}
 
export default ColoredStatus;