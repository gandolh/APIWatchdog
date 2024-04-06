import { Container } from "@mantine/core";
import PubDashboardComp from "../publicDashboard/PubDashboardComp";
import { useAuthContext } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import iApp from "../../types/IApp";
import { GetUserApps } from "../ApiCaller";




const DevDashboard = () => {
  const { curentUser } = useAuthContext();
  const [data, setData] = useState<iApp[]>([]);

  function GetData() {
    if(curentUser === null)return;
    GetUserApps(curentUser.email).then((el) => {
      if (el === -1) return;
      setData(el);
    });
  }

  useEffect(() => {
    GetData();
  }, [curentUser]);

  return (
    <Container
      fluid
      pt={30}
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100dvh - 60px - var(--app-shell-padding))" }}
    >
      <div className="w-full mx-auto h-[80dvh]">
        <PubDashboardComp data={data} OnRefetchData={GetData} />
      </div>
    </Container>
  );
};

export default DevDashboard;
