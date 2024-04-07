import { useParams } from "react-router-dom";
import { Card, SimpleGrid, Stack, resolveStyles } from "@mantine/core";
import AppPieChart from "./AppPieChart";
import EndpointsDashboard from "./EndpointDashboards";
import { useEffect, useState } from "react";
import iApp from "../../types/IApp";
import { GetAppById } from "../ApiCaller";
import iEndpoint from "../../types/IEndpoint";

const AppDashboard = () => {
  const { appId } = useParams();
  const [app, setApp] = useState<iApp>();
  const [endpoints, SetEndpoints] = useState<iEndpoint[]>([]);
  const [codes200, setCodes200] = useState<number>();
  const [codes400, setCodes400] = useState<number>();
  const [codes500, setCodes500] = useState<number>();

  function getData() {
    if (appId === undefined) return;
    GetAppById(appId).then((el) => {
      if (el === -1) return;
      setApp(el);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (app?.endpoints !== undefined) SetEndpoints(app?.endpoints);
  }, [app]);

  useEffect(()=>{
    const newLogs = endpoints.map(endpoint => endpoint.logs ?? []).flat();
    //todo: codes 
    setCodes200(newLogs.filter(x => x.response>= 200 && x.response<300).length);
    setCodes400(newLogs.filter(x => x.response>= 400 && x.response<500).length);
    setCodes500(newLogs.filter(x => x.response>= 500 && x.response<600).length);
  },[endpoints])

  return (
    <>
      {appId && (
        <>
          <Stack>
            <SimpleGrid cols={4} spacing="lg" mt={20}>
              <Card>
                <h1> 200 codes:</h1>
                <p className="text-green-500"> {codes200}</p>
              </Card>
              <Card>
                <h1> 400 codes:</h1>
                <p className="text-red-500">{codes400} </p>
              </Card>
              <Card>
                <h1> 500 codes:</h1>
                <p className="text-red-500"> {codes500}</p>
              </Card>

              <Card className="flex justify-center items-center">
              <Stack>
                 <h1> Stable / Unstable / Down</h1>
                <AppPieChart endpoints={endpoints} />
                </Stack>
              </Card>
            </SimpleGrid>
            <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg">
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
