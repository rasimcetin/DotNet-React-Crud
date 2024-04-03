import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

export type TodoItem = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdDate: Date;
  updatedDate: Date;
};

export type NewTodoItem = {
  title: string;
  isCompleted: boolean;
};

interface TodoState {
  todos: TodoItem[];
  status: "idle" | "loading" | "successed" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export const postTodo = createAsyncThunk(
  "todos/postTodo",
  async (data: NewTodoItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7125/api/todos",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (data: TodoItem, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://localhost:7125/api/todos/" + data.id,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "https://localhost:7125/api/todos/" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://localhost:7125/api/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "successed";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(postTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postTodo.fulfilled, (state) => {
      state.status = "successed";
    });
    builder.addCase(postTodo.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = "successed";
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
    builder.addCase(updateTodo.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.status = "successed";
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.status = "failed";
    });
  },
  reducers: {
    // addTodo: (state, action: PayloadAction<TodoItem>) => {
    //   state.todos.push(action.payload);
    // },
    // updateTodo: (state, action: PayloadAction<TodoItem>) => {
    //   const index = state.todos.findIndex(
    //     (todo) => todo.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.todos[index] = action.payload;
    //   }
    // },
    // deleteTodo: (state, action: PayloadAction<string>) => {
    //   const index = state.todos.findIndex((todo) => todo.id === action.payload);
    //   if (index !== -1) {
    //     state.todos.splice(index, 1);
    //   }
    // },
    // getTodos: (state) => {
    //   state.todos = [...state.todos];
    // },
  },
});

// export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todoReducer;
export default todoSlice.reducer;
