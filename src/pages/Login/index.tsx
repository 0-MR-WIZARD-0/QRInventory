const Login = () => {
  return (
    <main className='grid'>
      <div className='register'>
        <h2>Sign In</h2>

        <form action='' method='post' className='form'>
          <div className='form__field'>
            <input type='email' placeholder='info@mailaddress.com' />
          </div>

          <div className='form__field'>
            <input type='password' placeholder='••••••••••••' />
          </div>

          <div className='form__field'>
            <input type='submit' value='Sign In' />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;