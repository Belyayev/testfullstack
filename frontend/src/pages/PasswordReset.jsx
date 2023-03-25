import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaKey, FaLaptopCode } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordResetExecution, reset } from "../features/auth/authSlice";
import Spinner from "../components/Loader";
import cart from "../images/cart.png";

function PasswordReset() {
  const { token, id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (message && isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [id, user, isError, isSuccess, navigate, dispatch, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <img className="cart" src={cart} alt="cart" />
        <h1 className="large-logo">
          <FaKey /> Reset
        </h1>
        <p>Update your password</p>
      </section>
      <div className="login-section">
        <input
          type="password"
          className="input"
          id="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input"
          id="password2"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <div className="login-section">
          <div className="horizontal-spaced">
            <button
              className="btn-submit"
              onClick={() => {
                dispatch(
                  passwordResetExecution({ userId: id, token, password })
                );
              }}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
      <a href="https://belyayev.vercel.app/" target="blank">
        <div className="bottom-right-corner">
          <FaLaptopCode /> Developed by
        </div>
      </a>
    </>
  );
}

export default PasswordReset;
