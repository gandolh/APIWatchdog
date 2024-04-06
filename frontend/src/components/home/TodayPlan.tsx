import { Card, Divider, List, ListItem, Title } from "@mantine/core";

const TodayPlan = () => {

	return (
		<Card shadow="sm" padding="xl">
			<Title order={1}>Today's Plan</Title>
			<Divider my="md" />
			<List withPadding>
				<List.Item className=" text-3xl">
					Breakfast
					<List withPadding>
						<ListItem className=" text-xl">Cereal</ListItem>
					</List>
				</List.Item>
				<List.Item className=" text-3xl">
					Lunch
					<List withPadding>
						<ListItem className=" text-xl">Steak</ListItem>
					</List>
				</List.Item>

				<List.Item className=" text-3xl">
					Dinner
					<List withPadding>
						<ListItem className=" text-xl">Sleep 😊</ListItem>
					</List>
				</List.Item>
			</List>
		</Card>
	);
};

export default TodayPlan;
