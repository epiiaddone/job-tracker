import styled from 'styled-components';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import {useSelector, useDispatch} from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';
import {useState, useMemo} from 'react';

const SearchContainer = ()=>{
    const {isLoading, search, searchStatus, searchType, sort, sortOptions}
    = useSelector(store=>store.allJobs);
    
    const {jobTypeOptions, statusOptions} = useSelector(store=>store.job);

    const [localSearch, setLocalSearch] = useState('');

    const dispatch = useDispatch();

    const debounce = ()=>{
      let timeoutId;
      return (e)=>{
        clearTimeout(timeoutId)
        setLocalSearch(e.target.value)
        timeoutId = setTimeout((e)=>{
          console.log(e)
        dispatch(handleChange({name: e.target.name, value: e.target.value}));
        },1000)
      }
    }
const optimizedDebounce = useMemo(()=>debounce(),[])


    const handleSearch = (e)=>{
        const name= e.target.name;
        const value = e.target.value;
        dispatch(handleChange({name, value}));
    };


    const handleSubmit = (e)=>{
        e.preventDefault();
        setLocalSearch('')
        dispatch(clearFilters());
    }
return(
    <Wrapper>
        <form className="form">
            <h4>search</h4>
            <div className="form-center">
                <FormRow
                    type="text"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                />
                <FormRowSelect
                    labelText="status"
                    name="searchStatus"
                    value={searchStatus}
                    handleChange={handleSearch}
                    list={['all', ...statusOptions]}
                />
                <FormRowSelect
                    labelText="type"
                    name="searchType"
                    value={searchType}
                    handleChange={handleSearch}
                    list={['all', ...jobTypeOptions]}
                />
                 <FormRowSelect
                    name="sort"
                    value={sort}
                    handleChange={handleSearch}
                    list={sortOptions}
                />
                <button
                    className="btn btn-block btn-danger"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >clear filters</button>

            </div>
        </form>
    </Wrapper>
)
}



const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`


export default SearchContainer;