import { StatusCodes } from "./AppDashboard";

const AverageStatsComp = ({ data }: { data: StatusCodes }) => {
  return (
    <>
      <div>
        <h1> 100 codes:</h1>
        <p className="text-green-500"> {data.code100}</p>
      </div>
      <div>
        <h1> 200 codes:</h1>
        <p className="text-green-500"> {data.code200}</p>
      </div>
      <div>
        <h1> 300 codes:</h1>
        <p className="text-green-500"> {data.code300}</p>
      </div>
      <div>
        <h1> 400 codes:</h1>
        <p className="text-red-500">{data.code400} </p>
      </div>
      <div>
        <h1> 500 codes:</h1>
        <p className="text-red-500"> {data.code500}</p>
      </div>
    </>
  );
};

export default AverageStatsComp;
