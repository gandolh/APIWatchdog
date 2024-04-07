import {
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { addEndpointToApp } from "../ApiCaller";

interface newEndpoint {
  name: string;
}

interface AddAppFormProps {
  OnClose: () => void;
  appId : string;
}

const AddEndpointForm = ({ OnClose, appId }: AddAppFormProps) => {
  const [endpoint, setEndpoint] = useState<newEndpoint>({
    name: "",
  } as newEndpoint);

  function updateName(newName: string) {
    setEndpoint((prev) => ({ ...prev, name: newName }));
  }

  // function updateUrl(newUrl: string) {
  //   setEndpoint((prev) => ({ ...prev, url: newUrl }));
  // }

  const HandleAddEndpoint = () => {
    addEndpointToApp(appId,endpoint.name).then((el) => {
      if (el === 0) OnClose();
    });
    // console.log(endpoint);
  };

  return (
    <Stack>
      <>
        {/* <Paper withBorder p="sm"> */}
          <TextInput
            required
            label="Endpoint url"
            placeholder="https://www.google.com/"
            value={endpoint.name}
            onChange={(event) => updateName(event.currentTarget.value)}
            radius="md"
          />
        {/* </Paper> */}
      </>
      <Button onClick={HandleAddEndpoint}> Add endpoint </Button>
    </Stack>
  );
};

interface AddEndpointCard {
  OnRefetchData: () => void;
  appId : string;
}

const AddEndpointCard = ({ OnRefetchData, appId }: AddEndpointCard) => {
  const [opened, { open, close }] = useDisclosure(false);
  function handleClose() {
    close();
    OnRefetchData();
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add endpoint" centered>
        <AddEndpointForm OnClose={handleClose} appId={appId} />
      </Modal>
      <Card
      bg={'teal'}
      c={'white'}
        onClick={open}
        className="flex justify-center items-center fw-bold "
      >
        Create Endpoint
      </Card>
    </>
  );
};

export default AddEndpointCard;
