import { useDispatch } from "react-redux";
import { deleteShare } from "../features/lists/listSlice";

function ListSharedWith({ id, share }) {
  const dispatch = useDispatch();

  let payload = { id, shareId: share._id };

  return (
    <div className="share">
      <p>{share.email}</p>
      <span>
        <button
          onClick={() => dispatch(deleteShare(payload))}
          className="btn-close"
        >
          X
        </button>
      </span>
    </div>
  );
}

export default ListSharedWith;
