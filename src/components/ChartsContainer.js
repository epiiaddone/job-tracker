import styled from 'styled-components';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import AreaChartComponent from './AreaChartComponent';
import BarChartComponent from './BarChartComponent';

const ChartsContainer = ()=>{
    const [barChart, setBarChart] = useState(true);
    
    const {monthlyApplications: data} = useSelector((store)=>store.allJobs)
    return(
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button
                type='button'
                onClick={()=>setBarChart(false)}
                disabled={!barChart}
                className={barChart ? "" : "btn-show"}
                >
                Area Chart
            </button>
            /
            <button
                type='button'
                onClick={()=>setBarChart(true)}
                disabled={barChart}
                className={barChart ? "btn-show" : ""}
                >
                Bar Chart
            </button>
            {barChart ? <BarChartComponent data={data}/> : <AreaChartComponent data={data}/>}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
  .btn-show{
    cursor: auto;
    font-weight: bold;
  }
`

export default ChartsContainer;