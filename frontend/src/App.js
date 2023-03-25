import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordReset from "./pages/PasswordReset";
import ListContents from "./components/ListContents";
import SharedListContents from "./components/SharedListContents";
import PublicListContents from "./components/PublicListContents";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetrequest" element={<PasswordResetRequest />} />
            <Route
              path="/passwordreset/:token/:id"
              element={<PasswordReset />}
            />
            <Route path="/lists/:id" element={<ListContents />} />
            <Route path="/shared/:id" element={<SharedListContents />} />
            <Route path="/public/:id" element={<PublicListContents />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
