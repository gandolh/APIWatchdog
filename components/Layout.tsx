import NavBar from "../islands/NavBar.tsx";
import type { ComponentChildren } from "preact";
import { Data } from "../routes/index.tsx";

interface LayoutProps {
    children: ComponentChildren;
    data: Data;
}

export default function Layout({ children, data }: LayoutProps) {
    return (
        <>
            <NavBar isAllowed={data.isAllowed} />
            <div className="container-md mx-12 my-6">
                {children}
            </div>
        </>
    );
}