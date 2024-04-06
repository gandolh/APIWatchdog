import { Container } from "@mantine/core";
import PubDashboardComp from "./PubDashboardComp";


const PublicDashboard = () => {
  return (

    <div>
     <Container 
     fluid pt={30} 
     className="flex flex-col items-center justify-center" 
      style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}} >
      <div className="w-full mx-auto h-[80dvh]">
         <PubDashboardComp />
      </div>
    </Container>
    </div>
  );
}

export default PublicDashboard;