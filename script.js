const w1 = document.querySelector(".w1 span"),
  w2 = document.querySelector(".w2 span"),
  w3 = document.querySelector(".w3 span"),
  w4 = document.querySelector(".w4 span"),
  h1 = document.querySelector(".h1 span"),
  h2 = document.querySelector(".h2 span"),
  h3 = document.querySelector(".h3 span"),
  h4 = document.querySelector(".h4 span"),
  location_details = document.querySelector(".location-details"),
  location_btn = document.querySelector(".location-btn"),
  device_info = document.querySelector(".device-info"),
  device_name = document.querySelector(".device-name"),
  error = document.querySelector(".error-element"),
  resolution = document.querySelector(".resolution b");

const getLocation = async () => {
  location_details.textContent = "Loading...";
  navigator.geolocation.getCurrentPosition(
    (data) => {
      const url = `https://us1.locationiq.com/v1/reverse?key=pk.c5755bac19bed55bed2a5606af29a6d4&lat=${data.coords.latitude}&lon=${data.coords.longitude}&format=json`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          location_btn.style.display = "none";
          location_details.textContent = res.display_name;
        });
    },
    (err) => {
      location_details.textContent = err.message;
    }
  );
};

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const getDeviceInfo = () => {
  device_info.textContent = navigator.userAgent;

  if (isMobile) {
    device_name.textContent = "Mobile Phone";
  } else {
    device_name.textContent = "Desktop";
  }
};

const findWidth = () => {
  w1.textContent = window.innerWidth + "px";
  w2.textContent = window.outerWidth + "px";
  w3.textContent = screen.width + "px";
  w4.textContent = screen.availWidth + "px";
};

const findHeight = () => {
  h1.textContent = window.innerHeight + "px";
  h2.textContent = window.outerHeight + "px";
  h3.textContent = screen.height + "px";
  h4.textContent = screen.availHeight + "px";
};

const fullScreen = () => {
  document.documentElement.requestFullscreen();
};

const exitFullScreen = () => {
  document.exitFullscreen();
};

const port = () => {
  
  if (!isMobile)
  {
    generateError("Portrait is only Supported in Mobile Phones");
    return
  }

  fullScreen();
  screen.orientation.lock("portrait");
};

const land = () => {
  fullScreen();
  screen.orientation.lock("landscape");
};

const vibrate = () => {
  if (!isMobile)
  {
    generateError("Vibration is not Supported in Desktop devices");
    return
  }
  navigator.vibrate([500, 250, 500, 250, 500, 250, 500]);
};

let timeoutCalled = false

const generateError = (e) => {
    error.textContent = e;
    error.style.display = "block";
    
    if (timeoutCalled) return
    timeoutCalled = true
    const id = setTimeout(() => {
      error.style.display = "none";
      timeoutCalled = false
    }, 3000);
};


resolution.textContent =  screen.width + " x " + screen.height;
getDeviceInfo();
findWidth();
findHeight(+"px");

