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

  return (
    <>
      {appId && (
        <>
          <Stack>
            <SimpleGrid cols={4} spacing="lg" mt={20}>
              <Card>
                <h1> 200 returns:</h1>
                <p className="text-green-500"> 20</p>
              </Card>
              <Card>
                <h1> 404 returns:</h1>
                <p className="text-red-500">10 </p>

              </Card>
              <Card>
                <h1> 500-511 returns:</h1>
                <p className="text-red-500"> 5</p>

              </Card>

              <div className="flex justify-center items-center">
                <AppPieChart endpoints={endpoints} />
              </div>
            </SimpleGrid>
            <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg" >
              <div className="flex justify-center items-center">
                <EndpointsDashboard
                  endpoints={endpoints}
                  appId={appId!}
                  OnRefetchData={getData}
                />
              </div>
            </SimpleGrid>
          </Stack>
        </>
      )}
    </>
  );
};

export default AppDashboard;
