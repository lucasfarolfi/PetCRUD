import {createEntityAdapter,createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut, httpGetOne } from "../../api/AnimalsHttpRequest";

//Entity adapter
const animalAdapter = createEntityAdapter();

//Endpoints requests
export const fetchAnimals = createAsyncThunk("database/fetchAnimals",
  async () => {
    return await httpGet();
  }
);
export const getAnimal = createAsyncThunk("database/getAnimal", 
  async (id) => {
    return await httpGetOne(id);
  }
);
export const saveAnimal = createAsyncThunk("database/saveAnimal",
  async (animal) => {
    return await httpPost(animal);
  }
);
export const deleteAnimal = createAsyncThunk("database/deleteAnimal",
  async (id) => {
    await httpDelete(id);
    return id;
  }
);
export const updateAnimal = createAsyncThunk("database/updateAnimal",
  async (animal) => {
    return await httpPut(animal.id, animal);
  }
);

//Slice
const animalSlice = createSlice({
    name: "animals",
    initialState: animalAdapter.getInitialState({
      status: "not_loaded",
      error: null,
    }),
    reducers: {},
    extraReducers: {
      [fetchAnimals.fulfilled]: (state, { payload }) => {
        animalAdapter.setAll(state, payload);
        state.status = "ready";
      },
      [getAnimal.fulfilled]: (state, { payload }) => {
        animalAdapter.setOne(state, payload);
        state.status = "ready";
      },
      [saveAnimal.fulfilled]: (state, { payload }) => {
        animalAdapter.addOne(state, payload);
        state.status = "ready";
      },
      [updateAnimal.fulfilled]: (state, { payload }) => {
        state.status = "ready";
        animalAdapter.upsertOne(state, payload);
      },
      [deleteAnimal.pending]: (state) => {
        state.status = "loading";
      },
      [deleteAnimal.fulfilled]: (state, { payload }) => {
        animalAdapter.removeOne(state, payload);
        state.status = "ready";
      },
      [deleteAnimal.rejected]: (state) => {
        state.status = "failed";
      },
      [fetchAnimals.rejected]: (state) => {
        state.status = "failed";
      },
      [getAnimal.rejected]: (state) => {
        state.status = "failed";
      },
      [saveAnimal.rejected]: (state) => {
        state.status = "failed";
      },
      [updateAnimal.rejected]: (state) => {
        state.status = "failed";
      },
      [fetchAnimals.pending]: (state) => {
        state.status = "loading";
      },
      [getAnimal.pending]: (state) => {
        state.status = "loading";
      },
      [saveAnimal.pending]: (state) => {
        state.status = "loading";
      },
      [updateAnimal.pending]: (state) => {
        state.status = "loading";
      },
    },
});
  
export default animalSlice.reducer;
  
export const { 
    selectAll: selectAllAnimals, 
    selectById: selectAnimalsById 
} = animalAdapter.getSelectors((state) => state.animals);