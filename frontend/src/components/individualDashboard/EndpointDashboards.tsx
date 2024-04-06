import { Card, Group, Stack } from "@mantine/core";
import ColoredStatus, { getBgColor } from "../publicDashboard/ColoredStatus";
import { Status } from "../../types/Status";
import iEndpoint from "../../types/IEndpoint";
import { useEffect, useState } from "react";
import iLog from "../../types/ILog";
import AddEndpointCard from "./AddEndpointCard";

interface EndpointDashboardsProps {
  endpoints: iEndpoint[];
  OnRefetchData : () => void;
  appId : string;
}

interface EndpointCardProps {
  name: String;
  status: Status;
  logs?: iLog[];
}

export interface MyLog {
  time: Date;
  status: Status;
}

export function getStatus(statusCode: Number): Status {
  if (statusCode === 200 || statusCode === 201 || statusCode === 302)
    return "Stable";
  else return "Unstable";
}

const EndpointCard = ({ name, status, logs }: EndpointCardProps) => {
  // ultimele 10 logs
  // 200, 201, 302 - verde
  // daca sunt toate 10 down -> down
  // altfel unstable

  const [last10Logs, setLast10Logs] = useState<MyLog[]>([]);

  useEffect(() => {
    // console.log(logs);
    if (logs === undefined) return;
    const newLogs = [...logs];
    for (let i = 0; i < newLogs.length; i++)
      newLogs[i].time = new Date(newLogs[i].time);

    newLogs.sort(function (a, b) {
      return b.time.getTime() - a.time.getTime();
    });
    newLogs.slice(0, 10);

    const myLogs: MyLog[] = newLogs.map((el) => {
      return { time: el.time, status: getStatus(el.response) };
    });

    const allDown = myLogs.every((el) => el.status === "Unstable");
    if (allDown) myLogs.forEach((el) => (el.status = "Down"));

    setLast10Logs(myLogs);
  }, [logs]);

  // console.log(last10Logs);
  return (
    <Card>
      <div>
        {name}&nbsp;&nbsp;
        <ColoredStatus status={status} />
      </div>
      <div>
        <Group gap={0} grow h={30}>
          {last10Logs.map((log) => (
            <div className="h-full flex flex-col justify-center items-center">
              <div>
                {" "}
                {log.time.getHours()}:{log.time.getMinutes() < 10 && "0"}
                {log.time.getMinutes()}
              </div>
              <div
                className={"rounded-full w-6 h-6" + getBgColor(log.status)}
              ></div>
            </div>
          ))}
        </Group>
      </div>
    </Card>
  );
};

const EndpointsDashboard = ({ endpoints, appId,  OnRefetchData }: EndpointDashboardsProps) => {

  return (
    <>
      <Stack gap={10} className="w-full h-full">
      <AddEndpointCard OnRefetchData={OnRefetchData} appId={appId}/>
        {endpoints.map((endpoint) => (
            <EndpointCard
              name={endpoint.name}
              status={endpoint.status}
              logs={endpoint.logs}
            />
        ))}
      </Stack>
    </>
  );
};

export default EndpointsDashboard;
