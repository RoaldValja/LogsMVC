exports.getTodayDateAndTime = function(){
    let today = new Date();

    //Object literal
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let day = today.toLocaleDateString('en-US', options);
    return day;
}

exports.getDateAndTimeLog = function(username){
    let date = new Date();
    let seconds = date.getSeconds();
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let hours = date.getHours();
    if(hours < 10){
        hours = "0" + hours;
    }
    let days = date.getDate();
    let months = date.getMonth();
    months = months+1;
    if(months < 10){
        months = "0" + months;
    }
    let year = date.getFullYear();
    let log = `User ${username} logged in at ${hours}:${minutes}:${seconds} on ${days}/${months}/${year}.`;
    return log;
}