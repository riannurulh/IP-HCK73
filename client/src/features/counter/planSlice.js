import { createSlice } from "@reduxjs/toolkit";
import PostCreate from "../../helpers/PostRequest";

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    // `list` property to store the list of movies from `/pub/movies`
    data:[],
    // `detail` property to store the detail of a movie from `/pub/movies/:id`
    detail: {},
  },
  reducers: {
    setPlans: (state, action) => {
      
      state.data = action.payload;
    },
  },
});

export const { setPlans } = planSlice.actions;

export const fetchPlans = () => {
  return async (dispatch) => {
    const { data } = await PostCreate({
      url: "/plans",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(data);
    
    dispatch(setPlans(data));
  };
};
export const deletePlan = (id) => {
  return async (dispatch) => {
    await PostCreate({
      url: `/plans/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(fetchPlans());
  };
};

export default planSlice.reducer;
