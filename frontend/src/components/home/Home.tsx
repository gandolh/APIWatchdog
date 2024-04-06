import { Container, SimpleGrid } from "@mantine/core";
import WelcomeCard from "./WelcomeCard";
import HomeStats from "./HomeStats";
import TodayPlan from "./TodayPlan";


const Home = () => {
  return (

    <div>
     <Container 
     fluid pt={30} 
 
     className="flex flex-col items-center justify-center" 
      style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}} >
      <SimpleGrid cols={3} className="w-full mx-auto h-[80dvh]">
        <WelcomeCard/>
        <TodayPlan/>
        <HomeStats/>
      </SimpleGrid>
    </Container>
    </div>
  );
}

export default Home;