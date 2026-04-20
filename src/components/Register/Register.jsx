import { useState } from "react";
import { register } from "../../utils/api";
import "./Register.css";

function Register({ onSwitchToLogin, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [apiError, setApiError] = useState("");

  function validate(newEmail, newPassword, newName) {
    const newErrors = {};

    if (!newName) {
      newErrors.name = "Name is required";
    }

    if (!newEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = "Invalid email";
    }

    if (!newPassword) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    setIsValid(
      newName && newEmail && newPassword && Object.keys(newErrors).length === 0,
    );
  }

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    validate(email, password, value);
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    validate(value, password, name);
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    validate(email, value, name);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setApiError("");

    register({
      name,
      email,
      password,
    })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        console.error(err);
        setApiError("Registration failed. Try again.");
      });
  }

  return (
    <form className="register" onSubmit={handleSubmit} noValidate>
      <h2 className="register__title">Sign up</h2>

      <label className="register__label">Name</label>

      <input
        type="text"
        className="register__input"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        required
      />

      {errors.name && <span className="register__error">{errors.name}</span>}

      <label className="register__label">Email</label>

      <input
        type="email"
        className="register__input"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      {errors.email && <span className="register__error">{errors.email}</span>}

      <label className="register__label">Password</label>

      <input
        type="password"
        className="register__input"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      {errors.password && (
        <span className="register__error">{errors.password}</span>
      )}

      {apiError && <span className="register__error">{apiError}</span>}

      <button type="submit" className="register__button" disabled={!isValid}>
        Sign up
      </button>

      <p className="register__switch">
        or{" "}
        <button
          type="button"
          className="register__link"
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default Register;
