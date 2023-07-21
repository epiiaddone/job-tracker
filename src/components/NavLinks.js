import { NavLink } from "react-router-dom";
import links from '../utils/links';
import { useDispatch } from "react-redux";
import { setAddJob } from "../features/job/jobSlice";
import { clearValues } from "../features/job/jobSlice";

const NavLinks  = ({toggle})=>{
    const dispatch = useDispatch();

    const linkClick = (path)=>{
        toggle();
        if(path==='add-job'){
            dispatch(clearValues());
            dispatch(setAddJob())
        }
    }

    if(!toggle) toggle = ()=>{}
    return(
        <div className="nav-links">
        {links.map((link)=>{
        const{text,id,path,icon} = link;
        return(
            <NavLink
            to={path}
            className={({isActive})=>{
                return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={()=>linkClick(path)}
            >
                <span className="icon">{icon}</span>
                {text}
            </NavLink>
        )
        })}
    </div>
    )
}

export default NavLinks;