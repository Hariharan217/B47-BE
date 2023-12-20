
function checkingdate(array, object) {

    let booking = true;
    for (let i = 0; i < array.length; i++) {

        let userstartdate = object.startdate
        let userenddate = object.enddate
        let arraystartdate = array[i].startdate
        let arrayenddate = array[i].enddate


        if (userstartdate < arraystartdate && userenddate < arraystartdate) {
            console.log("booking")
        } else if (userstartdate > arrayenddate && userenddate > arrayenddate) {
            console.log("booking")
        } else {
            booking = false;
        }
    }

    return booking

}

module.exports = checkingdate;