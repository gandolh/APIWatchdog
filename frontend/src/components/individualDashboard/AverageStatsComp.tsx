import { StatusCodes } from "./AppDashboard";

const AverageStatsComp = ({data}: {data : StatusCodes}) => {
    return (  
        <>
         <h1> 200 codes:</h1>
                  <p className="text-green-500"> {data.code200}</p>
                  <h1> 400 codes:</h1>
                  <p className="text-red-500">{data.code400} </p>
                  <h1> 500 codes:</h1>
                  <p className="text-red-500"> {data.code500}</p></>

    );
}
 
export default AverageStatsComp;