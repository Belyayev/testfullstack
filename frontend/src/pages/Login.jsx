import { useState, useEffect } from "react";
import { FaSignInAlt, FaLaptopCode } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Loader";
import cart from "../images/cart.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <img className="cart" src={cart} alt="cart" />
        <h1 className="large-logo">
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start shopping</p>
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
        <input
          type="password"
          className="input"
          id="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={onChange}
        />
        <div className="horizontal-spaced">
          <button className="btn-submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
        <div>
          <p onClick={() => navigate("/resetrequest")}>Forgot your password?</p>
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

export default Login;
