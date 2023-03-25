import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getPublicList,
  sortList,
  groupCheck,
  reset,
} from "../features/lists/listSlice";
import Item from "./Item";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import CreateItem from "./CreateItem";

const PublicListContents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = { email: "public" };

  const [showBought, setShowBought] = useState(false);

  const { selectedList, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    dispatch(getPublicList(id));

    if (message === "List not found") {
      toast.error(message);
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, id, isError, message]);

  let itemList;
  let listGroups = [];

  if (selectedList) listGroups = selectedList.groups;

  if (selectedList && showBought)
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
          showBought={showBought}
          item={item}
          isPublic
        />
      </div>
    ));

  if (selectedList && selectedList.items && !showBought)
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
            showBought={showBought}
            item={item}
            isPublic
          />
        </div>
      ));

  const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items &&
          items.map((value, index) => (
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
        {showBought ? (
          <button
            className="btn"
            style={{ marginRight: "-0.5rem" }}
            onClick={() => setShowBought(false)}
          >
            <FaEye />
            <span className="hide-sm">Hide purchased</span>
          </button>
        ) : (
          <button
            className="btn"
            style={{ marginRight: "-0.5rem" }}
            onClick={() => setShowBought(true)}
          >
            <FaEyeSlash />
            <span className="hide-sm">Show purchased</span>
          </button>
        )}
      </div>
      {listGroups && listGroups.length > 0 && (
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

      <CreateItem id={id} user={user} public />
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

export default PublicListContents;
