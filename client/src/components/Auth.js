import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form className="form">
          <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {!isLogin && <input type="password" placeholder="Confirm Password" />}
          <input type="submit" className="create" />
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
