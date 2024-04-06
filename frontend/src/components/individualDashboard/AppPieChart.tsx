import { PieChart } from "@mantine/charts";
const dataPieChart = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

const AppPieChart = () => {
  let colors = ["violet.6", "blue.6", "teal.6", "pink.6"];

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
