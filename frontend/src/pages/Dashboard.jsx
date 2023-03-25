import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaLaptopCode } from "react-icons/fa";
import CreateList from "../components/CreateList";
import SharedList from "../components/SharedList";
import { toast } from "react-toastify";
import List from "../components/List";
import Loader from "../components/Loader";
import { getLists, getSharedLists, reset } from "../features/lists/listSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { lists, sharedLists, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getLists());
    if (user) dispatch(getSharedLists({ email: user.email }));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <CreateList />

      {lists.length > 0 ? (
        <div>
          {lists.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
      ) : (
        <h1 className="padded-text">You do not have any lists yet</h1>
      )}

      {sharedLists.length > 0 && (
        <div>
          <p className="titleBorder">Lists shared with me:</p>
          {sharedLists.map((list) => (
            <SharedList key={list._id} list={list} />
          ))}
        </div>
      )}
      <a href="https://belyayev.vercel.app/" target="blank">
        <div className="bottom-right-corner">
          <FaLaptopCode /> Developed by
        </div>
      </a>
    </>
  );
}

export default Dashboard;
