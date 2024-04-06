import iApp from "../../types/IApp.ts";
import ColoredStatus from "./ColoredStatus.tsx";
import { extractLastPathFragment } from "../individualDashboard/EndpointDashboards.tsx";




interface CardProps {
    app: iApp,
    OnClick? : ()=> void
}

const Card = ({ app, OnClick }: CardProps) => {
    


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg py-4 bg-white" onClick={OnClick}>
            <div className="px-6">
                <div className="font-bold text-xl mb-2">{app.appName}</div>
            </div>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-200 " />
            <div className="px-6">
                <div className="font-bold text-xl mb-2"> <ColoredStatus status={app.status}/></div>
            </div>
            <div className="px-6">
                <ul>
                    {app.endpoints?.slice(0,3).map(endpoint => {
                        return (
                            <li className="flex items-center">
                                {extractLastPathFragment(endpoint.name)} -&nbsp; <ColoredStatus status={endpoint.status}/>
                            </li>
                        )
                    }
                    )}
                    {(app?.endpoints?.length!== undefined && app?.endpoints?.length > 3) && (<span className="font-bold text-blue-900"> See more </span>)}
                </ul>
            </div>

        </div>
    );
}

export default Card;