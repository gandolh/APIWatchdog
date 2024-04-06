import { Card, Divider, Stack, Title } from '@mantine/core';
import { PieChart, BarChart } from '@mantine/charts';
import { dataPieChart } from './dataPieChart';
import { dataBarChart } from './dataBarChart';
import { GetStats } from './HomeApiCaller';
import { useAuthContext } from '../auth/AuthContext';
import { useEffect, useState } from 'react';

const HomeStats = () => {

  const { curentUser } = useAuthContext();
  const [stats, setStats] = useState<any>();
  useEffect(() => {
    if (curentUser !== null) {
      GetStats(curentUser).then(stats => {
        console.log(stats);
        setStats(stats);
      });
    }

  }, [curentUser]);


  return (
    <Card
      shadow="sm"
      padding="xl"
    >
      <Title order={1}>
        Home Stats
      </Title>
      <Divider my="md" />
     { stats && <StackCharts stats={stats} />}


    </Card>

  );
}

type StackChartsProps = {
  stats: any
}

const StackCharts = ({stats} : StackChartsProps) => {

  let colors = ['violet.6', 'blue.6', 'teal.6', 'pink.6'];

  stats.weeklyPieChart = stats.weeklyPieChart.map((el: any, index: number) => {
    return { ...el, color: colors[index] }
  });

  return (
    <Stack align='center' >
      <PieChart withLabelsLine withTooltip labelsPosition="inside"
        labelsType="percent" withLabels data={stats.weeklyPieChart}/>
      <BarChart
        h={300}
        data={stats.dailyBarChart}
        dataKey="month"
        withLegend
        series={[
          { name: 'calories', color: 'violet.6' },
          { name: 'carbohydrate', color: 'blue.6' },
          { name: 'protein', color: 'teal.6' },
          { name: 'fat', color: 'pink.6' },
        ]}
      />
    </Stack>

  )
}
export default HomeStats;