import iApp from "../../types/IApp.ts";
import ColoredStatus from "./ColoredStatus.tsx";
import { extractLastPathFragment } from "../individualDashboard/EndpointDashboards.tsx";
import { IconBug } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  app: iApp;
  OnClick?: () => void;
}

const Card = ({ app, OnClick }: CardProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const handleReportBug = (e : MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        open();
    }

    const handleRedirect = () => {
        navigate(`pubdash/${app._id}`);
    }
  return (
    <>
     <Modal opened={opened} onClose={close} title="Report a bug" centered>
      </Modal>

      <div className="max-w-sm rounded overflow-hidden shadow-lg py-4 bg-white">
        <div>
          <div className="px-6 relative">
            <div className="font-bold text-xl mb-2">{app.appName}</div>
            <Tooltip label="Report a bug" position="top">
              <button onClick={handleReportBug}  className="absolute right-[12px] top-[-5px] bg-red-600 p-[5px] rounded text-white justify-center items-center">
                <IconBug></IconBug>
              </button>
            </Tooltip>
          </div>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-200 " />
          <div className="px-6">
            <div className="font-bold text-xl mb-2">
              {" "}
              <ColoredStatus status={app.status} />
            </div>
          </div>
          <div className="px-6">
            <ul>
              {app.endpoints?.slice(0, 3).map((endpoint) => {
                return (
                  <li className="flex items-center">
                    {extractLastPathFragment(endpoint.name)} -&nbsp;{" "}
                    <ColoredStatus status={endpoint.status} />
                  </li>
                );
              })}
              {app?.endpoints?.length !== undefined &&
                app?.endpoints?.length > 3 && (
                  <span className="font-bold text-blue-900"> See more </span>
                )}
            <Button variant="default" className="font-bold text-blue-900 my-2" onClick={handleRedirect}> Go to dev dashboard </Button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
