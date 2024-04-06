import { useParams } from "react-router-dom";
import { PublicCardData } from "../publicDashboard/PubDashCard";
import { SimpleGrid } from "@mantine/core";
import AppPieChart from "./AppPieChart";
import EndpointsDashboard from "./EndpointDashboards";



const AppDashboard = () => {
  const data: PublicCardData = {
    AppName: "App1",
    AppStatus: "Healthy",
    EndpointData: [
      {
        EndpointName: "Endpoint1",
        EndpointStatus: "Healthy",
        EndpointURL: "http://localhost:8080",
      },
      {
        EndpointName: "Endpoint2",
        EndpointStatus: "Healthy",
        EndpointURL: "http://localhost:8080",
      },
    ],
  };

  const { appId } = useParams();
  return (
    <>
      <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg" p={128}>
        <div className="flex justify-center items-center">
        <EndpointsDashboard endpoints={data.EndpointData}/>
        </div>
        <div className="flex justify-center items-center">
        <AppPieChart/>
        </div>
      </SimpleGrid>
    </>
  );
};

export default AppDashboard;
