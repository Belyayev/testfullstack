import axios from "axios";

const API_URL = "/api/lists/";
const SORT_URL = "/api/lists/sortlist/";
const GROUP_URL = "/api/lists/groupcheck/";
const SHOWBOUGHT_URL = "/api/lists/showbought/";
const MAKEPRIVATE_URL = "/api/lists/makeprivate/";
const ADDITEM_URL = "/api/lists/additem/";
const UPDITEM_URL = "/api/lists/updateitem/";
const BUYITEM_URL = "/api/lists/buyitem/";
const DELETEITEM_URL = "/api/lists/deleteitem/";
const ADDSHARE_URL = "/api/lists/addshare/";
const DELETESHARE_URL = "/api/lists/deleteshare/";
const SHARED_URL = "/api/shared/";
const GETSHAREDLIST_URL = "/api/shared/";
const PUBLIC_URL = "/api/public/";
const PUBLICADDITEM_URL = "/api/public/additem/";
const PUBLICBUYITEM_URL = "/api/public/buyitem/";
const PUBLICDELETEITEM_URL = "/api/public/deleteitem/";
const PUBLICUPDITEM_URL = "/api/public/updateitem/";

// Create new list
const createList = async (listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, listData, config);

  return response.data;
};

// Update a list
const updateList = async (id, listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, listData, config);

  return response.data;
};

// Sort items in a list
const sortList = async (id, payload) => {
  const response = await axios.put(SORT_URL + id, payload);

  return response.data;
};

// Check or Uncheck group
const groupCheck = async (id, payload) => {
  const response = await axios.put(GROUP_URL + id, payload);

  return response.data;
};

// Toggle Show Bought list
const showBought = async (id, payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(SHOWBOUGHT_URL + id, payload, config);

  return response.data;
};

// Toggle Make list Private
const makePrivate = async (id, payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(MAKEPRIVATE_URL + id, payload, config);

  return response.data;
};

// Get user lists
const getLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get shared lists
const getSharedLists = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(SHARED_URL, payload, config);

  return response.data;
};

// Get a single list
const getList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + listId, config);

  return response.data;
};

// Get a shared list
const getSharedList = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    GETSHAREDLIST_URL + payload.id,
    payload,
    config
  );

  return response.data;
};

// Delete user list
const deleteList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + listId, config);

  return response.data;
};

// Add list item
const addItem = async (id, item, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(ADDITEM_URL + id, item, config);

  return response.data;
};

// Update list item
const updateItem = async (id, item, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(UPDITEM_URL + id, item, config);

  return response.data;
};

// Buy list item
const buyItem = async (id, item, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(BUYITEM_URL + id, item, config);

  return response.data;
};

// Delete list item
const deleteItem = async (id, itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(DELETEITEM_URL + id, itemId, config);

  return response.data;
};

// Add shared with
const addShare = async (id, share, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(ADDSHARE_URL + id, share, config);

  return response.data;
};

// Delete shared with
const deleteShare = async (id, shareId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(DELETESHARE_URL + id, shareId, config);

  return response.data;
};

// --== PUBLIC LIST CONTROLLS ==--
// Get public list
const getPublicList = async (id) => {
  const response = await axios.get(PUBLIC_URL + id);

  return response.data;
};

// Add list item public
const addItemPublic = async (id, item) => {
  const response = await axios.put(PUBLICADDITEM_URL + id, item);

  return response.data;
};

// Delete list item public
const deleteItemPublic = async (id, itemId) => {
  const response = await axios.put(PUBLICDELETEITEM_URL + id, itemId);

  return response.data;
};

// Buy list item public
const buyItemPublic = async (id, item, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(PUBLICBUYITEM_URL + id, item, config);

  return response.data;
};

// Update list item public
const updateItemPublic = async (id, item) => {
  const response = await axios.put(PUBLICUPDITEM_URL + id, item);

  return response.data;
};

const listService = {
  createList,
  updateList,
  sortList,
  groupCheck,
  showBought,
  makePrivate,
  getLists,
  getSharedLists,
  getSharedList,
  getList,
  deleteList,
  addItem,
  updateItem,
  buyItem,
  deleteItem,
  addShare,
  deleteShare,
  getPublicList,
  addItemPublic,
  deleteItemPublic,
  buyItemPublic,
  updateItemPublic,
};

export default listService;
