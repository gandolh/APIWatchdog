import { UserData, AppStateProvider } from "../islands/AppStateProvider.tsx";
import NavBar from "../islands/NavBar.tsx";
import type { ComponentChildren } from "preact";

interface LayoutProps {
    children: ComponentChildren;
    data: UserData;
}

export default function Layout({ children, data }: LayoutProps) {
    return (
        <>
            <AppStateProvider userData={data}>
            <NavBar />
            <div className="container-md mx-12 my-6">
                {children}
            </div>
            </AppStateProvider>
        </>
    );
}