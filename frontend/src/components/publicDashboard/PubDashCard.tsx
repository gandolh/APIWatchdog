import { Status } from "../../types/Status.ts";
import ColoredStatus from "./ColoredStatus.tsx";

export type EndpointData = {
    EndpointName: string;
    EndpointStatus: Status;
    EndpointURL: string;
}

export type PublicCardData = {
    AppName: string;
    AppStatus: Status;
    EndpointData: EndpointData[];
}

interface CardProps {
    app: PublicCardData,
    OnClick? : ()=> void
}

const Card = ({ app, OnClick }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg py-4 bg-white" onClick={OnClick}>
            <div className="px-6">
                <div className="font-bold text-xl mb-2">{app.AppName}</div>
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-200 " />
            <div className="px-6">
                <div className="font-bold text-xl mb-2"> <ColoredStatus status={app.AppStatus}/></div>
            </div>
            <div className="px-6">
                <ul>
                    {app.EndpointData.map(endpoint => {
                        return (
                            <li className="flex items-center">
                                {endpoint.EndpointName} -&nbsp; <ColoredStatus status={endpoint.EndpointStatus}/>
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