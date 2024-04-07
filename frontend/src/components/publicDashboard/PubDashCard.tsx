import iApp from "../../types/IApp.ts";
import ColoredStatus from "./ColoredStatus.tsx";
import { extractLastPathFragment } from "../individualDashboard/EndpointDashboards.tsx";
import { IconBug } from "@tabler/icons-react";
import { Select, Stack, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateBugReport } from "../ApiCaller.ts";
import { useAuthContext } from "../auth/AuthContext.tsx";

interface CardProps {
  app: iApp;
  OnClick?: () => void;
}

interface CreateBugForm {
  app: iApp;
  closeModal : () => void;
}

const CreateBugForm = ({ app, closeModal }: CreateBugForm) => {
  const [valueEndpoint, setValueEndpoint] = useState<string | null>();
  const [valueStatus, setValueStatus] = useState<string | null>();
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  
  const handleSubmitBugReport = () => {
    if(valueEndpoint === null || valueEndpoint === undefined) {
      console.log("error handleSubmitBugReport");
      return;
    }

    if(valueStatus === null || valueStatus === undefined) {
      console.log("error handleSubmitBugReport");
      return;
    }
    CreateBugReport(app._id, valueEndpoint, valueStatus, message).then(respData => {
      console.log(respData);
      closeModal();
    })
  }

  useEffect(() => {
    console.log(app);
    if (app !== undefined && app.endpoints !== undefined) {
      const newArr = Array.from(
        new Set(app.endpoints.map((el) => el.name.toString()))
      );
      setEndpoints(newArr);
    }
  }, [app]);
  return (
    <Stack gap={10}>
      <Select
        label="Endpoint name"
        placeholder="Pick value"
        data={endpoints}
        value={valueEndpoint}
        onChange={setValueEndpoint}
      />

      <Select
        label="Status"
        placeholder="Pick value"
        data={[ "Unstable", "Down"]}
        value={valueStatus}
        onChange={setValueStatus}
      />
      <TextInput label="Message" placeholder="Short message" size="md" 
      value={message} onChange={(e) => {
        return setMessage(e.target.value);
      }}/>

      <Button onClick={handleSubmitBugReport}> Send bug report </Button>
    </Stack>
  );
};

const Card = ({ app, OnClick }: CardProps) => {
  const {curentUser } = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleReportBug = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  const handleRedirect = () => {
    navigate(`/pubdash/${app._id}`);
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Report a bug" centered>
        <CreateBugForm app={app} closeModal={close}/>
      </Modal>

      <div className="max-w-sm rounded overflow-hidden shadow-lg py-4 bg-white">
        <div>
          <div className="px-6 relative">
            <div className="font-bold text-xl mb-2">{app.appName}</div>
            <Tooltip label="Report a bug" position="top">
              <button
                onClick={handleReportBug}
                className="absolute right-[12px] top-[-5px] bg-red-600 p-[5px] rounded text-white justify-center items-center"
              >
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
                  <p className="font-bold text-blue-900"> .... </p>
                )}
        {  curentUser!==null &&   (<Button
                variant="default"
                className="font-bold text-blue-900 my-2"
                onClick={handleRedirect}
              >
                Go to dev dashboard
              </Button>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
