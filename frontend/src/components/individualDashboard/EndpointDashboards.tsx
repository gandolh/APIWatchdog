import { Card, Group, Stack } from "@mantine/core";
import { EndpointData, Log } from "../publicDashboard/PubDashCard";
import ColoredStatus, { getBgColor } from "../publicDashboard/ColoredStatus";
import { Status } from "../../types/Status";

interface EndpointDashboardsProps {
  endpoints: EndpointData[];
}

interface EndpointCardProps {
  name: string;
  status: Status;
  logs: Log[];
}

const EndpointCard = ({ name, status, logs }: EndpointCardProps) => {
  return (
    <Card>
      <div>
        {name}&nbsp;&nbsp;
        <ColoredStatus status={status} />
      </div>
      <div>
        <Group gap={0} grow h={30}>
          {logs.map((log) => (
            <div className="h-full flex flex-col justify-center items-center">
              <div> {log.timeStamp.getHours()}:{log.timeStamp.getMinutes() < 10 && "0"}{log.timeStamp.getMinutes()}</div>
              <div className={"rounded-full w-6 h-6" + getBgColor(log.status)}></div>
            </div>
          ))}
        </Group>
      </div>
    </Card>
  );
};

const EndpointsDashboard = ({ endpoints }: EndpointDashboardsProps) => {


  return (
    <>
      <Stack gap={10} className="w-full h-full">
        {endpoints.map((endpoint) => (
          <Stack>
            <EndpointCard
              name={endpoint.EndpointName}
              status={endpoint.EndpointStatus}
              logs={endpoint.Logs}
            />
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default EndpointsDashboard;
