import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "./HeaderMegaMenu";
import { AppShell, useMantineColorScheme} from '@mantine/core';

export default function MainLayout() {
  const [NavLinks, setNavLinks] = React.useState<Array<NavLink>>([
    { id: 1, name: "All apps", anchor: "", active: true, needsAuth : false },
    { id: 2, name: "My apps", anchor: "devdash", active: false, needsAuth : true },
  ]);

  const changeActive = (id: number) => {
    let navLinksCopy = NavLinks.map((link) =>
      id === link.id ? { ...link, active: true } : { ...link, active: false }
    );
    setNavLinks(navLinksCopy);
  };

  const lightShell = "bg-[#bde0fe]";
  const darkShell = "bg-[#333]";
  const { colorScheme } = useMantineColorScheme();

  return (
    <>

      <AppShell
        className={colorScheme === 'light' ? lightShell : darkShell}
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <HeaderMegaMenu NavLinks={NavLinks} handleChangeActive={changeActive} />
        </AppShell.Header>

        <AppShell.Main pt={60}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}