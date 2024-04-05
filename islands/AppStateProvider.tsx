import { createContext, ComponentChild } from "preact";
// import { signal } from "preact/signals-react";

export interface UserData {
    isAllowed: boolean;
}

const AppState = createContext<UserData>({ isAllowed: false } as UserData);

interface AppStateProviderProps {
    children: ComponentChild;
    userData: UserData;
}

function AppStateProvider({ children, userData }: AppStateProviderProps) {
    // const todos = signal([
    //   { text: "Write my first post on DEV community", completed: true },
    //   { text: "Explore more into Preact Signals feature", completed: false }
    // ]);
    return (
        <AppState.Provider value={ userData }>
            {children}
        </AppState.Provider>
    );
}


export { AppStateProvider, AppState};