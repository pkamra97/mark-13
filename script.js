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

// var  date= { 
//     day:8,
//     month:8,
//     year:2021,
// }

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

function checkPalindronesForAlldateFormats(date)
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

function getNextPalindroneDate(date)
{
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

// 15-08-2021  , 28-02-2020 , 31-12-2021
// console.log(getNextDate(date));
// working for leap year

// getting next palindrone date here
// console.log(getNextPalindroneDate(date));
// o/p--->  1202 2021   for 31-12-2020
// o/p--->  12 11 2021  for 08-08-2021


// final wiring 

const inputKey=document.querySelector("#input");
const outputKey=document.querySelector("#output");
const btnKey=document.querySelector("#btn");


function clickHandler(e)
{
    console.log(inputKey.value);
    
    var dateStr=inputKey.value;
    if(dateStr!=="")
    {
        var listOfDates=dateStr.split('-');
        console.log(listOfDates);
        var date={day:Number(listOfDates[2]),month:Number(listOfDates[1]),year:Number(listOfDates[0])};
       
        console.log(date);

        var ispal=checkPalindronesForAlldateFormats(date);
        console.log(ispal);

        if(ispal)
        {
            outputKey.innerText="Yay!!! you have a Palindrome BirthDay ????????????????";
        }
        else
        {
            var [days,nextpal]=getNextPalindroneDate(date);
            outputKey.innerText=`Next Palindrone date is
            ${nextpal.day}, ${nextpal.month} , ${nextpal.year} , 
            You missed it by ${days} days ???????? 
            Better luck next Life ????????????`;
        }
    }
    else{
        outputKey.innerText="Please enter Your birthday????????????";
    }
}

btnKey.addEventListener('click',clickHandler);