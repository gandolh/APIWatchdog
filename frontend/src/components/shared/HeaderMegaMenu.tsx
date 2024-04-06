import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Stack,
  useMantineColorScheme,
  Image,
  Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from "react-router-dom";
import classes from './HeaderMegaMenu.module.css';
import AuthGroup from './AuthGroupLarge';
import AuthGroupMobile from './AuthGroupMobile';
import { getLocalStorageUser } from '../../apiCallers/AuthApiCaller';
import { useAuthContext } from '../auth/AuthContext';
import { useEffect } from 'react';
// import classes from '../css/HeaderMegaMenu.module.css';

type HeaderMegaMenuProps = {
  NavLinks: Array<NavLink>;
  handleChangeActive: (id: number) => void;
}

export function HeaderMegaMenu({ NavLinks, handleChangeActive }: HeaderMegaMenuProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const {setCurentUser} = useAuthContext();

  useEffect(() => {
    const curentUser = getLocalStorageUser();
    if (curentUser) {
      setCurentUser(curentUser);
    }
    
  }, []);

  const { curentUser } = useAuthContext();
  const { colorScheme } = useMantineColorScheme();


  return (
    <Box >
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group gap={8}>
            <Image w={30} h={30} src="NutrishaLogoFin.webp" alt="Mantine logo" />
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'pink', to: 'violet', deg: 90 }}
              style={{ marginTop: 8}}
            >
              Nutrisha
            </Text>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            {NavLinks.map((link) => (
              <Link to={link.anchor} className={classes.link} key={link.id}
                onClick={() => handleChangeActive(link.id)}
                data-active={link.active ? link.active : undefined}
              >
                {link.name}
              </Link>
            ))}
          </Group>
          <AuthGroup authenticatedUser={curentUser}/>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Stack gap={0}>
          {NavLinks.map((link) => (
            <Link  to={link.anchor} className={classes.link + " " + "text-lg"} key={link.id}
            onClick={() => handleChangeActive(link.id)}
            data-active={link.active ? link.active : undefined}>
              {link.name}
            </Link>
          ))}
          </Stack>
          <Divider my="sm" />
            <AuthGroupMobile authenticatedUser={curentUser}/>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}