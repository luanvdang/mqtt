# mqtt

Want to give credit to this post here: https://ourlearningspot.blogspot.com/2018/04/real-time-web-interface-to-mqtt-using.html?lr=1
for getting me started MQTT to work properly with Mosquitto.

Steps:

A. Mosquitto Server:

  1. Install Mosquitto
  brew install mosquitto
  2. Start Mosquitto Server
  /usr/local/opt/mosquitto/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
  3. Stop Mosquitto Server (Note: Whenever you want to stop it) (Optional)
  pkill mosquitto

B. NodeJS and HTML:
  1. npm init -y
  2. npm install socket.io nodemon mqtt
  3. create folder 'public/'
  4. copy mqtt.html to public/
  5. unzip this file and create 'jquery', 'image' folder inside 'public/' (https://github.com/tdreyno/iphone-style-checkboxes/archive/v1.zip)
  6. copy 'style.css' to folder 'public/'
  6. Run these command
    nodemon pusher.js
    nodemon mqtt_test.js
  7. go to http://localhost:6002/mqtt.html
  
  e.g. Example of Folder Structure
  
  mqtt
    - public
      - images
      - jquery
      - mqtt.html
      - style.css
    - mqtt_test.js
