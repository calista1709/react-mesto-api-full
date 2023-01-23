import { useRef } from 'react';

function Login({ onAuthorize }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorize(passwordRef.current.value, emailRef.current.value);
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form action="#" method="post" name="login" className="auth__form" onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" name="email" className="auth__input auth__input_email" placeholder="Email" required />
        <input ref={passwordRef} type="password" name="password" className="auth__input auth__input_password" placeholder="Пароль" required />
        <input type="submit" name="sign-in" className="auth__save" value="Войти" />
      </form>
    </div>
  );
}

export default Login;