import { Container } from "@mantine/core";
import { Status } from "../../types/Status.ts";
import { Log, PublicCardData } from "../publicDashboard/PubDashCard";
import PubDashboardComp from "../publicDashboard/PubDashboardComp";


const statuses: Status[] = ["Stable", "Unstable", "Down"];
const logs: Log[] = Array.from({ length: 10 }, (_, i) => ({
  status: statuses[Math.floor(Math.random() * statuses.length)],
  timeStamp: new Date(Date.now() - i * 5000),
}));

const data: PublicCardData[] = [
  {
    _id: '1',
    AppName: "App_dev1",
    AppStatus: "Down",
    EndpointData: [
      {
        EndpointName: "Endpoint1",
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
      {
        EndpointName: "Endpoint2",
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
    ],
  },
  {
    _id: '2',
    AppName: "Appdev_2",
    AppStatus: "Unstable",
    EndpointData: [
      {
        EndpointName: "Endpoint1",
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
      {
        EndpointName: "Endpoint2",
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
    ],
  },
];


const DevDashboard = () => {
  return (
    <Container
      fluid
      pt={30}
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100dvh - 60px - var(--app-shell-padding))" }}
    >
      <div className="w-full mx-auto h-[80dvh]">
        <PubDashboardComp data={data} />
      </div>
    </Container>
  );
};

export default DevDashboard;
