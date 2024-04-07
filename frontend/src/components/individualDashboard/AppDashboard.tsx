import { useParams } from "react-router-dom";
import { Box, Card, Grid, SimpleGrid, Stack, Tooltip } from "@mantine/core";
import AppPieChart from "./AppPieChart";
import EndpointsDashboard from "./EndpointDashboards";
import { useEffect, useState } from "react";
import iApp from "../../types/IApp";
import { getAppWithLatestLogs, updateReport } from "../ApiCaller";
import iEndpoint from "../../types/IEndpoint";
import { useAuthContext } from "../auth/AuthContext";
import ColoredStatus from "../publicDashboard/ColoredStatus";
import { Status } from "../../types/Status";
import iReport from "../../types/IReport";
import { IconTool } from "@tabler/icons-react";
import AverageStatsComp from "./AverageStatsComp";


export interface StatusCodes{
  code100 : number,
  code200 : number,
  code300 : number,
  code400 : number,
  code500 : number
}


const BugsList = ({app, OnRefetchData} : { app : iApp, OnRefetchData : () => void}) => {
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

  const sortedReports = Array.from(groupedReports.values())
    .map((reports) =>
      reports.sort((a, b) => a.endpoint.localeCompare(b.endpoint.toString()))
    )
    .flatMap((reports) => reports.filter((report) => !report.fixed));

    const HandleFix = (reportId : String) =>{
      if(app._id === undefined) {
        console.log("err handle fix");
        return;
      }
        updateReport(app._id, reportId.toString()).then(()=>{
          OnRefetchData();
        })
    }

  return (
    <Box className="overflow-auto" h={250}>
      <Stack gap={1}>
        {sortedReports.map((report, index) => (
          <Card key={index} className="relative">
            <p className="font-bold"> {report.endpoint} </p>
            <ColoredStatus
              status={report.state as Status}
              myClasses="absolute right-10 text-xl"
            />
            <p> {report.message} </p>
            <Tooltip label="Mark as fixed" position="top">
              <IconTool className="right-0 absolute hover:cursor-pointer" onClick={() => HandleFix(report._id)}></IconTool>
            </Tooltip>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};


const AppDashboard = () => {
  const { appId } = useParams();
  const [app, setApp] = useState<iApp>();
  const [endpoints, SetEndpoints] = useState<iEndpoint[]>([]);
  const [ statusCodes, setStatusCodes] = useState<StatusCodes>({code100 : 0, code200: 0, code300 : 0, code400: 0, code500: 0});
  const { curentUser } = useAuthContext();

  function getData() {
    if (appId === undefined || curentUser === null) return;
    getAppWithLatestLogs(appId, curentUser?.period ?? 24).then((el) => {
      if (el === -1) return;
      setApp(el);
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

    setStatusCodes({
      code100: newLogs.filter((x) => x.response >= 100 && x.response < 200).length,
      code200: newLogs.filter((x) => x.response >= 200 && x.response < 300).length,
      code300: newLogs.filter((x) => x.response >= 300 && x.response < 400).length,
      code400: newLogs.filter((x) => x.response >= 400 && x.response < 500).length,
      code500: newLogs.filter((x) => x.response >= 500 && x.response < 600).length,
    })
  
  }, [endpoints]);

  return (
    <>
      {app && appId && (
        <>
          <Stack>
            <SimpleGrid mt={20} cols={1} spacing="lg" verticalSpacing="lg">
              <Card>
                {app && (
                  <h1>
                    {" "}
                    {app?.appName} - <ColoredStatus status={app!.status} />{" "}
                  </h1>
                )}
              </Card>
            </SimpleGrid>
            <Grid>
              <Grid.Col span={3}>
                <Card className="h-full">
                 <AverageStatsComp data={statusCodes}/>
                </Card>
              </Grid.Col>
              <Grid.Col span={6}>
                <Card>
                  <h1>
                    {" "}
                    Bugs
                  </h1>
                  <BugsList app={app}  OnRefetchData={getData} />
                </Card>
              </Grid.Col>
              <Grid.Col span={3}>
                <Card className="flex justify-center items-center h-full">
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
