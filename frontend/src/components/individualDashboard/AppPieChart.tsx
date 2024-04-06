import { PieChart } from "@mantine/charts";
import { EndpointData } from "../publicDashboard/PubDashCard";
const dataPieChart = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

interface AppPieChartProps {
  data : EndpointData[]
}

const AppPieChart = ({data} : AppPieChartProps) => {

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
