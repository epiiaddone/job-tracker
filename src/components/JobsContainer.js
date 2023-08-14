import styled from 'styled-components';
import {useEffect} from 'react';
import Job from './Job';
import {useSelector, useDispatch} from 'react-redux';
import Loading from './Loading';
import { JOBS_PER_PAGE, getAllJobs, getAllJobsNoAPI } from '../features/allJobs/allJobsSlice';
import { getJobsFromLocalStorage } from '../utils/localStorage';
import { jobsData } from '../utils/jobs';
import PageBtnContainer from './PageBtnContainer';
import { latestSort, positionSort } from '../utils/jobsSort';
import { statusPredicate, typePredicate } from '../utils/jobsFilter';

const JobsContainer = ()=>{
    const {jobs, isLoading, page,
    search, searchStatus, searchType,sort} = useSelector((store)=>store.allJobs);

    const dispatch = useDispatch();

    //const localStorageJobs = getJobsFromLocalStorage() || jobsData;

    useEffect(()=>{        
        dispatch(getAllJobsNoAPI());
    },[])

    if(isLoading) return <Loading center/>   

      const searchPredicate = (job)=>{
        const searchString = search.trim().toLowerCase();
        if(searchString==='') return true;
        if(job.position.toLowerCase().indexOf(searchString)>-1) return true;
        return false;
      }

      const paginatePredicate = (i)=>{
        return (i<page*JOBS_PER_PAGE && i >= (page-1)*JOBS_PER_PAGE)
      } 

    let filteredJobs = jobs
      .filter((job)=>typePredicate(job, searchType))
      .filter((job)=>statusPredicate(job, searchStatus))
      .filter((job)=>searchPredicate(job));

    switch(sort){
      case 'latest': filteredJobs.sort(latestSort); break;
      case 'oldest': filteredJobs.sort(latestSort).reverse(); break;
      case 'a-z': filteredJobs.sort(positionSort); break;
      case 'z-a': filteredJobs.sort(positionSort).reverse(); break;
    }

    let paginatedJobs = filteredJobs.filter((job,i)=>paginatePredicate(i));

    if(paginatedJobs.length===0){
      return(
          <Wrapper>
              <h2>No jobs to display</h2>
          </Wrapper>
      )
  }

    return(
        <Wrapper>
            <h5>{filteredJobs.length} {filteredJobs.length > 1 ? 'jobs' : 'job'}</h5>
            <div className='jobs'>
                {paginatedJobs.map((job)=>{
                    //console.log(job)
                    return <Job key={job._id} {...job}/>
                })
                }
            </div>
            {Math.ceil(filteredJobs.length / JOBS_PER_PAGE) > 1 && <PageBtnContainer/>}
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