import { useParams } from "react-router-dom";
import { SimpleGrid, resolveStyles } from "@mantine/core";
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
        <SimpleGrid cols={2} spacing="lg" verticalSpacing="lg" p={128}>
          <div className="flex justify-center items-center">
            <EndpointsDashboard
              endpoints={endpoints}
              appId={appId!}
              OnRefetchData={getData}
            />
          </div>
          <div className="flex justify-center items-center">
            <AppPieChart endpoints={endpoints} />
          </div>
        </SimpleGrid>
      )}
    </>
  );
};

export default AppDashboard;
