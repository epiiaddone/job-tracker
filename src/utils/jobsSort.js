
export const latestSort = (jobA, jobB)=>{
    const dateA = Date.parse(jobA.createdAt);
    const dateB = Date.parse(jobB.createdAt);
    if(dateA > dateB) return -1;
    if(dateA < dateB) return 1;
    return 0;
  }


  export const positionSort = (jobA,jobB)=>{
    if(jobA.position.toLowerCase() < jobB.position.toLowerCase()) return -1;
    if(jobA.position.toLowerCase() > jobB.position.toLowerCase()) return 1;
    return 0;
  }