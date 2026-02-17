/*
* Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
* */

console.log (
    Date.UTC(), // NaN
    Date.UTC(2017,1,11,23,53), // 1486857180000
    Date.now(), // 1515711487660
    new Date(Date.now()), //2018-01-11T22:58:56.332Z
);