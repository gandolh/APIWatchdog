import { PieChart, PieChartCell } from "@mantine/charts";
import { useEffect, useState } from "react";
import iEndpoint from "../../types/IEndpoint";
import { MyLog, getStatus } from "./EndpointDashboards";

interface AppPieChartProps {
  endpoints: iEndpoint[];
}

const getStats = (endpoints: iEndpoint[]) => {
  const newLogs = endpoints.map((endpoint) => endpoint.logs ?? []).flat();

  const dataPieChart: PieChartCell[] = [
    { name: "Stable", value:   newLogs.filter((x) => x.response >= 200 && x.response < 399).length, color: "green.6" },
    { name: "Client errors", value:  newLogs.filter((x) => x.response >= 400 && x.response < 500).length, color: "yellow.6" },
    { name: "Server errors", value:  newLogs.filter((x) => x.response >= 500 && x.response < 600).length, color: "red.6" },
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
