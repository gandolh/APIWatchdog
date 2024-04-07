import { ActionIcon, Button, Select, Stack } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import { SetIntervalFrequency } from "../ApiCaller";

const frequencies: string[] = [
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

const periods: string[] = [
  "1h",
  "2h",
  "3h",
  "6h",
  "12h",
  "1d",
  "1w",
  "1M",
  "1y",
  "2y",
];

// seconds
function ConvertLetterFreqToInt(c: string): number {
  if (c === "s") return 1;
  if (c === "m") return 60;
  if (c === "h") return 3600;
  if (c === "d") return 3600 * 24;
  return 1;
}

// hours
function ConvertLetterPerToInt(c: string): number {
  if (c === "h") return 1;
  if (c === "d") return 24;
  if (c === "w") return 24 * 7;
  if (c === "M") return 24 * 7 * 30;
  if (c === "y") return 24 * 7 * 365;
  return 1;
}

const Settings = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [valueFrequency, setValueFrequency] = useState<string | null>(
    frequencies[4]
  );
  const [valuePeriod, setValuePeriod] = useState<string | null>(periods[5]);

  const { curentUser, setCurentUser } = useAuthContext();

  //TODO: save freq and period in user.
  const HandleSave = () => {
    if (valueFrequency === null || valuePeriod === null) return;
    if (valueFrequency === undefined || valuePeriod === undefined) return;

    const freq: number =
      Number.parseInt(valueFrequency) *
      ConvertLetterFreqToInt(valueFrequency.charAt(valueFrequency.length - 1));
    const per: number =
      Number.parseInt(valuePeriod) *
      ConvertLetterPerToInt(valuePeriod.charAt(valuePeriod.length - 1));
    setCurentUser({ ...curentUser, frequency: freq, period: per } as User);
    SetIntervalFrequency(freq).then((el) => console.log("A mers "));
  };

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
            placeholder="1d"
            data={periods}
          />
          <Button onClick={HandleSave}>Save</Button>
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
