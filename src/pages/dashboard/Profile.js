import styled from 'styled-components';
import {useState} from 'react';
import FormRow from '../../components/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';
import { addUserToLocalStorage } from '../../utils/localStorage';

const Profile = ()=>{
    const {isLoading, user} = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    //why is this not taken from the global store?
    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || ''
    });

    const {name, email, location, lastName} = userData;

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !location || !lastName ){
            toast.error('please fill out all fields')
            return;
        }
        //this is also called in userSlice, but API call blocked
        addUserToLocalStorage(userData);
        dispatch(updateUser({userData}));
    }
    const handleChange = (e)=> setUserData({...userData, [e.target.name]:e.target.value})

    return(
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profiile</h3>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                                        <FormRow
                        type="text"
                        name="lastName"
                        labelText="last name"
                        value={lastName}
                        onChange={handleChange}
                    />
                                        <FormRow
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                                        <FormRow
                        type="text"
                        name="location"
                        value={location}
                        onChange={handleChange}
                    />
                    <button type="sumbit" className="btn btn-block" disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'Save Changes'}
                    </button>
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

export default Profile;