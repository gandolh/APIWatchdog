import { Container } from "@mantine/core";
import PubDashboardComp from "./PubDashboardComp";
import { useEffect, useState } from "react";
import { getAllApps } from "../ApiCaller.ts";
import iApp from "../../types/IApp.ts";

const PublicDashboard = () => {
  const [data, setData] = useState<iApp[]>([]);

  function GetData() {
    getAllApps().then((el) => {
      if (el === -1) return;
      else setData(el);
    });
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Container
      fluid
      pt={0}
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100dvh - 60px - var(--app-shell-padding))" }}
    >
      <div className="w-full mx-auto h-[80dvh]">
        <PubDashboardComp data={data} OnRefetchData={GetData} isUserDashboard={false} />
      </div>
    </Container>
  );
};

export default PublicDashboard;
