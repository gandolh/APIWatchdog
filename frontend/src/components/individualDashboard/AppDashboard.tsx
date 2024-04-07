import { useParams } from "react-router-dom";
import { Card, Grid, SimpleGrid, Stack } from "@mantine/core";
import AppPieChart from "./AppPieChart";
import EndpointsDashboard from "./EndpointDashboards";
import { useEffect, useState } from "react";
import iApp from "../../types/IApp";
import { getAppWithLatestLogs } from "../ApiCaller";
import iEndpoint from "../../types/IEndpoint";
import { useAuthContext } from "../auth/AuthContext";
import ColoredStatus from "../publicDashboard/ColoredStatus";
import { Status } from "../../types/Status";
import iReport from "../../types/IReport";

const AppDashboard = () => {
  const { appId } = useParams();
  const [app, setApp] = useState<iApp>();
  const [endpoints, SetEndpoints] = useState<iEndpoint[]>([]);
  const [codes200, setCodes200] = useState<number>();
  const [codes400, setCodes400] = useState<number>();
  const [codes500, setCodes500] = useState<number>();
  const { curentUser } = useAuthContext();

  function getData() {
    if (appId === undefined || curentUser === null) return;
    getAppWithLatestLogs(appId, curentUser?.period ?? 24).then((el) => {
      if (el === -1) return;
      setApp(el);
    });
  }

  enum State {
    "Stable" = 0,
    "Unstable" = 1,
    "Down" = 2,
  }

  const BugsList = () => {
    // Group the reports based on their endpoint name
    // Sort the reports based on their status
    // Display the reports only if they are not fixed

    const reports = app?.reports ?? [];
    const groupedReports = new Map<string, iReport[]>();
    reports.forEach((report) => {
      if (groupedReports.has(report.endpoint.toString())) {
        groupedReports.get(report.endpoint.toString())?.push(report);
      } else {
        groupedReports.set(report.endpoint.toString(), [report]);
      }
    });

    
  }

  useEffect(() => {}, []);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, (curentUser?.frequency ?? 60) * 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [curentUser]);

  useEffect(() => {
    if (app?.endpoints !== undefined) SetEndpoints(app?.endpoints);
  }, [app]);

  useEffect(() => {
    const newLogs = endpoints.map((endpoint) => endpoint.logs ?? []).flat();
    //todo: codes
    setCodes200(
      newLogs.filter((x) => x.response >= 200 && x.response < 399).length
    );
    setCodes400(
      newLogs.filter((x) => x.response >= 400 && x.response < 500).length
    );
    setCodes500(
      newLogs.filter((x) => x.response >= 500 && x.response < 600).length
    );
  }, [endpoints]);

  return (
    <>
      {appId && (
        <>
          <Stack>
            <SimpleGrid mt={20} cols={1} spacing="lg" verticalSpacing="lg">
                <Card>
                  {app &&
                  <h1> {app?.appName} - <ColoredStatus status={app!.status}/>  </h1>
                  }
                   
                </Card>
            </SimpleGrid>
            <Grid >
              <Grid.Col span={3}>
                <Card className="h-full">
                  <h1> 200 codes:</h1>
                  <p className="text-green-500"> {codes200}</p>
                  <h1> 400 codes:</h1>
                  <p className="text-red-500">{codes400} </p>
                  <h1> 500 codes:</h1>
                  <p className="text-red-500"> {codes500}</p>
                </Card>
              </Grid.Col>
              <Grid.Col span={6}>
                <Card className="overflow-auto h-[200px]">
                    <h1> Bugs
                       {/* <span className="text-white">Baniii</span>  */}
                    </h1>
                    <BugsList />
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card className="flex justify-center items-center">
                  <Stack>
                    <h1> Stable / Unstable / Down</h1>
                    <AppPieChart endpoints={endpoints} />
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
            <SimpleGrid cols={1} spacing="lg" verticalSpacing="lg">
              <EndpointsDashboard
                endpoints={endpoints}
                appId={appId!}
                OnRefetchData={getData}
                
              />
            </SimpleGrid>
          </Stack>
        </>
      )}
    </>
  );
};

export default AppDashboard;
