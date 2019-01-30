/* 
*   Simple POST request to post the thing info into slack channel
*/
const https = require('https');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
          attachments: [
              {
                  fallback: "Room monitor.",
                  color: "#2eb886",
                  pretext: "Hi there. Check out the current room monitor stats!",
                  author_link: "#",
                  author_name: "Room Monitor",
                  author_icon: "http://icons.iconarchive.com/icons/icons8/windows-8/16/Industry-Robot-icon.png",
                  title: "Current room stats:",
                  text: "The measurments may vary",
                  fields: [
                      {
                          title: "Temperature",
                          value: event.state.reported.temp,
                          short: true
                      },
                      {
                          title: "Humidity",
                          value: event.state.reported.humidity,
                          short: true
                      },
                      {
                          title: "Pressure",
                          value: event.state.reported.pressure,
                          short: true
                      }
                  ],
                  image_url: "http://my-website.com/path/to/image.jpg",
                  thumb_url: "http://example.com/path/to/thumb.png",
                  footer: "Room Monitor v1",
                  footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
                  ts: Date.now()
              }
          ]
        })
        
        const options = {
          hostname: 'hooks.slack.com',
          port: 443,
          path: '/services/YOUR_TOKEN',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }
        
        const req = https.request(options, (res) => {
          console.log(`statusCode: ${res.statusCode}`)
        
          res.on('data', (d) => {
             resolve('Success');
          })
        })
        
        req.on('error', (error) => {
          reject('error');
        })
        
        req.write(data)
        req.end()
  });
};