import { Container, SimpleGrid } from "@mantine/core";


const Home = () => {
  return (

    <div>
     <Container 
     fluid pt={30} 
 
     className="flex flex-col items-center justify-center" 
      style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}} >
      <SimpleGrid cols={3} className="w-full mx-auto h-[80dvh]">

      </SimpleGrid>
    </Container>
    </div>
  );
}

export default Home;