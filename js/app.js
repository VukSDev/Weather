window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/94f3e07f898b5bd764426cdb47c4580d/${lat},${long}`;
      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          const {temperature, summary, icon} = data.currently;

          //Formula for celsius
          let celsius = (temperature - 32) * (5 / 9);
          //Set DOM Elements from the api
          temperatureDegree.textContent = Math.floor(celsius);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone.toUpperCase();

          //Set icon
          setIcons(icon, document.querySelector('.icon'));

          //Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            }
          });
        })
    });
  } else {
    h1.textContent = "This is not working because you disabled location."
  }

  function setIcons(icon, iconId){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
