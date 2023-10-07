let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");


//to fetch API and to display
let getWeather = () => {
    let cityValue = cityRef.value;

    //input field is empty
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">"Please enter a city name"</h3>`;

        document.querySelector(".info").style.display = "none";
    }

    //input field is not empty
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric&lang=en`;

        //clear input field
        cityRef.value = "";
        fetch(url)
            .then(resp => resp.json())
            //valid city name
            .then(data => {
                console.log(data);

                // weather condition checkking
                const weatherCondition = data.weather[0].main;


                const colorSchemes = {
                    "Clear": { //sunny
                        background: "linear-gradient(135deg, #FFA41B, #F86F03)",
                        text: "black"
                    },
                    "Rain": {
                        background: "linear-gradient(135deg, black, darkgrey)",
                        text: "black"
                    },
                    "Mist": {
                        background: "linear-gradient(135deg, #61677A, #D8D9DA)",
                        text: "black"
                    },
                    "Clouds": {
                        background: "linear-gradient(135deg, var(--blue-1), var(--blue-2))",
                        text: "darkblue"
                    },
                    "Snow": {
                        background: "linear-gradient(135deg, white, lightblue)",
                        text: "blue"
                    },
                    "Haze": {
                        background: "linear-gradient(135deg, #CCCCCC, #999999)",
                        text: "black"
                    },

                };


                if (colorSchemes[weatherCondition]) {
                    const scheme = colorSchemes[weatherCondition];
                    document.body.style.background = scheme.background;
                    result.style.color = scheme.text;
                } else {
                    //default cond
                    document.body.style.background = "linear-gradient(135deg, var(--blue-1), var(--blue-2))";
                    result.style.color = "var(--white)";
                }
                console.log(data.weather[0].icon);
                console.log(data.weather[0].description);
                console.log(data.name);
                console.log(data.main);
                console.log(data.main.temp_min);
                console.log(data.main.temp_max);



                result.innerHTML = `
                <h2>${data.name}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h1>${data.main.temp} &#176;</h1>
                <div class="temp-container">
                    <div>
                        <h4 class="title">min</h4>
                        <h4 class="temp">${data.main.temp_min}</h4>
                    </div>
                    <div>
                        <h4 class="title">max</h4>
                        <h4 class="temp">${data.main.temp_max}</h4>
                    </div>
                </div>`;



                document.querySelector(".info").style.display = "grid";


                document.querySelector(".realfeel").textContent = `${data.main.feels_like} °C`;
                document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
                document.querySelector(".wind").textContent = `${data.wind.speed} m/s`;
                document.querySelector(".pressure").textContent = `${data.main.pressure} hPa`;



            })

            //if city name not valid
            .catch(() => {
                result.innerHTML = `<h3 class="msg">City not found</h3>`;
                document.querySelector(".info").style.display = "none";
            });
    }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener('load', getWeather);
