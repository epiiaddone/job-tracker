export const addUserToLocalStorage = (user) =>{
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () =>{
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () =>{
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
}

export const addJobsToLocalStorage = (jobs)=>{
    localStorage.setItem('jobs',JSON.stringify(jobs));
}

export const removeJobsFromLocalStorage = ()=>{
    localStorage.removeItem('jobs');
}

export const getJobsFromLocalStorage = () =>{
    const jobsResult = localStorage.getItem('jobs');
    const jobs = jobsResult ? JSON.parse(jobsResult) : null;
    return jobs;
}