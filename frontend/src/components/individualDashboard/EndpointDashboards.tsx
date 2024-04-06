import { Stack } from "@mantine/core";
import { EndpointData } from "../publicDashboard/PubDashCard";
import ColoredStatus from "../publicDashboard/ColoredStatus";

interface EndpointDashboardsProps {
  endpoints: EndpointData[];
}

const EndpointsDashboard = ({ endpoints }: EndpointDashboardsProps) => {
  return (
    <>
      <Stack gap={10}>
        {endpoints.map((endpoint) => (
          <Stack >
            <div>
              {endpoint.EndpointName}&nbsp;&nbsp;
              <ColoredStatus status={endpoint.EndpointStatus} />
            </div>
            <div> color graph</div>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default EndpointsDashboard;
