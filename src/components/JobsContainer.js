import styled from 'styled-components';
import {useEffect} from 'react';
import Job from './Job';
import {useSelector, useDispatch} from 'react-redux';
import Loading from './Loading';
import { getAllJobs, getAllJobsNoAPI } from '../features/allJobs/allJobsSlice';
import { getJobsFromLocalStorage } from '../utils/localStorage';
import { jobsData } from '../utils/jobs';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = ()=>{
    const {jobs, isLoading, page, numOfPages, totalJobs,
    search, searchStatus, searchType,sort} = useSelector((store)=>store.allJobs);

    const dispatch = useDispatch();

    //const localStorageJobs = getJobsFromLocalStorage() || jobsData;

    useEffect(()=>{        
        dispatch(getAllJobsNoAPI());
    },[search,searchStatus,searchType,sort])

    if(isLoading) return <Loading center/>   

    if(jobs.length===0){
        return(
            <Wrapper>
                <h2>No jobs to display</h2>
            </Wrapper>
        )
    }

    return(
        <Wrapper>
            <h5>{totalJobs} {totalJobs > 1 ? 'jobs' : 'job'}</h5>
            <div className='jobs'>
                {jobs.map((job)=>{
                    //console.log(job)
                    return <Job key={job._id} {...job}/>
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer/>}
        </Wrapper>
    )

}



const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`

export default JobsContainer;