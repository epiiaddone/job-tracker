import styled from 'styled-components';
import FormRow from "../../components/FormRow";
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import {clearValues, handleJobChange, createJob, editJob} from '../../features/job/jobSlice';
import { useEffect } from 'react';
import { getJobsFromLocalStorage, addJobsToLocalStorage } from '../../utils/localStorage';
import {v4 as uuidv4} from 'uuid';
import { jobsData } from '../../utils/jobs';
import { addJobNoAPI, editJobNoAPI, getAllJobsNoAPI } from '../../features/allJobs/allJobsSlice';

const AddJob = ()=>{
  const {user} = useSelector((store)=>store.user);
    const  {
        isLoading,
        position,
        company,
        jobLocation,
        jobTypeOptions,
        jobType,
        statusOptions,
        status,
        isEditing,
        editJobId,
    } = useSelector((store)=>store.job);

    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!position || !company || !jobLocation){
            toast.error('Please fill out all fields');
            return;
        }
        const _id = uuidv4();
        const createdAt = new Date().toUTCString();
        const allJobs = getJobsFromLocalStorage() || jobsData;

        dispatch(getAllJobsNoAPI());

        if(isEditing){

          /*
          dispatch(editJob({
            jobId:editJobId,
            job: {position, company, jobLocation, jobType, status}
          }))
          */

          dispatch(editJobNoAPI({
            editJobId, position, company, jobLocation, jobType, status}
            ))
          return;
        } 

        dispatch(addJobNoAPI(
          {_id,position,company,jobLocation,jobType, createdAt,status})
        );

        dispatch(clearValues());


        //addJobsToLocalStorage([...allJobs,
          //{_id,position,company,jobLocation,jobType,createdAt,status}])

        //dispatch(createJob({position,company,jobLocation,jobType,status}))
    }

    const handleJobInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleJobChange({name,value}));
    }

    useEffect(()=>{
      if(!isEditing){
        clearValues();
        dispatch(handleJobChange({
          name: 'jobLocation',
          value: user.location,
        }))
      }
    },[])

    return(
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        value={position}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        name="company"
                        value={company}
                        onChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        name="jobLocation"
                        labelText="job location"
                        value={jobLocation}
                        onChange={handleJobInput}
                    />
                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                     <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-block clear-btn"
                            onClick={()=>dispatch(clearValues())}
                        >
                            clear
                        </button>
                        <button
                            type="button"
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )

}


const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default AddJob;