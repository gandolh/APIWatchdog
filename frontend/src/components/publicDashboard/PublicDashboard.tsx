import { Container } from "@mantine/core";
import PubDashboardComp from "./PubDashboardComp";
import { Status } from "../../types/Status.ts";
import { Log, PublicCardData } from "./PubDashCard.tsx";


const statuses: Status[] = ["Stable", "Unstable", "Down"];
const logs: Log[] = Array.from({ length: 10 }, (_, i) => ({
  status: statuses[Math.floor(Math.random() * statuses.length)],
  timeStamp: new Date(Date.now() - i * 5000),
}));

const data: PublicCardData[] = [
  {
    _id: '1',
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
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
    ],
  },
  {
    _id: '2',
    AppName: "App2",
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
        EndpointStatus: "Stable",
        EndpointURL: "http://localhost:8080",
        Logs: logs,
      },
    ],
  },
];


const PublicDashboard = () => {
  return (
    <Container
      fluid
      pt={0}
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100dvh - 60px - var(--app-shell-padding))" }}
    >
 
      <div className="w-full mx-auto h-[80dvh]">
        <PubDashboardComp data={data} />
      </div>
    </Container>
  );
};

export default PublicDashboard;
