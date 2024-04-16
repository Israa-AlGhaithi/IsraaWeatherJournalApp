/** global document, console, event, performance, window
 * {eslint no-undef: "error"}
*/

/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'replace_thisPartOnly_with_your_OpenWeather_api_key&units=imperial'; //my api key

//TODO: variable for the new date instance, and new date format
let d = null ; let newDateTime = null;

const dateOptions = { //Marker: with the help of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};

const timeOptions = { //Marker: with the help of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
};
/* END: Global Variables */


// TODO: function to update the current time
function updateCurrentTime() {
    // TODO: Create a new date instance dynamically with JS
    d = new Date();

    newDateTime  = d.toLocaleDateString('en-US', dateOptions)+' | '+d.toLocaleTimeString('en-US', timeOptions);
}


// Async function to make GET request to the OpenWeatherMap API
const getWeatherData = async(baseUrl, userZipCode, key) => {
    const res = await fetch(`${baseUrl}weather?zip=${userZipCode}&appid=${key}`); // TODO: await for our fetch call is calling to a web api

    try {
        if(!res.ok){ //.status == 404, 400 etc.
            document.querySelector('.error-message').style.display = 'block';
        }
        else {  // if ok, 200
            document.querySelector('.error-message').style.display = 'none';
            const data = await res.json(); //TODO: to extract the json body content from the response obj
            console.log(data);
            return data;
        }
    } catch(error) { // handling the error
        console.error('Error fetching weather data:', error);
    }
}



// TODO: Async finction to make POST request
const postData  = async (url='', data={} ) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try { // TODO: handle the response (res) with try/catch block
        if (res.ok) { // TODO: if the response (res) status is OK, it parses the response body as JSON using res.json()
            const newData = await res.json();
            console.log(newData.message); //TODO: logs the success Message
            return newData;

          } else { // TODO: If the response (res) status is not OK, it logs an error message
            console.error("Error in adding data: ", res.statusText);
          }
    } catch (error) { // TODO: if the try block handler not ok, logs an error message
        console.error("An error occurred: ", error);
    }
}


/**
 * @description Async function to retrieve data from our app for Updating the UI.
 * then select the elements on the DOM, for temperature, date, user feelings
 * then update their values
*/
const  retrieveData = async () => {

    const request = await fetch('/all');
    try {
        if(request.ok){
            if(document.querySelector('.entry').style.display = 'none') {
                document.querySelector('.entry').style.display = 'flex'; //TODO: to show the container of the entry (result)
                document.getElementById('feelings').value = ''; //TODO: to clear the textarea after button clicked

                // Transform into JSON
                const allData = await request.json()
                console.log(allData)
                // Write updated data to DOM elements
                document.getElementById('temp').innerHTML = `<img src='assets/fahrenheit.png' class='imgicon' alt='fahrenheit image' width='23px' height='24px'> ${Math.round(allData.temperature)}  °F `;
                document.getElementById('date').innerHTML = `<img src='assets/calendar.png' class='imgicon' alt='fahrenheit image' width='20px' height='20px'> ${allData.date} `;
                document.getElementById('content').innerHTML = allData.userFeelings;

                // TODO: to capitalize  each words in the string of the weather description  //Marker: code by 'Zuhair Naqi'  from https://stackoverflow.com/questions/42755664/capitalize-first-letter-of-each-word-in-js
                const des = `${allData.weatherDescription}`.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ');
                // TODO: set the waether icon
                document.getElementById('icon').innerHTML = `<img src='${allData.weatherIcon}' alt='weather icon'> `;


                /**
                 * slice the string of the icon code from the icon url.
                 * check if the icon code include 'd' for day and 'n' for night. boolean true or false.
                 * if day or night.. write the world day beside the weather description.
                 * else don't do anything just the description.
                */
                const iconCode = allData.weatherIcon.slice(34,37); // return icon code: i.e -> '04d'
                const forDay = 'd';
                const forNight = 'n';

                if(iconCode.includes(forDay)){
                    document.getElementById('weather').innerHTML = des+' | Day';
                } else if (iconCode.includes(forNight)){
                    document.getElementById('weather').innerHTML = des+' | Night';
                } else {
                    document.getElementById('weather').innerHTML = des;
                }


                /**
                 * TODO: for changing the Background body and some style according to the weather.main status
                */
                const weatherStatus =  allData.weatherMain;
                // TODO: for smooth background image change, add the class 'smooth-transition'
                document.querySelector('body').classList.add('smooth-transition');

                if(weatherStatus == 'Clear') {
                    if(iconCode.includes(forDay)) { // for clear sky at day
                        document.querySelector('body').style.backgroundImage = 'url(assets/clear.webp)';
                        document.querySelector('h1').style.color = 'white';
                    }
                    else { // for clear sky at night
                        document.querySelector('body').style.backgroundImage = 'url(assets/clearnight.jpg)';
                        document.getElementById('generate').style.color = 'white';
                    }

                } else if (weatherStatus == 'Thunderstorm') {
                    document.querySelector('body').style.backgroundImage = 'url(assets/thunderstorm.jpg)';
                    document.querySelector('h1').style.color = 'white';
                    document.getElementById('date').style.color = 'white';
                    document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                } else if (weatherStatus == 'Drizzle') {
                    document.querySelector('body').style.backgroundImage = 'url(assets/drizzle.jpg)';
                    document.querySelector('.title').style.color = 'black';
                } else if (weatherStatus == 'Rain') {
                    if(iconCode.includes(forDay)) { // for rainy day
                        document.querySelector('body').style.backgroundImage = 'url(assets/rainfall.jpg)';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                    }
                    else { // for rainy night
                        document.querySelector('body').style.backgroundImage = 'url(assets/raincar.jpg)';
                        document.getElementById('generate').style.color = 'white';
                        document.querySelector('#weather').style.color = 'black';
                        document.getElementsByTagName('label')[0].style.color = 'white';
                    }

                } else if (weatherStatus == 'Snow') {
                    if(iconCode.includes(forDay)) { // for snowing day
                        document.querySelector('body').style.backgroundImage = 'url(assets/snowflakes.jpg)';
                        document.querySelector('.title').style.color = 'black';
                        document.querySelector('#weather').style.color = 'black';
                    }
                    else { // for snowing night
                        document.querySelector('body').style.backgroundImage = 'url(assets/snowingnight.jpg)';
                        document.getElementById('generate').style.color = 'white';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                        document.getElementById('collapsible').style.color = 'white';
                    }

                } else if ( (weatherStatus == 'Mist') || (weatherStatus == 'Fog') ||  (weatherStatus == 'Haze') ) {
                    if(iconCode.includes(forDay)) { // for mist, fog, haze at day
                        document.querySelector('body').style.backgroundImage = 'url(assets/mist.jpg)';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                    }
                    else { // for mist, fog, haze at night
                        document.querySelector('body').style.backgroundImage = 'url(assets/foggynight.webp)';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                    }

                } else if ( (weatherStatus == 'Dust') || (weatherStatus == 'Sand') ) {
                    document.querySelector('body').style.backgroundImage = 'url(assets/Dust-Cloud.jpg)';

                } else if ( weatherStatus == 'Squall') {
                    document.querySelector('body').style.backgroundImage = 'url(assets/storm.jpg)';
                    document.getElementById('generate').style.color = 'white';
                    document.getElementById('date').style.color = 'white';
                    document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                } else if ( weatherStatus == 'Tornado') {
                    document.querySelector('body').style.backgroundImage = 'url(assets/tornadoStorm.jpg)';
                    document.getElementById('generate').style.color = 'white';
                    document.getElementById('date').style.color = 'white';
                    document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                } else if ( weatherStatus == 'Ash') {
                    if(iconCode.includes(forDay)) { //for ash at day
                        document.querySelector('body').style.backgroundImage = 'url(assets/ash.jpg)';
                        document.getElementById('generate').style.color = 'white';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                    }
                    else { // for ash at night
                        document.querySelector('body').style.backgroundImage = 'url(assets/ashnight.jpg)';
                        document.getElementById('generate').style.color = 'white';
                    }

                } else if ( weatherStatus == 'Clouds') {
                    if(iconCode.includes(forDay)) { //for the day clouds
                        document.querySelector('body').style.backgroundImage = 'url(assets/clouds.jpg)';
                        document.querySelector('h1').style.color = 'white';
                        document.getElementById('collapsible').style.color = 'white';
                        document.querySelector('.title').style.color = 'black';
                    }
                    else { // for the night clouds
                        document.querySelector('body').style.backgroundImage = 'url(assets/cloudsnight.webp)';
                        document.getElementById('generate').style.color = 'white';
                        document.getElementById('date').style.color = 'white';
                        document.getElementsByClassName('imgicon')[1].style.backgroundColor = 'white';
                        document.getElementById('collapsible').style.color = 'white';
                    }

                    document.querySelector('body').classList.toggle('smooth-transition');

                } else {
                    document.querySelector('body').style.backgroundImage = 'url(assets/sunny.jpg)'; //the default
                }
            } else {
                document.querySelector('.entry').style.display = 'none'; // hide the entry container
            }


        } else {
            document.querySelector('.entry').style.display = 'none'; // hide the entry container
            console.error('There are some error in retrieving data: ', request.statusText);
        }

    } catch(error) {
        document.querySelector('.entry').style.display = 'none'; // hide the entry container
        console.log('error', error);
    }
}


// TODO: callback function to call the Async GET request
function performAction() {
    //TODO: getting the zip Code from user input
    const zipCode = document.getElementById('zip').value;
    getWeatherData(baseURL, zipCode, apiKey)

    /**
     * TODO: chain another promise that makes a POST request to add the API data as well as data entered by the user, to the app
    */
    .then( (dataObj) => {
        /**
         * for the icon in UI
         * TODO: the base URL for get icons from the API
         * Marker: get help from the https://openweathermap.org/weather-conditions
        */
        const baseIconURL = 'https://openweathermap.org/img/wn/';
        const main = dataObj.weather[0].main; // extracting the main weather
        const description = dataObj.weather[0].description; // extracting the description of weather
        const icon = dataObj.weather[0].icon; // extracting the weather icon
        const iconURL = `${baseIconURL}${icon}@4x.png`; // TODO: appending the icon code to the base URL to get the complete icon URL.
        /* End: Icon */

        /**
         * for the main data
        */
        const temp = dataObj.main.temp; // extracting the temp
        const userResponse = document.getElementById('feelings').value; // getting user feelings from user input

        //TODO: Calling the function immediately to set the initial time
        updateCurrentTime();

        // Update the time every second (1000 milliseconds)
        setInterval(updateCurrentTime, 1000);

        // calling the POST request with these 2 parameters url:path and the data object
        postData('/addingData', { temperature: temp, date: newDateTime, userFeelings: userResponse, weatherMain: main, weatherDescription: description, weatherIcon: iconURL } );

    })


    /**
     * TODO: chain another promise that UPDATES the UI after the POST request completed
    */
    .then(retrieveData)

}

// TODO: for the feelings collapiible
const collapsibleBtn = document.getElementById('collapsible');
const contentFeelings = document.getElementById('content');
// event listener
collapsibleBtn.addEventListener('click', () => {

    if (contentFeelings.style.display === 'block') {
        contentFeelings.style.display = 'none';
    } else {
        contentFeelings.style.display = 'block';
    }
});


// TODO: select generate button, add Event listener when user clicked the button, call the function
document.getElementById('generate').addEventListener('click', performAction);


