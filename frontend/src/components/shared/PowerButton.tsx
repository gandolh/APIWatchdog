import { UnstyledButton, Group, Avatar, Text, rem, Popover, Button, Stack, Divider } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToggleThemeComp } from './ToggleThemeComp';
import { useAuthContext } from '../auth/AuthContext';

type PowerButtonProps = {
    authenticatedUser: User;
}


const PowerButton = ({ authenticatedUser }: PowerButtonProps) => {
    const navigate = useNavigate();
	const {setCurentUser} = useAuthContext();

    const HandleLogout = () => {
        localStorage.removeItem('authenticatedUser');
        setCurentUser(null);
        navigate('/login');
    }

    return (
        <>
            <ToggleThemeComp />
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <div className='flex gap-4'>
                        <UnstyledButton className={classes.user}>
                            <Group>
                                <Avatar
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                                    radius="xl"
                                />

                                <div style={{ flex: 1 }}>
                                    <Text size="sm" fw={500}>
                                        {authenticatedUser.firstName + ' ' + authenticatedUser.lastName}
                                    </Text>

                                    <Text c="dimmed" size="xs">
                                        {authenticatedUser.email}
                                    </Text>
                                </div>

                                <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                            </Group>
                        </UnstyledButton>
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <Stack gap={0}>
                        <Link className='w-full ' to="/info">
                            My info
                        </Link>
                        <Divider my={'xs'} />
                        <Link className='w-full ' to="#">
                            Others 🙂
                        </Link>
                        <Divider my={'xs'} />
                        <Button variant="default" onClick={HandleLogout}>Log out</Button>
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </>

    );
}





export default PowerButton;