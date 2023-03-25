import { useNavigate } from "react-router-dom";

function SharedList({ list }) {
  const navigate = useNavigate();

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
      <div className="sharedList-buttons">
        <p>{list.items.length} items</p>
        <p>
          <span className="hide-sm">Updated: </span>
          {new Date(list.updatedAt).toLocaleTimeString("en-US", options)}
        </p>
        <button
          className="btn-open"
          onClick={() => {
            navigate(`/shared/${list._id}`);
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
}

export default SharedList;
