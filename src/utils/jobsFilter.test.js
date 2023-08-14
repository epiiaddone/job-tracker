import { typePredicate, statusPredicate } from "./jobsFilter"

test("typePredicate for 'all' should return the full list",()=>{
    let testArray=[
        {id: 1, jobType:'part-time'},
        {id: 2, jobType:'full-time'},
        {id: 3, jobType:'remote'},
        {id: 4, jobType:'intership'},
        {id: 5, jobType:'part-time'},
    ]
    let result = testArray.filter((job)=>typePredicate(job,'all'));
    expect(result.length).toBe(testArray.length);
})

test("typePredicate for 'part-time' should remove all that are not jobType:'part-time",()=>{
    let testArray=[
        {id: 1, jobType:'part-time'},
        {id: 2, jobType:'full-time'},
        {id: 3, jobType:'remote'},
        {id: 4, jobType:'intership'},
        {id: 5, jobType:'part-time'},
    ]
    let result = testArray.filter((job)=>typePredicate(job,'part-time'));
    expect(result.length).toBe(2);
})

test("typePredicate for 'full-time' should remove all that are not jobType:'full-time",()=>{
    let testArray=[
        {id: 1, jobType:'part-time'},
        {id: 2, jobType:'full-time'},
        {id: 3, jobType:'remote'},
        {id: 4, jobType:'intership'},
        {id: 5, jobType:'part-time'},
    ]
    let result = testArray.filter((job)=>typePredicate(job,'full-time'));
    expect(result.length).toBe(1);
})

test("typePredicate for 'remote' should remove all that are not jobType:'remote",()=>{
    let testArray=[
        {id: 1, jobType:'part-time'},
        {id: 2, jobType:'full-time'},
        {id: 3, jobType:'remote'},
        {id: 4, jobType:'intership'},
        {id: 5, jobType:'part-time'},
    ]
    let result = testArray.filter((job)=>typePredicate(job,'remote'));
    expect(result.length).toBe(1);
})

test("typePredicate for 'internship' should remove all that are not jobType:'internship",()=>{
    let testArray=[
        {id: 1, jobType:'part-time'},
        {id: 2, jobType:'full-time'},
        {id: 3, jobType:'remote'},
        {id: 4, jobType:'internship'},
        {id: 5, jobType:'part-time'},
    ]
    let result = testArray.filter((job)=>typePredicate(job,'internship'));
    expect(result.length).toBe(1);
})

test("statusPredicate for 'all' should return the full list",()=>{
    let testArray=[
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
    ]
    let result = testArray.filter((job)=>statusPredicate(job,'all'));
    expect(result.length).toBe(testArray.length);
})

test("typePredicate for 'declined' should remove all that are not jobStatus:'declined",()=>{
    let testArray=[
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
    ]
    let result = testArray.filter((job)=>statusPredicate(job,'declined'));
    expect(result.length).toBe(1);
})

test("statusPredicate for 'interview' should remove all that are not jobStatus:'interview",()=>{
    let testArray=[
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
    ]
    let result = testArray.filter((job)=>statusPredicate(job,'interview'));
    expect(result.length).toBe(2);
})

test("statusPredicate for 'pending' should remove all that are not jobStatus:'pending",()=>{
    let testArray=[
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
    ]
    let result = testArray.filter((job)=>statusPredicate(job,'pending'));
    expect(result.length).toBe(2);
})