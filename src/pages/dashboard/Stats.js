import {useEffect} from 'react';
import StatsContainer from '../../components/StatsContainer';
import ChartsContainer from '../../components/ChartsContainer';
import Loading from '../../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import { showStats, showStatsNoAPI } from '../../features/allJobs/allJobsSlice';

const Stats = ()=>{
    const {isLoading, monthlyApplications} = useSelector((store)=>store.allJobs);
    const dispatch  = useDispatch();

    useEffect(()=>{
        dispatch(showStatsNoAPI());
        //dispatch(showStats())
    },[])

    return(
    <>
        <StatsContainer />
        {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
    )
}

export default Stats;