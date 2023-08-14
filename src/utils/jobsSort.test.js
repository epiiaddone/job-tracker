import { latestSort, positionSort } from "./jobsSort";

test("latestSort should sort with latest date first", ()=>{
    const testArray = [
        {createdAt:'Fri, 16 Jun 2023 05:59:25 GMT'},
        {createdAt:'Thur, 15 Jun 2023 05:59:25 GMT'},
        {createdAt:'Fri, 16 Jun 2023 07:59:25 GMT'},
        {createdAt:'Sat, 17 Jun 2023 05:59:25 GMT'},
        {createdAt:'Sun, 20 Jun 2021 05:59:25 GMT'},
        {createdAt:'Tue, 31 May 2022 05:59:25 GMT'}
        ]
    const result = testArray.sort(latestSort);
    expect(result).toStrictEqual([
        {createdAt:'Sat, 17 Jun 2023 05:59:25 GMT'},
        {createdAt:'Fri, 16 Jun 2023 07:59:25 GMT'}, 
        {createdAt:'Fri, 16 Jun 2023 05:59:25 GMT'},
        {createdAt:'Thur, 15 Jun 2023 05:59:25 GMT'},
        {createdAt:'Tue, 31 May 2022 05:59:25 GMT'},
        {createdAt:'Sun, 20 Jun 2021 05:59:25 GMT'},
    ])
})

test("positionSort should sold in alphabetical order", ()=>{
    const testArray = [
        {position:'Chemical Engineer'},
        {position:'zEngineer'},
        {position:'a Engineer'},
        {position:'DDD class 45'},
        {position:'soft 56'},
    ]
    const result = testArray.sort(positionSort);
    expect(result).toStrictEqual([
        {position:'a Engineer'},
        {position:'Chemical Engineer'},
        {position:'DDD class 45'},
        {position:'soft 56'},
        {position:'zEngineer'}
    ])
})