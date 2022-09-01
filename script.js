function reverseStr(str)
{
    // var listOfChar=str.split(''); //['h','e','l','l','o']
    // var reversedListOfChar=listOfChar.reverse();
    // var revStr=reversedListOfChar.join('');

    // return revStr;

    //one line code for this
    
    //  this works fine too
    return str.split('').reverse().join("");
}

function isPalindrone(strr)
{
    var reverse=reverseStr(strr);
    // if(strr===reverse)
    // {// console.log(strr+ " is a palindrone");
    //     return true;
    // }
    // //console.log(strr+ ' is not a palindrone');
    // return false;

    // optimized in one line

    return strr===reverse;
}

// console.log(reverseStr("hello"));
// console.log(isPalindrone("racecar"));
// console.log(isPalindrone("oppo"));
// console.log(isPalindrone("mom"));
// console.log(isPalindrone("jethalal")); 

// all the console logs are working here  

function convertDateToString(date)
{
    var dateStr={day:"",month:"",year:""};
    if(date.day<10){  dateStr.day='0'+date.day;  }
    // when we add a string + number it will give us a string jS will typecast
    //the number into a string and hence the result we will receive 
    //is also a string
    else{  dateStr.day=date.day.toString();  }

    // for month same code
    if(date.month<10){  dateStr.month='0'+date.month;  }
    else{  dateStr.month=date.month.toString();  }

    dateStr.year=date.year.toString();

    return dateStr;
}
var  date= { 
    day:28,
    month:2,
    year:2020,
}

// console.log(convertDateToString(date));

function getAllFormats(date)
{
    var dateStr=convertDateToString(date);
    
    var ddmmyyyy= dateStr.day + dateStr.month +dateStr.year;
    var mmddyyyy= dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd= dateStr.year + dateStr.month +dateStr.day ;
    var ddmmyy= dateStr.day + dateStr.month +dateStr.year.slice(-2);
    var mmddyy=dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2) + dateStr.month +dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}


// console.log(getAllFormats(date));

function checkPalindronesForAlldateFormats()
{
    var listOfPlaindrones=getAllFormats(date);
    var flag=false;
     
    for(let i =0;i<listOfPlaindrones.length;i++)
    {
       if(isPalindrone(listOfPlaindrones[i]))
       {
        flag=true;
        break;
       } 
    }
    return flag;
} 

// console.log(checkPalindronesForAlldateFormats(date));

function isLeapYear(year)
{
    if(year%400===0){  return true; }
    if(year%100===0){  return false; }
    if(year%4===0){  return true; }
    return false;
}

function getNextDate(date)
{  var day= date.day+1;  //increment the day to next day;
    var month=date.month;
    var year=date.year;
    var daysIsMonth=[31,28,31,30,31,30,31,31,30,31,30,31]; 
     // 0 1 2 3 4 5 6 7 8 9 10 11 12  month-1

    if(month===2){//check for feburary leap year
       if(isLeapYear(year)) // check for leap year  
       {   
          if(day>29)
            {
            day=1;month++;
            }
           else
            {
            if(day>28){day=1;month++;}
            }
       }

    }
    else{
        // check if days exceed in a month 
        if(day>daysIsMonth[month-1])
        {
            day=1;
            month++;
        }
    }
    if(month>12)
    {
        month=1;year++;
    }
    return {day:day,
    month:month,
    year:year};
}




function getNextPalindroneDate(date){
    var ctr=0;
    var nextDate=getNextDate(date); 

    while(1)
    {
        ctr++;
        var isPalindrome = checkPalindronesForAlldateFormats(nextDate);
        if(isPalindrome){
            break;
        }

        nextDate=getNextDate(nextDate);
    }

    return [ctr,nextDate];
}


// console.log(isLeapYear(2020));  //leap year
// console.log(isLeapYear(2023));  // not a leap year

console.log(getNextDate(date));
// working for leap year

console.log(getNextPalindroneDate(date));