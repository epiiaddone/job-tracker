import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { getJobsFromLocalStorage } from '../../utils/localStorage';
import { jobsData } from '../../utils/jobs';
import { defaultMonthlyApplications } from '../../utils/defaultMonthyApplications';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFilterState = {
    search:'',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest','oldest','a-z','z-a']
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 12,
    numOfPages: 2,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFilterState,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers:{
        //these expose state to other parts of the app
        showLoading: (state)=>{
            state.isLoading = true;
        },
        hideLoading: (state) =>{
            state.isLoading = false;
        },
        handleChange: (state, {payload: {name, value}})=>{
            state.page = 1;
            state[name]=value;
        },
        clearFilters: (state)=>{
            return{...state, ...initialFilterState}
        },
        changePage: (state, {payload})=>{
            state.page = payload;
        },
        clearAllJobsState: state=>initialState,
        deleteJobNoAPI: (state, {payload})=>{
            state.isLoading=true;
            const currentJobs = state.jobs;
            const newJobs = [];
            currentJobs.forEach(job=>{
                if(job._id!==payload) newJobs.push(job)
            })
            state.jobs=newJobs;
            state.isLoading=false;
        },
        getAllJobsNoAPI: (state)=>{
            state.isLoading = true;
            if(state.jobs.length===0) state.jobs = jobsData;
            state.isLoading = false;
            return;
        },
        addJobNoAPI: (state, {payload})=>{
            state.jobs.push(payload)
            toast.success(`Job Created`);
        },
        editJobNoAPI: (state, {payload})=>{
            state.jobs.forEach(job=>{
                if(job._id === payload.editJobId){
                    job.position = payload.position;
                    job.status = payload.status;
                    job.jobType = payload.jobType;
                    job.jobLocation = payload.jobLocation;
                    job.company = payload.company;
                }
            })
            toast.success('Changes Saved')
        },
        showStatsNoAPI: (state)=>{
            state.stats = {pending:24, interview:8, declined:6};
            state.monthlyApplications = defaultMonthlyApplications;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getAllJobs.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllJobs.fulfilled, (state,action) => {
            state.isLoading = false;
            state.jobs = action.payload.jobs;
            state.numOfPages = action.payload.numOfPages;
            state.totalJobs = action.payload.totalJobs;
        }).addCase(getAllJobs.rejected,  (state,action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(showStats.pending, (state) => {
            state.isLoading = true;
        }).addCase(showStats.fulfilled, (state,action) => {
            state.isLoading = false;
            state.stats = action.payload.defaultStats;
            state.monthlyApplications = action.payload.monthlyApplications;
        }).addCase(showStats.rejected,  (state,action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
})

export const {
    showLoading,
    hideLoading,
    deleteJobNoAPI,
    getAllJobsNoAPI,
    addJobNoAPI,
    editJobNoAPI,
    showStatsNoAPI,
    handleChange,
    clearFilters ,
    changePage,
clearAllJobsState  } = allJobsSlice.actions;

export default allJobsSlice.reducer;