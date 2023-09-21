/* Pusher.js
Server side node.js script that services real-time websocket requests
Allows websocket connections to subscribe and publish to MQTT topics

1. Install Mosquitto
brew install mosquitto
 a: start server 
  /usr/local/opt/mosquitto/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
 b. stop server
 pkill mosquitto
2. 
https://ourlearningspot.blogspot.com/2018/04/real-time-web-interface-to-mqtt-using.html?lr=1
*/
const express = require("express");

const socketio = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(6002);

var mqtt = require("mqtt");

// create a socket object that listens on port 5000
const io = socketio(expressServer);

// create an mqtt client object and connect to the mqtt broker
var client = mqtt.connect("http://localhost");

io.sockets.on("connection", function (socket) {
  // socket connection indicates what mqtt topic to subscribe to in data.topic
  socket.on("subscribe", function (data) {
    console.log("Subscribing to -- " + data.topic);
    socket.join(data.topic);
    client.subscribe(data.topic);
  });
  // when socket connection publishes a message, forward that message
  // the the mqtt broker
  socket.on("publish", function (data) {
    console.log("Publishing to ++" + data.topic);
    client.publish(data.topic, data.payload);
  });
});

// listen to messages coming from the mqtt broker
client.on("message", function (topic, payload, packet) {
  console.log("called by publish:" + topic + "=" + payload);
  io.sockets.emit("mqtt", {
    topic: String(topic),
    payload: String(payload),
    text: "Server Response",
  });
});

client.on("connect", function () {
  console.log("connect client");
  client.subscribe("presence");
  client.publish("presence", "Hello mqtt");
});

// client.on("message", function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// });
