import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

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

   await fetch(`${process.env.React_APP_SERVERURL}/${endpoint}`)
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form className="form">
          <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {!isLogin && <input type="password" placeholder="Confirm Password" />}
          <input type="submit" className="create"
            onClick={(event) => handleSubmit(event, isLogin ? 'login' : 'signup')}
   
            />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogin ? 'red' : 'green'}}
          >Sign Up</button>
          <button
            onClick={() => viewLogin(true)}
            style={{backgroundColor : !isLogin ? 'red' : 'green'}}
          >Login</button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
