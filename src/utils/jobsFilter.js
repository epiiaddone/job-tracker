

export const typePredicate = (job, searchType)=>{
    if(searchType==='all') return true;
    return job.jobType===searchType;
  }

  export const statusPredicate = (job, searchStatus)=>{
    if(searchStatus==='all') return true;
    return job.status===searchStatus;
  }

  export const searchPredicate = (job, search)=>{
    const searchString = search.trim().toLowerCase();
    if(searchString==='') return true;
    if(job.position.toLowerCase().indexOf(searchString)>-1) return true;
    return false;
  }

  export const paginatePredicate = (i, page, jobs_per_page)=>{
    return (i<page*jobs_per_page && i >= (page-1)*jobs_per_page)
  }
