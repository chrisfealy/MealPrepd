import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const valErrors = {}
    if (!firstName.length) valErrors.firstName = 'First Name is required'
    if (!lastName.length) valErrors.lastName = 'Last Name is required'
    if (!username.length) valErrors.username = 'Username is required'
    if (!validateEmail(email)) valErrors.email = 'Email is invalid'
    if (password.length < 8) valErrors.password = 'Password must be at least 8 characters'
    if (confirmPassword.length < 8) valErrors.confirmPassword = 'Confirm Password must be at least 8 characters'
    setErrors(valErrors)
  }, [firstName, lastName, email, username, password, confirmPassword])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if(Object.keys(errors).length) return

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        username,
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

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {submitted && errors.server && <div className="signup-form-errors">{errors.server}</div>}
      <form onSubmit={handleSubmit}>
        <div className="signup-inputs">
          <div className="signup-input">
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {submitted && errors.firstName && <div className="signup-form-errors">{errors.firstName}</div>}
          </div>
          <div className="signup-input">
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {submitted && errors.lastName && <div className="signup-form-errors">{errors.lastName}</div>}
          </div>
          <div className="signup-input">
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {submitted && errors.email && <div className="signup-form-errors">{errors.email}</div>}
          </div>
          <div className="signup-input">
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {submitted && errors.username && <div className="signup-form-errors">{errors.username}</div>}
          </div>
          <div className="signup-input">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {submitted && errors.password && <div className="signup-form-errors">{errors.password}</div>}
          </div>
          <div className="signup-input">
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {submitted && errors.confirmPassword && <div className="signup-form-errors">{errors.confirmPassword}</div>}
          </div>
        <button type="submit" className="signup-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
