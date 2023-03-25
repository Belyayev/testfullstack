import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLaptopCode } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Loader";
import cart from "../images/cart.png";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

  const onSubmit = (e) => {
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <img className="cart" src={cart} alt="cart" />
        <h1 className="large-logo">
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <div className="login-section">
        <input
          type="text"
          className="input"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your name"
          onChange={onChange}
        />
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
        <input
          type="password"
          className="input"
          id="password2"
          name="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={onChange}
        />
        <div className="horizontal-spaced">
          <button className="btn-submit" onClick={onSubmit}>
            Submit
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

export default Register;
