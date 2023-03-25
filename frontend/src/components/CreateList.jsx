import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createList } from "../features/lists/listSlice";

function CreateList() {
  const [listName, setListName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createList({ listName }));
    setListName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <div className="horizontal">
          <input
            className="input"
            style={{ marginLeft: "0.5rem" }}
            placeholder="Enter your list name here"
            type="text"
            name="listName"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button className="btn" type="submit">
            <FaCartPlus />
            <span className="hide-sm">Create</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateList;
