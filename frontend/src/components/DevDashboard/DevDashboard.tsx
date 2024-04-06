import { Container, SimpleGrid } from "@mantine/core";

const DevDashboard = () => {
  return     <div>
  <Container 
  fluid pt={30} 
  className="flex flex-col items-center justify-center" 
   style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}} >
   <SimpleGrid cols={3} className="w-full mx-auto h-[80dvh]">
   <h1>h3</h1>
   <h1>h2</h1>
   <h1>h1</h1>
   </SimpleGrid>
 </Container>
 </div>;
};

export default DevDashboard;
