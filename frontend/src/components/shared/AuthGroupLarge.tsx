import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import PowerButton from "./PowerButton";

type AuthGroupLargeProps = {
    authenticatedUser: User | null;
}
const AuthGroupLarge = ({ authenticatedUser }: AuthGroupLargeProps) => {
    return (
        <Group visibleFrom="sm">
            {(authenticatedUser === null) && (
                <>
                    <Link to="/login">
                        <Button variant="default">Log in</Button>
                    </Link>
                    <Link to="/register">
                        <Button>Sign up</Button>
                    </Link>
                </>
            )}
            {(authenticatedUser !== null) && (
               <PowerButton authenticatedUser={authenticatedUser}/>
            )}
        </Group>);
}

export default AuthGroupLarge;