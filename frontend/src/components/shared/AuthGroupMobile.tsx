import { Button, Group, Stack } from "@mantine/core";
import { useAuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";



type AuthGroupMobileProps = {
    authenticatedUser: User | null;
}
const AuthGroupMobile = ({ authenticatedUser }: AuthGroupMobileProps) => {
    const navigate = useNavigate();
	const {setCurentUser} = useAuthContext();


    const HandleRedirectMyInfo = () => {
        navigate('/myinfo')
    }

    const HandleLogout = () => {
        localStorage.removeItem('authenticatedUser');
        setCurentUser(null);
        navigate('/login');
    }

    return (
        <>
            {(authenticatedUser === null) && (
                <Group justify="center" grow pb="xl" px="md">
                    <Button variant="default">Log in</Button>
                    <Button>Sign up</Button>
                </Group>
            )}
            {(authenticatedUser !== null) && (
                <Stack>
                    <Button variant="default" className="w-full" onClick={HandleRedirectMyInfo}>My info</Button>
                    <Button variant="default" className="w-full"> Others 🙂 </Button>
                    <Button variant="default" onClick={HandleLogout}>Log out</Button>
                </Stack>
            )}
        </>
    );
}

export default AuthGroupMobile;