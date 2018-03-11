const request = require('request')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData() {
  let zoneNumber = getRandomInt(1,9)
  let numberOfTriggers = getRandomInt(1,10)
  let input = {
    zone: zoneNumber,
    event: "enter"
  }
  
  let options = {
    url: "http://heatmap-backend.mybluemix.net/triggers/add",
    method: "POST",
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  console.log("Sending " + numberOfTriggers + " number of events to zone: " +zoneNumber)
  var requestsSent = 0

  while (requestsSent < numberOfTriggers) {
    request(options, function (err, _res, body) {
      if (err) _res.send(err);
      // console.log(body)
    });
    requestsSent++;
  }
}

setInterval(generateData, 1000)
