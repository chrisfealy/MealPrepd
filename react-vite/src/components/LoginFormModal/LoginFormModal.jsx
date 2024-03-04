import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()

    return await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
      .then(() => closeModal())
  }

  return (
    <div className="login-container">
      <h2>Member Login</h2>
      <div className="login-errors">
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="login-errors">
        {errors.password && <p>{errors.password}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-inputs">
          <div className="login-input">
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="login-buttons">
          <button type="submit" className="login-btn">Log In</button>
          <div>or</div>
          <button onClick={demoLogin} className="login-btn">Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
