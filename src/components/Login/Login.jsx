import { useState } from "react";
import { login } from "../../utils/api";
import "./Login.css";

function Login({ onClose, onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [apiError, setApiError] = useState("");

  function validate(newEmail, newPassword) {
    const newErrors = {};

    if (!newEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = "Invalid email address";
    }

    if (!newPassword) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    setIsValid(newEmail && newPassword && Object.keys(newErrors).length === 0);
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    validate(value, password);
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    validate(email, value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setApiError("");

    login({
      email,
      password,
    })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        // IMPORTANT
        onLoginSuccess();

        onClose();
      })
      .catch((err) => {
        console.error(err);
        setApiError("Invalid email or password.");
      });
  }

  return (
    <form className="login" onSubmit={handleSubmit} noValidate>
      <h2 className="login__title">Sign in</h2>

      <label className="login__label">Email</label>

      <input
        type="email"
        className="login__input"
        value={email}
        onChange={handleEmailChange}
        required
      />

      {errors.email && <span className="login__error">{errors.email}</span>}

      <label className="login__label">Password</label>

      <input
        type="password"
        className="login__input"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      {errors.password && (
        <span className="login__error">{errors.password}</span>
      )}

      {apiError && <span className="login__error">{apiError}</span>}

      <button type="submit" className="login__button" disabled={!isValid}>
        Sign in
      </button>

      <p className="login__switch">
        or{" "}
        <button
          type="button"
          className="login__link"
          onClick={onSwitchToRegister}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Login;
