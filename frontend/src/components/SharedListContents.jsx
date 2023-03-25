import React, { useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getSharedList,
  showBought,
  sortList,
  groupCheck,
  reset,
} from "../features/lists/listSlice";
import CreateItem from "./CreateItem";
import Item from "./Item";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const SharedListContents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { selectedList, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getSharedList({ id, email: user.email }));
    }

    if (
      message === "List not found" ||
      message === "User not found" ||
      message === "User not authorized"
    ) {
      toast.error(message);
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, id, isError, message]);

  let payload = { id };

  let itemList;
  let listGroups = [];

  if (selectedList) listGroups = selectedList.groups;

  if (selectedList && selectedList.showBought)
    itemList = selectedList.items.map((item) => (
      <div
        style={{
          display: listGroups.some(
            (e) => e.group === item.isle && !e.isSelected
          )
            ? "none"
            : "block",
        }}
      >
        <Item
          key={item._id}
          id={id}
          showBought={selectedList.showBought}
          item={item}
        />
      </div>
    ));

  if (selectedList && !selectedList.showBought)
    itemList = selectedList.items
      .filter((i) => !i.isBought)
      .map((item) => (
        <div
          style={{
            display: listGroups.some(
              (e) => e.group === item.isle && !e.isSelected
            )
              ? "none"
              : "block",
          }}
        >
          <Item
            key={item._id}
            id={id}
            showBought={selectedList.showBought}
            item={item}
          />
        </div>
      ));

  const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={uuidv4()} index={index} value={value} />
        ))}
      </div>
    );
  });

  const updateItemsOrder = (params) => {
    dispatch(sortList({ id, params }));
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="listcontents-title">
        {selectedList ? selectedList.listName : ""}
      </div>
      <div className="horizontal-margins">
        <p>{`owned by: ${selectedList && selectedList.owner}`}</p>
        {selectedList && selectedList.showBought ? (
          <button
            className="btn"
            style={{ marginRight: "-0.5rem" }}
            onClick={() => dispatch(showBought(payload))}
          >
            <FaEye />
            <span className="hide-sm">Hide purchased</span>
          </button>
        ) : (
          <button
            className="btn"
            style={{ marginRight: "-0.5rem" }}
            onClick={() => dispatch(showBought(payload))}
          >
            <FaEyeSlash />
            <span className="hide-sm">Show purchased</span>
          </button>
        )}
      </div>
      {listGroups.length > 0 && (
        <fieldset className="list-sharedwith">
          <legend>Display item groups:</legend>
          {listGroups.map(({ group, isSelected }, index) => (
            <div className="list-sharedwith">
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                key={group}
                name={group}
                value={group}
                style={{ marginLeft: "0.5rem" }}
                checked={isSelected}
                onChange={() => {
                  dispatch(groupCheck({ id, index }));
                }}
              />
              <p style={{ marginLeft: "0.5rem" }}>{group}</p>
            </div>
          ))}
        </fieldset>
      )}
      <CreateItem id={id} user={user} />
      {selectedList && (
        <SortableList
          items={itemList}
          onSortEnd={(oldIndex, newIndex) =>
            updateItemsOrder(oldIndex, newIndex)
          }
          useDragHandle
        />
      )}
    </div>
  );
};

export default SharedListContents;
