import { useDispatch } from "react-redux";
import { deleteList } from "../features/lists/listSlice";
import { useNavigate } from "react-router-dom";

function List({ list }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <div className="list">
      <div className="list-header">
        <h2>{list.listName}</h2>
      </div>
      <div className="list-metadata">
        <p>
          {list.private ? (
            <span>private list: </span>
          ) : (
            <span>public list: </span>
          )}
          {list.sharedWith.length > 0
            ? `(shared with: ${list.sharedWith.length})`
            : `(not shared)`}
        </p>
        <p>{list.items.length} items</p>
      </div>
      <div className="list-buttons">
        <button
          onClick={() => dispatch(deleteList(list._id))}
          className="btn-delete"
        >
          Delete
        </button>

        <p>
          <span className="hide-sm">Updated: </span>
          {new Date(list.updatedAt).toLocaleTimeString("en-US", options)}
        </p>
        <button
          className="btn-open"
          onClick={() => {
            navigate(`/lists/${list._id}`);
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
}

export default List;
