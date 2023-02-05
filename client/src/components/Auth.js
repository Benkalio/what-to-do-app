import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null)

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (event, endpoint) => {
    event.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch(
      `${process.env.React_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
      return;
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      // RELOAD PAGE WHEN COOKIE IS SET
      window.location.reload();
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form className="form">
          <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(event)=>setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event)=>setPassword(event.target.value)}
          />
          {!isLogin && <input
            type="password"
            placeholder="Confirm Password" 
            onChange={(event)=>setConfirmPassword(event.target.value)}
            />}
          <input
            type="submit"
            className="create"
            onClick={(event) =>
              handleSubmit(event, isLogin ? 'login' : 'signup')
            }
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? 'rgb(255,255,255)'
                : 'rgb(188,188,188)',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? 'rgb(255,255,255)'
                : 'rgb(188,188,188)',
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
