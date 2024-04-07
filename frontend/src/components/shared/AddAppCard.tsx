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
import { addAppToUser, createApp } from "../ApiCaller";
import { useAuthContext } from "../auth/AuthContext";



interface AddAppFormProps {
  OnClose: () => void;
}

const AddAppForm = ({ OnClose }: AddAppFormProps) => {
  const [appName, setAppName] = useState<string>("");
	const {curentUser} = useAuthContext();
  //   const [endpoints, setEndpoints] = useState<newEndpoint[]>([]);

  //   const createNewEndpoint = () => {
  //     setEndpoints([...endpoints, { name: "", url: "" }]);
  //   };

  //   const updateEndpoint = (index : number, newName : string, newUrl : string) => {
  //         const newEndpoints = [...endpoints];
  //         newEndpoints[index].name = newName;
  //         newEndpoints[index].url = newUrl;
  //   }

  const HandleAddApp = () => {
    createApp(appName).then((el) => {
      if (el !== -1) {
        if(curentUser !=null)
          addAppToUser(el, curentUser.email);
        else console.log("curent user email is null");
        OnClose();
      }
    });
  };

  return (
    <Stack>
      <TextInput
        required
        label="App Name"
        placeholder="your app name"
        value={appName}
        onChange={(event) => setAppName(event.currentTarget.value)}
        radius="md"
      />
      {/* {endpoints.map((endpoint, index) => (
        <>
          <Paper withBorder p='sm'>
            <TextInput
              required
              label="Endpoint name"
              placeholder="your endpoint name"
              value={endpoint.name}
              onChange={(event) => updateEndpoint(index, event.currentTarget.value, endpoint.url)}
              radius="md"
            />
            <TextInput
              required
              label="Endpoint url"
              placeholder="your endpoint url"
              value={endpoint.url}
              onChange={(event) => updateEndpoint(index,endpoint.name, event.currentTarget.value)}
              radius="md"
            />
          </Paper>
        </> 
      ))} */}

      <Button onClick={HandleAddApp}> Add App </Button>
    </Stack>
  );
};

interface AddAppCard {
  OnRefetchData: () => void;
}

const AddAppCard = ({ OnRefetchData }: AddAppCard) => {
  const {curentUser} = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  function handleClose() {
    close();
    OnRefetchData();
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add app" centered>
        <AddAppForm OnClose={handleClose} />
      </Modal>
     {curentUser !==null &&  <Card
        onClick={open}
        className="flex justify-center items-center fw-bold "
      >
        Create App
      </Card>}
    </>
  );
};

export default AddAppCard;
