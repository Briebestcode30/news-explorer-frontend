import "./Success.css";

function Success({ onSwitchToLogin }) {
  return (
    <div className="success">
      <h2 className="success__title">Registration successfully completed!</h2>

      <button
        type="button"
        className="success__button"
        onClick={onSwitchToLogin}
      >
        Sign in
      </button>
    </div>
  );
}

export default Success;
