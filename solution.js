const utils = require('./utils');
const itemArray = utils.loadJson();
const fetchData=require('./FetchData');


/**Function with 
 * main business logic
 */
async function printAvailableTrucks(){
    let url=itemArray[0];
    let timestamp=itemArray[1];

    //check if url not available or timestamp is empty
    if(url=='' || timestamp==''){
        console.log('N/A');
        return;
    }

    //check if timestamp is valid:
    if(! (new Date(parseFloat(timestamp))).getTime() > 0){
        //invalid timestamp:
        console.log('N/A');
        return;
    }

    //call fetchdata to get all truck data
    fetchData(url,function(err,data){

        if(err){
            //if error fetching data return
            console.log('N/A');
            return;
        }

        let timestamp = itemArray[1];

        //convert to date timestamp to time and day:
        let dayTime=getDayAndTime(timestamp);

        var foodTruckNamesCheck={};
        var foodTruckNames = [];

        const listOfTrucks=JSON.parse(data);

        //iterate over all the trucks and filter out the available ones:
        listOfTrucks.map((truck,i)=>{

            let truckStart = Date.parse('01/01/2020 ' + truck.start24)
            let truckEnd = Date.parse('01/01/2020 ' + truck.end24)
            let matchTime = Date.parse('01/01/2020 ' + dayTime.time)
            let truckDay=truck.DayOfWeekStr;

            //if dayTime lies between truck starttime and endtime and day matches:
            if (matchTime > truckStart && matchTime < truckEnd && truckDay.toLocaleLowerCase() == dayTime.day.toLocaleLowerCase()){

                if (!foodTruckNamesCheck[truck.Applicant]){
                    //record this truck as added
                    foodTruckNamesCheck[truck.Applicant]=true;
                    //add truck names to the array
                    foodTruckNames.push(truck.Applicant);
                }
            }
        });

        if(foodTruckNames.length==0){
            console.log('N/A');
            return;
        }
        //sort the truck names
        foodTruckNames.sort();

        //print the truck names
        foodTruckNames.forEach((truckName)=>{
            console.log(truckName);
        });
    });  
}


/**Function to return
 * day and time object
 * paramters: s -> string (timestamp)
 */
function getDayAndTime(s){

    let dayFormat=new Intl.DateTimeFormat('en-GB',{weekday:'long',timeZone:"UTC"});
    let timeFormat = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short', timeZone: "UTC",hour12:false });

    //return object with day and time in respective formats
    return { 'day': dayFormat.format(new Date(s * 1e3)), 'time': timeFormat.format(new Date(s * 1e3))};
  
}

//call the main function
printAvailableTrucks();

