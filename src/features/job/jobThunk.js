import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';
import { logoutUser } from '../user/userSlice';
import { authHeader } from '../../utils/authHeader';

//these change the state in allJobsSlice
import {showLoading, hideLoading, getAllJobs} from '../allJobs/allJobsSlice';


export const createJobThunk = async (job,thunkAPI)=>{
    //console.log('createJob()')
    try{
        const resp = await customFetch.post('/jobs',job);
        thunkAPI.dispatch(clearValues());
        return resp.data;
    }catch(error){
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}


export const deleteJobThunk = async (jobId, thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try{
        const resp = await customFetch.delete(`/jobs/${jobId}`);
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
    }catch(error){
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
    }


export const editJobThunk = async({jobId,job}, thunkAPI)=>{
    try{
        const resp = await customFetch.patch(`/jobs/${jobId}`, job)
        thunkAPI.dispatch(clearValues());
        return resp.data;
    }catch(error){
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}