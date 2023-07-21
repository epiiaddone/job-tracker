import styled from 'styled-components';
import StatItem from './StatItem';
import { useSelector } from 'react-redux';
import { defaultStats } from '../utils/defaultStats';



const StatsContainer = ()=>{
    const {stats} = useSelector((store)=>store.allJobs);
    return(
        <Wrapper>
            {defaultStats.map((item,index)=>{
                return <StatItem key={index} {...item}/>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`

export default StatsContainer;