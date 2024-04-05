export type EndpointData = {
    EndpointName: string;
    EndpointStatus: string;
    EndpointURL: string;
}

export type PublicCardData = {
    AppName: string;
    AppStatus: string;
    EndpointData: EndpointData[];
}

const Card = ({ app }: { app: PublicCardData }) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg py-4">
            <div class="px-6">
                <div class="font-bold text-xl mb-2">{app.AppName}</div>
            </div>
            <div class="px-6">
                <div class="font-bold text-xl mb-2">{app.AppStatus}</div>
            </div>
            <div class="px-6">
                <ul>
                    {app.EndpointData.map(endpoint => {
                        return (
                            <li class="flex items-center">
                                {endpoint.EndpointName} - {endpoint.EndpointStatus}
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>

        </div>
    );
}

export default Card;