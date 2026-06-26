import { Card, Group, Tooltip } from "@mantine/core";
import ColoredStatus, { getBgColor } from "../publicDashboard/ColoredStatus";
import { Status } from "../../types/Status";
import iEndpoint from "../../types/IEndpoint";
import { useEffect, useState } from "react";
import iLog from "../../types/ILog";
import AddEndpointCard from "./AddEndpointCard";


interface EndpointDashboardsProps {
  endpoints: iEndpoint[];
  OnRefetchData: () => void;
  appId: string;
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
  const [last10Logs, setLast10Logs] = useState<MyLog[]>([]);

  // const getSLotsCount = () => {
  //  return (curentUser?.period ?? 24)* 3600 / (curentUser?.frequency ?? 60);
  // }

  useEffect(() => {
    // console.log(logs);
    if (logs === undefined) return;
    const newLogs = [...logs];
    for (let i = 0; i < newLogs.length; i++)
      newLogs[i].time = new Date(newLogs[i].time);

    newLogs.sort(function (a, b) {
      return a.time.getTime() - b.time.getTime();
    });

    const myLogs: MyLog[] = newLogs.map((el) => {
      return { time: el.time, status: getStatus(el.response) };
    });

    let zeroCount = 0;
    for (let i = 0; i < myLogs.length; i++) {
      if (myLogs[i].status === "Unstable") {
        zeroCount++;
        if (zeroCount === 10) {
          for (let j = i - 10; j <= i; j++) myLogs[i].status = "Down";
        } else if (zeroCount >= 10) {
          myLogs[i].status = "Down";
        }
      } else zeroCount = 0;
    }


    // const startDate = new Date();
    // startDate.setHours(startDate.getHours() - (curentUser?.period ?? 24));
    // const endDate = new Date();
    // const newFragmentedDates =  getEvenlySpacedDates(startDate, endDate,6)
    // setFragmentDates(newFragmentedDates);
    // const slotsCount = getSLotsCount();
    // const temp = [
    //   ...new Array(slotsCount - myLogs.length) as MyLog[],
    //   ...myLogs,
    //   ];
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
        <div className="flex justify-between">
          {/* {fragmentDates.map(date =>(
            <div> <DateComponent date={date}/></div>
          ))} */}
        </div>
        <Group gap={0} grow h={30}>
          {last10Logs.map((log) => (
            <div className="h-full w-full flex flex-col justify-center items-center">
              <Tooltip label={log.time.toLocaleString("ro-RO")}>
              <div
                className={"rounded-full w-full h-2" + getBgColor(log?.status)}
                ></div>
                </Tooltip>
            </div>
          ))}
        </Group>
      </div>
    </Card>
  );
};

export function extractLastPathFragment(path: String): String {
  if (path === undefined) return "";
  const parts = path.split("/");
  if (path[path.length - 1] == "/") return parts[parts.length - 2];
  return parts[parts.length - 1];
}

const EndpointsDashboard = ({
  endpoints,
  appId,
  OnRefetchData,
}: EndpointDashboardsProps) => {
  return (
    <>
      <AddEndpointCard OnRefetchData={OnRefetchData} appId={appId} />
      {endpoints.map((endpoint) => (
        <EndpointCard
          name={extractLastPathFragment(endpoint.name)}
          status={endpoint.status}
          logs={endpoint.logs}
        />
      ))}
    </>
  );
};

export default EndpointsDashboard;
