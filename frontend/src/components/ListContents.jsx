import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  FaCog,
  FaEyeSlash,
  FaEye,
  FaHandHoldingHeart,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getList,
  sortList,
  groupCheck,
  showBought,
  makePrivate,
  addShare,
  reset,
} from "../features/lists/listSlice";
import Item from "./Item";
import ListSharedWith from "./ListSharedWith";
import Loader from "./Loader";
import CreateItem from "./CreateItem";

const ListContents = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedList, isLoading, isError, message } = useSelector(
    (state) => state.lists
  );

  const [settings, toggle] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [shareWith, setShareWith] = useState("");
  const share = { listId: id, email: shareWith };

  let itemList = [];
  let listGroups = [];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate(`/public/${id}`);
    }

    dispatch(getList(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, id, isError, message]);

  let payload = { id };

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
        <button className="btn-icon" onClick={() => toggle(!settings)}>
          <FaCog />
        </button>
        {selectedList ? selectedList.listName : ""}
      </div>
      {settings && (
        <>
          <div className="listcontents-settings">
            {selectedList && selectedList.showBought ? (
              <button
                className="btn"
                onClick={() => dispatch(showBought(payload))}
              >
                <FaEye />
                <span className="hide-sm">Hide purchased</span>
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => dispatch(showBought(payload))}
              >
                <FaEyeSlash />
                <span className="hide-sm">Show purchased</span>
              </button>
            )}
            <input
              className="input"
              placeholder="Share with e-mail"
              type="text"
              name="listName"
              id="listName"
              value={shareWith}
              onChange={(e) => setShareWith(e.target.value)}
            />
            <button
              className="btn"
              onClick={() => {
                dispatch(addShare(share));
                setShareWith("");
              }}
            >
              <FaHandHoldingHeart />
              <span className="hide-sm">Share List</span>
            </button>
            {selectedList && selectedList.private ? (
              <button
                className="btn"
                onClick={() => dispatch(makePrivate(payload))}
              >
                <FaLock />
                <span className="hide-sm">Make public</span>
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => dispatch(makePrivate(payload))}
              >
                <FaLockOpen />
                <span className="hide-sm">Make private</span>
              </button>
            )}
          </div>
          {selectedList && selectedList.sharedWith.length > 0 ? (
            <fieldset className="list-sharedwith">
              <legend>Shared with:</legend>
              {selectedList.sharedWith.map((share) => (
                <ListSharedWith key={share._id} id={id} share={share} />
              ))}
            </fieldset>
          ) : null}
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
        </>
      )}
      {user ? (
        <CreateItem id={id} user={user} />
      ) : (
        <CreateItem id={id} user={{ email: "puplic" }} />
      )}
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

export default ListContents;
