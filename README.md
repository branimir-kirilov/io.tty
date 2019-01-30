# io.tty

Simple weather monitor that sends data (temperature, humidity and pressure) periodically to AWS IoT Core via MQTT.

## The device

The main controller used is [Wemos D1 Mini](https://wiki.wemos.cc/products:d1:d1_mini) and [Adafruite BME280](https://www.adafruit.com/product/2652)

## Code 

[This](https://github.com/debsahu/esp8266-arduino-aws-iot-ws) wrapper library was used to establish the connection between the device and [AWS IoT Core](https://aws.amazon.com/iot-core/). The readings from the sensor are delivered on the I2C bus.

The setup for this is easy - check [the board code](./src/thing/aws-iot-core-mqtt.ino). 
