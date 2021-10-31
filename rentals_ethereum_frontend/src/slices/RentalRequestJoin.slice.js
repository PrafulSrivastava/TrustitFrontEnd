import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, FETCH_OWNER_RENTAL_REQUEST_JOIN} from "../services/api";

export const fetchOwnerRentalRequestsJoin = createAsyncThunk(FETCH_OWNER_RENTAL_REQUEST_JOIN, async (params, {dispatch}) => {
    dispatch(toggleLoading());

    const response = await api.get(FETCH_OWNER_RENTAL_REQUEST_JOIN);
    console.log(">>response", response.data)
    return response.data;
});



const rentalRequestSlice = createSlice({
    name: 'rentalRequest',
    initialState: {
        loading: false,
        ownerRentalRequests: null,
        tenantRentalRequests: null
    },
    reducers: {
        toggleLoading: state => {
            state.loading = !state.loading;
        }
    },
    extraReducers: {

        [fetchOwnerRentalRequestsJoin.fulfilled]: (state, action) => {
            state.loading = false;
            state.ownerRentalRequests = action.payload?.data;
            state.tenantRentalRequests = action.payload?.data;
        },
    }
});

export const {toggleLoading} = rentalRequestSlice.actions;
export default rentalRequestSlice.reducer;
