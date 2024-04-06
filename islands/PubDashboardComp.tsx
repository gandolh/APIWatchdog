import PubDashCard, {PublicCardData} from "./PubDashCard.tsx";

const data: PublicCardData[] = [
    {
        AppName: "App1",
        AppStatus: "Healthy",
        EndpointData: [
            {
                EndpointName: "Endpoint1",
                EndpointStatus: "Healthy",
                EndpointURL: "http://localhost:8080"
            },
            {
                EndpointName: "Endpoint2",
                EndpointStatus: "Healthy",
                EndpointURL: "http://localhost:8080"
            }
        ]
    },
    {
        AppName: "App2",
        AppStatus: "Healthy",
        EndpointData: [
            {
                EndpointName: "Endpoint1",
                EndpointStatus: "Healthy",
                EndpointURL: "http://localhost:8080"
            },
            {
                EndpointName: "Endpoint2",
                EndpointStatus: "Healthy",
                EndpointURL: "http://localhost:8080"
            }
        ]
    }
]



const PubDashboardComp = () => {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {
                data.map((app) => {
                    return (
                        <a href="pubdash/142">
                            <PubDashCard app={app}/>
                        </a>
                    )
                })
            }
        </div>
    );
}

export default PubDashboardComp;