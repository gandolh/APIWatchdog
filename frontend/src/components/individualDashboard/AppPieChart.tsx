import { PieChart, PieChartCell } from "@mantine/charts";
import { useEffect, useState } from "react";
import iEndpoint from "../../types/IEndpoint";
import { MyLog, getStatus } from "./EndpointDashboards";

interface AppPieChartProps {
  endpoints: iEndpoint[];
}

const getStats = (endpoints: iEndpoint[]) => {
  const logs: MyLog[] = endpoints
    .map((endpoint) => {
      if (endpoint.logs === undefined) return [];
      return endpoint.logs.map((el) => {
        return {
          time: el.time,
          status: getStatus(el.response),
        } as MyLog;
      });
    })
    .flat();

  const stableEndpoints = logs.filter((x) => x.status === "Stable").length;
  const unstableEndpoints = logs.filter((x) => x.status === "Unstable").length;
  const downEndpoints = logs.filter((x) => x.status === "Down").length;

  const dataPieChart: PieChartCell[] = [
    { name: "Stable", value: stableEndpoints, color: "green.6" },
    { name: "Unstable", value: unstableEndpoints, color: "yellow.6" },
    { name: "Down", value: downEndpoints, color: "red.6" },
  ];

  return dataPieChart;
};

const AppPieChart = ({ endpoints }: AppPieChartProps) => {
  const [dataPieChart, setDataPieChart] = useState<PieChartCell[]>([]);

  useEffect(() => {
    setDataPieChart(getStats(endpoints));
  }, [endpoints]);

  return (
    <>
      <PieChart
        withLabelsLine
        withTooltip
        labelsPosition="inside"
        labelsType="percent"
        withLabels
        data={dataPieChart}
      />
    </>
  );
};

export default AppPieChart;
