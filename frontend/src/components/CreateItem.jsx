import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus, FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { addItem } from "../features/lists/listSlice";
import { toast } from "react-toastify";

function CreateItem(props) {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isLoading, isError, isSuccess, message]);

  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const [isle, setItemIsle] = useState("");
  const [quantity, setItemQuantity] = useState(1);

  const item = {
    listId: props.id,
    itemName,
    quantity,
    isle,
    email: props.user.email,
    isPublic: props.public,
  };

  return (
    <div className="horizontal-wide">
      <div className="vertical-wide">
        <div className="horizontal">
          <input
            className="input"
            style={{ marginLeft: "0.5rem" }}
            placeholder="New item name (required)"
            type="text"
            name="itemName"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="horizontal">
          <input
            className="input"
            style={{ margin: "0 0.5rem" }}
            placeholder="Item group (optional)"
            type="text"
            name="isle"
            id="isle"
            value={isle}
            onChange={(e) => setItemIsle(e.target.value)}
          />
          <span className="hide-sm">Quantity: </span>
          <div className="item-controls">
            <button
              className="btn-icon"
              onClick={() => {
                if (quantity > 1) setItemQuantity(quantity - 1);
              }}
            >
              <FaMinusSquare />
            </button>
            <p>{quantity}</p>
            <button
              className="btn-icon"
              onClick={() => setItemQuantity(quantity + 1)}
            >
              <FaPlusSquare />
            </button>
          </div>
        </div>
      </div>

      <button
        className="btn"
        onClick={() => {
          dispatch(addItem(item));
          setItemName("");
          setItemIsle("");
          setItemQuantity(1);
        }}
      >
        <FaCartPlus /> <span className="hide-sm">Add</span>
      </button>
    </div>
  );
}

export default CreateItem;
