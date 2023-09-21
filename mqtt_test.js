var mqtt = require("mqtt");
var client = mqtt.connect("http://localhost");

client.on("connect", function () {
  console.log("connect client two");
  client.subscribe("presence");
  client.publish("presence", "Hello mqttaa");
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log("BUGGER");
  console.log("message", message.toString());
  client.end();
});
