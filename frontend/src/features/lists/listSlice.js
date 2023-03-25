import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listService from "./listService";

const initialState = {
  lists: [],
  sharedLists: [],
  selectedList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new list
export const createList = createAsyncThunk(
  "lists/create",
  async (listData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.createList(listData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update existing list
export const updateList = createAsyncThunk(
  "lists/update",
  async (listData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.updateList(listData.id, listData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Sort list items
export const sortList = createAsyncThunk(
  "lists/sortitems",
  async (payload, thunkAPI) => {
    try {
      return await listService.sortList(payload.id, payload.params);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Check or Uncheck groups
export const groupCheck = createAsyncThunk(
  "lists/groupcheck",
  async (payload, thunkAPI) => {
    try {
      return await listService.groupCheck(payload.id, payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle Show Bought list
export const showBought = createAsyncThunk(
  "lists/showbought",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.showBought(payload.id, payload, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle Make List Private
export const makePrivate = createAsyncThunk(
  "lists/makeprivate",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.makePrivate(payload.id, payload, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user lists
export const getLists = createAsyncThunk(
  "lists/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getLists(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get shared lists
export const getSharedLists = createAsyncThunk(
  "lists/getShared",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getSharedLists(payload, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a single list
export const getList = createAsyncThunk(
  "lists/getmylist",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getList(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user list
export const deleteList = createAsyncThunk(
  "lists/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.deleteList(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add list item
export const addItem = createAsyncThunk(
  "lists/additem",
  async (payload, thunkAPI) => {
    try {
      if (payload.isPublic)
        return await listService.addItemPublic(payload.listId, payload);
      else {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.addItem(payload.listId, payload, token);
      }
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update list item
export const updateItem = createAsyncThunk(
  "lists/updateitem",
  async (payload, thunkAPI) => {
    try {
      if (payload.isPublic)
        return await listService.updateItemPublic(payload.id, payload);
      else {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.updateItem(payload.id, payload, token);
      }
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Buy list item
export const buyItem = createAsyncThunk(
  "lists/buyitem",
  async (payload, thunkAPI) => {
    try {
      if (payload.isPublic)
        return await listService.buyItemPublic(payload.id, payload);
      else {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.buyItem(payload.id, payload, token);
      }
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete list item
export const deleteItem = createAsyncThunk(
  "lists/deleteitem",
  async (payload, thunkAPI) => {
    try {
      if (payload.isPublic)
        return await listService.deleteItemPublic(payload.id, payload);
      else {
        const token = thunkAPI.getState().auth.user.token;
        return await listService.deleteItem(payload.id, payload, token);
      }
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add shared with
export const addShare = createAsyncThunk(
  "lists/addshare",
  async (share, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.addShare(share.listId, share, token);
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete shared with
export const deleteShare = createAsyncThunk(
  "lists/deleteshare",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.deleteShare(payload.id, payload, token);
    } catch (error) {
      const message = console.log(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// --== SHARED LIST CONTROLLS ==-
// Get shared list
export const getSharedList = createAsyncThunk(
  "shared/getsharedlist",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getSharedList(payload, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --== PUBLIC LIST CONTROLLS ==--
// Get public list
export const getPublicList = createAsyncThunk(
  "lists/getpubliclist",
  async (id, thunkAPI) => {
    try {
      return await listService.getPublicList(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sortList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sortList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(groupCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(groupCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(sortList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(showBought.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showBought.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(showBought.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(makePrivate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePrivate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(makePrivate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSharedLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSharedLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sharedLists = action.payload;
      })
      .addCase(getSharedLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSharedList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSharedList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(getSharedList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.filter(
          (list) => list._id !== action.payload.id
        );
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(buyItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList.items = action.payload.items;
      })
      .addCase(buyItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addShare.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addShare.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(addShare.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteShare.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShare.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(deleteShare.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // public
      .addCase(getPublicList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedList = action.payload;
      })
      .addCase(getPublicList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;
