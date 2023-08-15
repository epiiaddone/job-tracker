import { typePredicate, statusPredicate, searchPredicate, paginatePredicate } from "./jobsFilter"

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

test("searchPredicate should return all results for empty string input",()=>{
    let testArray = [
        {position:'Eletrical engineer'},
        {position:'Chemical'},
        {position:'chemical'},
        {position:'zzzzzzzzzz'},
        {position:'AAAAAAAAAA'},
        {position:'Staff Engineer'}
    ]
    let result = testArray.filter((job)=>searchPredicate(job,''));
    expect(result.length).toBe(testArray.length);
})


test("searchPredicate should return all results for white space input",()=>{
    let testArray = [
        {position:'Eletrical engineer'},
        {position:'Chemical'},
        {position:'chemical'},
        {position:'zzzzzzzzzz'},
        {position:'AAAAAAAAAA'},
        {position:'Staff Engineer'}
    ]
    let result = testArray.filter((job)=>searchPredicate(job,'                  '));
    expect(result.length).toBe(testArray.length);
})

test("searchPredicate should be case insensitive, lower case input",()=>{
    let testArray = [
        {position:'Eletrical engineer'},
        {position:'Chemical'},
        {position:'chemical'},
        {position:'zzzzzzzzzz'},
        {position:'AAAAAAAAAA'},
        {position:'Staff Engineer'}
    ]
    let result = testArray.filter((job)=>searchPredicate(job,'a'));
    expect(result.length).toBe(5);
})

test("searchPredicate should be case insensitive, upper case input",()=>{
    let testArray = [
        {position:'Eletrical engineer'},
        {position:'Chemical'},
        {position:'chemical'},
        {position:'zzzzzzzzzz'},
        {position:'AAAAAAAAAA'},
        {position:'Staff Engineer'}
    ]
    let result = testArray.filter((job)=>searchPredicate(job,'A'));
    expect(result.length).toBe(5);
})


test("page 1 should be the first elements", ()=>{
    let testArray1 = [
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
        {id: 6, jobType:'part-time', status:'pending'},
        {id: 7, jobType:'full-time', status:'interview'},
        {id: 8, jobType:'remote', status:'pending'},
        {id: 9, jobType:'intership', status:'interview'},
        {id: 10, jobType:'part-time', status:'declined'}
    ];
    let JOBS_PER_PAGE = 8;
    let page = 1;
    let result1 = testArray1.filter((job,i)=>{paginatePredicate(i,page,JOBS_PER_PAGE)});
    expect(result1).toStrictEqual([
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
        {id: 6, jobType:'part-time', status:'pending'},
        {id: 7, jobType:'full-time', status:'interview'},
        {id: 8, jobType:'remote', status:'pending'},
    ])
})

test("page 2 should be the 2nd set of elements", ()=>{
    let testArray2 = [
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
        {id: 6, jobType:'part-time', status:'pending'},
        {id: 7, jobType:'full-time', status:'interview'},
        {id: 8, jobType:'remote', status:'pending'},
        {id: 9, jobType:'intership', status:'interview'},
        {id: 10, jobType:'part-time', status:'declined'}
    ];
    let JOBS_PER_PAGE = 8;
    let page = 2;
    let result2 = testArray2.filter((job,i)=>{paginatePredicate(i,page,JOBS_PER_PAGE)});
    expect(result2.length).toBe(2)
})

test("all results on page 1 if total elements less that JOBS_PER_PAGE", ()=>{
    let testArray3 = [
        {id: 1, jobType:'part-time', status:'pending'},
        {id: 2, jobType:'full-time', status:'interview'},
        {id: 3, jobType:'remote', status:'pending'},
        {id: 4, jobType:'intership', status:'interview'},
        {id: 5, jobType:'part-time', status:'declined'},
        {id: 6, jobType:'part-time', status:'pending'},
    ];
    let JOBS_PER_PAGE = 8;
    let page = 1;
    let result3 = testArray3.filter((job,i)=>{paginatePredicate(i,page,JOBS_PER_PAGE)});
    expect(result3.length).toBe(6);
})