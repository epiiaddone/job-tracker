

export const typePredicate = (job, searchType)=>{
    if(searchType==='all') return true;
    return job.jobType===searchType;
  }

  export const statusPredicate = (job, searchStatus)=>{
    if(searchStatus==='all') return true;
    return job.status===searchStatus;
  }