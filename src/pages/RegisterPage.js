import { useState, useEffect } from "react";
import styled from 'styled-components'
import {toast} from 'react-toastify';

import Logo from '../components/Logo';
import FormRow from '../components/FormRow';

import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";

const intialState = {
    name:'',
    email:'',
    password:'',
    isMember: true,
};

const RegisterPage = () => {
    const [formValues, setFormValues] = useState(intialState);
    const {user, isLoading} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({...formValues, [name]:value});
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const {name,email,password,isMember} = formValues;

        if(!email || !password || (!isMember && !name)){
          toast.error('Please fill out all fields')
          return;
        }
        if(isMember){
           dispatch(loginUser({email:email, password:password}));
           return;
        }
        dispatch(registerUser({name,email,password}));
    };

    const toggleMember = () => {
        setFormValues({...formValues, isMember: !formValues.isMember});
    }

    useEffect(()=>{
      if(user){
        setTimeout(navigate('/'),2000)
      }
    },[user])

    return(
        <Wrapper className='full-page'>
            <form className="form" onSubmit={onSubmit}>
                <Logo/>
                <h3>{formValues.isMember ? 'Login' : 'Register'}</h3>
                {!formValues.isMember &&
                <FormRow
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />}
                 <FormRow
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <FormRow
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
                <p>
                    {formValues.isMember? 'Not a member yet?' : 'Already a member?'}
                    <button
                      type="button"
                      onClick={toggleMember}
                      className="member-btn">
                        {formValues.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  `;

export default RegisterPage;