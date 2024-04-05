import NavBar from "../islands/NavBar.tsx";
import type { ComponentChildren } from "preact";

interface LayoutProps {
    children: ComponentChildren;
}

export default function Layout({children} : LayoutProps){
    return (
        <div className="container">
            <NavBar/>
            {children}
        </div>
    );
}