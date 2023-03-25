import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <button className="btn-inverted">
            <FaShoppingCart />
            <span className="hide-sm">FreeShoppingList</span>
          </button>
        </Link>
      </div>
      <div className="header-menu">
        <p>{user && user.name}</p>
        {user ? (
          <button className="btn-inverted" onClick={onLogout}>
            <FaSignOutAlt />
            <span className="hide-sm">Logout</span>
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-inverted">
                <FaSignInAlt />
                <span className="hide-sm">Login</span>
              </button>
            </Link>
            <Link to="/register">
              <button className="btn-inverted">
                <FaUser />
                <span className="hide-sm">Register</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
