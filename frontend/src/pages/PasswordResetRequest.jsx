import { useState, useEffect } from "react";
import { FaKey, FaLaptopCode } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordResetRequest, reset } from "../features/auth/authSlice";
import Spinner from "../components/Loader";
import cart from "../images/cart.png";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    if (user && !user.isVerified) {
      navigate("/users/confirm/0");
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

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
        <p>Password reset link will be emailed to you</p>
      </section>

      <div className="login-section">
        <input
          type="email"
          className="input"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={onChange}
        />
        <div className="horizontal-spaced">
          <button
            className="btn-submit"
            onClick={() => {
              dispatch(passwordResetRequest({ email }));
              setEmail("");
            }}
          >
            Request
          </button>
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

export default PasswordResetRequest;
