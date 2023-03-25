import { useEffect, useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import {
  FaBars,
  FaCartArrowDown,
  FaSave,
  FaTrashAlt,
  FaPlusSquare,
  FaMinusSquare,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem, buyItem } from "../features/lists/listSlice";

function Item(props) {
  const dispatch = useDispatch();
  const [expanded, toggle] = useState(false);

  const { id, item, isPublic } = props;
  const [itemName, setItemName] = useState("");
  const [isle, setItemIsle] = useState("");
  const [quantity, setItemQuantity] = useState(1);
  const [isBought, setIsBought] = useState(false);

  const DragHandle = sortableHandle(() => (
    <button className="btn-grab">
      <FaBars />
    </button>
  ));

  useEffect(() => {
    setItemName(item.itemName);
    setItemIsle(item.isle);
    setItemQuantity(item.quantity);
    setIsBought(item.isBought);
  }, [item]);

  let payload = {
    id,
    itemId: item._id,
    itemName,
    quantity,
    isle,
    isPublic,
  };

  return (
    <div className="item">
      <div className={isBought ? "item-header-bought" : "item-header"}>
        <div className="horizontal-wide">
          {expanded ? (
            <div className="vertical-tall">
              <DragHandle />
              <button
                className="btn-del"
                onClick={() => dispatch(deleteItem(payload))}
              >
                <FaTrashAlt />
              </button>
            </div>
          ) : (
            <DragHandle />
          )}
          <div className="item-title">
            <div className="vertical-wide">
              {expanded ? (
                <div className="horizontal-wide">
                  <input
                    className="input"
                    type="text"
                    name="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <div
                    className="horizontal-wide"
                    onClick={() => toggle(!expanded)}
                  >
                    <span style={{marginRight: "0.8rem"}}>{item.itemName}</span>
                    <span style={{color: "#999999" }}>x{item.quantity}</span>
                  </div>
                {item.isle !== '' &&    <p
                    onClick={() => toggle(!expanded)}
                    style={{
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "#7575a3",
                    }}
                  >
                    {item.isle}
                  </p>}
                </>
              )}
              {expanded && (
                <div className="horizontal-wide">
                  <input
                    className="input"
                    type="text"
                    name="isle"
                    value={isle}
                    onChange={(e) => setItemIsle(e.target.value)}
                  />
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
              )}
            </div>
          </div>
          {expanded ? (
            <div className="vertical-tall">
              <button
                onClick={() => dispatch(buyItem(payload))}
                className="btn-buy"
              >
                <FaCartArrowDown />
              </button>
              <button
                onClick={() => {
                  dispatch(updateItem(payload));
                  toggle(false);
                }}
                className="btn-save"
              >
                <FaSave />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => dispatch(buyItem(payload))}
                className="btn-buy"
              >
                <FaCartArrowDown />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
