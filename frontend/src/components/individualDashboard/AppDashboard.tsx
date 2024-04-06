import { useParams } from "react-router-dom";
import { Log, PublicCardData } from "../publicDashboard/PubDashCard";
import { SimpleGrid } from "@mantine/core";
import AppPieChart from "./AppPieChart";
import EndpointsDashboard from "./EndpointDashboards";
import { Status } from "../../types/Status";

const AppDashboard = () => {
  const statuses: Status[] = ["Stable", "Unstable", "Down"];
  const logs: Log[] = Array.from({ length: 10 }, (_, i) => ({
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timeStamp: new Date(Date.now() - i * 5000),
  }));

  const data: PublicCardData = {
    _id: "1",
    AppName: "App1",
    AppStatus: "Stable",
    EndpointData: [
      {
        EndpointName: "Endpoint1",
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
      {
        EndpointName: "Endpoint2",
        EndpointStatus: "Unstable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
      {
        EndpointName: "Endpoint3",
        EndpointStatus: "Unstable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
    ],
  };

  const { appId } = useParams();
  return (
    <>
      <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg" p={128}>
        <div className="flex justify-center items-center">
          <EndpointsDashboard endpoints={data.EndpointData} />
        </div>
        <div className="flex justify-center items-center">
          <AppPieChart endpoints={data.EndpointData}/>
        </div>
      </SimpleGrid>
    </>
  );
};

export default AppDashboard;
