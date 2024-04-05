function Login() {
    return (
      <form method="post" action="/api/login">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    );
  }

export default Login;