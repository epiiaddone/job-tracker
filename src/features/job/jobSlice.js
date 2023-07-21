import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';



const initialState = {
    isLoading:false,
    position:'',
    company:'',
    jobLocation:'',
    jobTypeOptions:['full-time','part-time','remote','internship'],
    jobType:'full-time',
    statusOptions:['interview','declined','pending'],
    status:'interview',
    isEditing:false,
    editJobId:''
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob  = createAsyncThunk('job/editJob', editJobThunk);

const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleJobChange: (state,{payload:{name,value}})=>{
            state[name] = value;
        },
        clearValues:()=>{
            return {...initialState,
                jobLocation: getUserFromLocalStorage()?.location || ''}
        },
        setEditJob: (state,{payload})=>{
            return{...state, isEditing: true, ...payload}
        },
        setAddJob: (state)=>{
            state.isEditing = false;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(createJob.pending, (state) => {
            state.isLoading = true;
        }).addCase(createJob.fulfilled, (state) => {
            state.isLoading = false;
            toast.success(`Job Created`);
        }).addCase(createJob.rejected,  (state,action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(deleteJob.rejected,  (state,action) => {
            toast.error(action.payload);
        }).addCase(editJob.pending, (state) => {
            state.isLoading = true;
        }).addCase(editJob.fulfilled, (state) => {
            state.isLoading = false;
            toast.success(`Saved Changes`);
        }).addCase(editJob.rejected,  (state,action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
});

export const {handleJobChange, clearValues, setEditJob, setAddJob} = jobSlice.actions;

export default jobSlice.reducer;