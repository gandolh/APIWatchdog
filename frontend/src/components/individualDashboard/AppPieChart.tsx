import { PieChart, PieChartCell } from "@mantine/charts";
import { EndpointData } from "../publicDashboard/PubDashCard";
import { useEffect, useState } from "react";


interface AppPieChartProps {
  endpoints : EndpointData[]
}

const test = (endpoints: EndpointData[]) => {
  let stableEndpoints = 0;
  let unstableEndpoints = 0;
  let downEndpoints = 0;

  endpoints.map((endpoint) => {
    if (endpoint.EndpointStatus === "Stable") {
      stableEndpoints++;
    } else if (endpoint.EndpointStatus === "Unstable") {
      unstableEndpoints++;
    } else {
      downEndpoints++;
    }
  });

  const dataPieChart: PieChartCell[] = [
    { name: "Stable", value: stableEndpoints, color: "green.6" },
    { name: "Unstable", value: unstableEndpoints, color: "yellow.6" },
    { name: "Down", value: downEndpoints, color: "red.6" },
  ];

  return dataPieChart;
}

const AppPieChart = ({endpoints} : AppPieChartProps) => {
  const [dataPieChart, setDataPieChart] = useState<PieChartCell[]>([]);

  useEffect(() => {
    setDataPieChart(test(endpoints));
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
