import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import { registerUserThunk, loginUserThunk, clearStoreThunk, updateUserThunk } from './userThunk';


const initialState = {
    isLoading: false,
    isSideBarOpen:false,
    user: getUserFromLocalStorage() || {name:'Mark', location:'Oxford', lastName:'Williams', email:'mail@test.com'},
}

export const registerUser = createAsyncThunk('user/registerUser', registerUserThunk);

export const loginUser = createAsyncThunk('user/loginUser', loginUserThunk);

export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk);


export const clearStore = createAsyncThunk('/user/clearStore',clearStoreThunk);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        toggleSideBar:(state)=>{
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        logoutUser: (state,{payload})=>{
            state.user=null;
            state.isSideBarOpen=false;
            removeUserFromLocalStorage();
            if(payload) toast.success(payload);
        },
        updateUserNoAPI: (state, {payload})=>{
            state.user=payload.tempUserData;
            console.log(payload);
            addUserToLocalStorage(payload.tempUserData);
        },
        registerUserNoAPI:(state, {payload})=>{
            state.user = payload;
            toast.success(`Hello There ${state.user.name}`);
            addUserToLocalStorage(state.user);
        },
        loginUserNoAPI:(state, {payload})=>{
            const currentUser = getUserFromLocalStorage();
            if(payload.email===currentUser.email){
               toast.success(`Welcome Back ${state.user.name}`);
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            toast.success(`Hello There ${state.user.name}`);
            addUserToLocalStorage(state.user);
        }).addCase(registerUser.rejected,  (state,action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            toast.success(`Welcome Back ${state.user.name}`);
            addUserToLocalStorage(state.user);
        }).addCase(loginUser.rejected, (state, action)=> {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            toast.success(`User Updated`);
            addUserToLocalStorage(state.user);
        }).addCase(updateUser.rejected, (state, action)=> {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(clearStore.rejected, ()=>{
            toast.error('There was an error...')
        })
    }
});

export const {
    toggleSideBar,
    logoutUser,
    updateUserNoAPI,
    registerUserNoAPI
} = userSlice.actions;
export default userSlice.reducer;