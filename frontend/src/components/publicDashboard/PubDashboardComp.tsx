import { Link } from "react-router-dom";
import PubDashCard from "./PubDashCard.tsx";
import { PublicCardData } from "./PubDashCard.tsx";

interface PubDashboardComp{
  data : PublicCardData[]
}

const PubDashboardComp = ({data} : PubDashboardComp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
      {data.map((app) => {
        return (
          <Link to={`pubdash/${app._id}`}>
            <PubDashCard app={app} />
          </Link>
        );
      })}
    </div>
  );
};

export default PubDashboardComp;
