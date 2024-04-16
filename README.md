# Weather-Journal App

## Table of Content

- [Description](#description)
- [Technologies](#technologies)
- [Usage](#usage)
- [Development](#development)
    - [Contributing](#contributing)
- [Dependencies](#dependencies)
- [Helping resources](#helping-resources)
- [License](#license)

## Description

[Back to top](#table-of-content)

This project is an asynchronous web app that uses Web API and user data to dynamically update the UI for a Weather-Journal App. This project is using API credential Key from OpenWeatherMap website, which allows using and getting data and other functions. In addition, using Node.js helps to create an environment that allows installing Express package to work as a local server. This Express gives easy access to setup server port and to handle HTTP routes and requests.

## Technologies

[Back to top](#table-of-content)

The languages used:

- HTML
- CSS
- JAVASCRIPT

Code Editor:

- Visual Studio Code

Node.js platform.

## Usage

[Back to top](#table-of-content)

How to use and functioned this project.

1. Open it with any devices either Mobile, Tablet, or Desktop/Laptop.
2. The user enters zip code and their feeling and when pressing the “Generate” button the updated values for Weather Icon, Weather Description, Temperature, Date and Time, and User input (Feelings) will be shown.
3. The background will change depending on the main weather condition as well as the day and night mode which depends on the icon code.
4. If the user input invalid zip code or clicked the “Generate” button without filling in any input fields an error message will display for the user.

## Development

[Back to top](#table-of-content)

Follow the steps below to get started with this project’s development environment.

1. First, download and install Node.js from [Node](https://nodejs.org/en/download/).
2. Second, choose your favorite code editor for example [Visual Studio Code](https://code.visualstudio.com/).
3. Clone this repository: [Weather-Journal App project repo](https://github.com/Israa-AlGhaithi/IsraaWeatherJournalApp-Udacity-project.git).
4. Open the project in your preferred text editor or IDE.
5. Install Express with the npm install command: $ npm install express
6. Install all the dependencies.
7. Run the server with the command: > node server.js
8. Open any browser and type in the URL field > localhost:8000

### Contributing

[Back to top](#table-of-content)

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: > git checkout <branch-name>
3. Make your changes and commit them: > git commit
4. Push to the branch
5. Submit a pull request.

## Dependencies

[Back to top](#table-of-content)

- First, check if you already have the Node.js and Express installed correctly.
- After that, install Body-Parser by writing $ npm install body-parser in terminal
- Lastly, install cors package by using the npm install command: $ npm install cors

## Helping resources

[Back to top](#table-of-content)

- Starter code from [Udacity repository](https://github.com/udacity/fend/tree/refresh-2019).
- Weather API Key from [OpenWeatherMap](https://openweathermap.org/api).
- I’m Getting helps and ideas from:
- Our online sessions (classroom/self-study).
- OpenWeatherMap:
    - [To get/call the full link/URL to get the Current Weather Data](https://openweathermap.org/current).
    - [To know the Weather conditions (main), Weather Description, and How to get Weather Icon URL](https://openweathermap.org/weather-conditions).
- For Date and Time:
    - [toLocaleDateString Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString).
    - [toLocaleTimeString Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString).
- [To capitalize each words in the string Code by Mr.Zuhair Naqi](https://stackoverflow.com/questions/42755664/capitalize-first-letter-of-each-word-in-js).
- [GreatStack](https://www.youtube.com/watch?v=MIYQR-Ybrn4&list=PLjwm_8O3suyOgDS_Z8AWbbq3zpCmR-WE9):
    - For display the [Error Message].
    - [It ease my confusion] from which between the weather[0].main or weather[0].description to use for comparsion in order to change the background-Image for the body.

## License

[Back to top](#table-of-content)

© Weather-Journal App \| Israa Al-Ghaithi \| @Udacity.2024