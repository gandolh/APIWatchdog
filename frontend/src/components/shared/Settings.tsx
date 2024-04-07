import { ActionIcon, Button, Select, Stack } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";

const frequencies = [
  "5s",
  "10s",
  "15s",
  "30s",
  "1m",
  "5m",
  "10m",
  "15m",
  "30m",
  "1h",
  "2h",
  "3h",
  "6h",
  "12h",
  "1d",
  "3d",
];

const periods = [
    "1h", "2h", "3h", "6h", "12h", "1d", "1w", "1M", "1y", "2y"
]

const Settings = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [valueFrequency, setValueFrequency] = useState<string | null>(frequencies[4]);
  const [valuePeriod, setValuePeriod] = useState<string | null>(periods[0]);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Settings" centered>
        <Stack gap={10}>

        <Select
          value={valueFrequency}
          onChange={setValueFrequency}
          label="Log frequency"
          placeholder="1m"
          data={frequencies}
        />
        <Select
          value={valuePeriod}
          onChange={setValuePeriod}
          label="Period"
          placeholder="1h"
          data={periods}
        />
        <Button>Save</Button>
      </Stack>
        
      </Modal>
      <ActionIcon
        onClick={open}
        variant="default"
        size="xl"
        aria-label="Settings"
      >
        <IconSettings />
      </ActionIcon>
    </>
  );
};

export default Settings;
