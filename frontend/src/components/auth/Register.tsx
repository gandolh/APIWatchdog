import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  NumberInput,
} from '@mantine/core';
import classes from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { RegisterCall } from '../../apiCallers/AuthApiCaller';

export default function Register() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      weight: null,
      height: null,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 8 ? null : 'Password is too short'),
      confirmPassword: (value, values) => (value == values.password ? null : 'Passwords doesn\'t match'),
      firstname: (value) => (value.length > 0 && value.length <= 30 ? null : 'Firstname is mandatory'),
      lastname: (value) => (value.length > 0 && value.length <= 30 ? null : 'LastName is mandatory'),
      // weight and height are optional
      weight: () => null,
      height: () => null
    },
  });

  const navigate = useNavigate();


  const HandleRegister = () => {
    const output = form.validate();
    if (output.hasErrors == true) return;
    // do call

    const user = {
      email: form.values.email,
      password: form.values.password,
      firstName: form.values.firstname,
      lastName: form.values.lastname,
      weight: form.values.weight,
      height: form.values.height,
    } as User;

    RegisterCall(user).then(ok => {
      console.log(ok)
      if (ok != -1) {
        navigate('/login');
      }
    });
  }



  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Nutritisha!
        </Title>

        <Group grow wrap="nowrap">
          <TextInput withAsterisk label="FirstName" placeholder="Popescu" size="md" {...form.getInputProps('firstname')} />
          <TextInput withAsterisk label="Lastname" placeholder="Ion" size="md" {...form.getInputProps('lastname')} />
        </Group>
        <TextInput withAsterisk label="Email" placeholder="hello@gmail.com" size="md" {...form.getInputProps('email')} />
        <PasswordInput withAsterisk label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
        <PasswordInput withAsterisk label="ConfirmPassword" placeholder="Confirm password" mt="md" size="md" {...form.getInputProps('confirmPassword')} />
        <NumberInput label="Height(cm)" placeholder="181" size="md" mt="md" {...form.getInputProps('weight')} />
        <NumberInput label="Weight(kg)" placeholder="65" size="md" mt="md" {...form.getInputProps('height')} />
        <Button fullWidth mt="xl" size="md" onClick={HandleRegister} type='button'>
          Register
        </Button>

        <Text ta="center" mt="md">
          You already have an account?{' '}
          <Link to='/login' style={{fontWeight:'700',color: 'var(--mantine-color-anchor)'}}>
              Login
          </Link>
        </Text>
      </Paper>
    </div>
  );
}