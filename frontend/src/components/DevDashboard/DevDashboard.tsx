import { Container } from "@mantine/core";
import PubDashboardComp from "../publicDashboard/PubDashboardComp";
import { useAuthContext } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import iApp from "../../types/IApp";
import { GetUserApps, getAllApps } from "../ApiCaller";




const DevDashboard = () => {
  const { curentUser } = useAuthContext();
  const [data, setData] = useState<iApp[]>([]);

  function GetData() {
    if(curentUser === null)return;
    getAllApps().then((allApps) => {
      if (allApps === -1) return;
      GetUserApps(curentUser.email).then((filteredIds)=>{
        if(filteredIds === -1)return;
        console.log(filteredIds);
        console.log(allApps);
        const filteredApps = allApps.filter( allApp => filteredIds.includes(allApp._id));
        console.log(filteredApps);
        setData(filteredApps);
      })
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
