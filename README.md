# Temprature-Monitor
Raspberry Pi Temprature Monitor using Amazon AWS IoT
##What is it for?
This lightweight piece of code is being developed to help remotely monitor the tempratures of fermentation vessels.  
It is designed for use on a [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) or later running [Raspbian Stretch Lite](https://www.raspbian.org/)

## What Does it do?
- Publish Temperature Data to [Amazon IoT](https://aws.amazon.com/iot/) via [MQTT](http://mqtt.org/)
- Subscribe to control Topics from [Amazon IoT](https://aws.amazon.com/iot/) using [MQTT](http://mqtt.org/)

## Hardware
- [Raspberry Pi](https://www.raspberrypi.org/products/)
- [DS1820] (http://www.systronix.com/Resource/ds1820.pdf) 1–Wire&trade; Digital Thermometer
- A breadboard or Custom PCB with 4.7K&#8486; pull up resistor for DS1820 communicaction. 

## Software
- [Raspbian Stretch Lite](https://www.raspbian.org/) - Lite weight Raspberry Pi OS without GUI
- [Node.JS](https://nodejs.org/) & [Node Package Manager](https://www.npmjs.com/) - General Frameworks used
- [AWS IoT SDK for JavaScript](https://github.com/aws/aws-iot-device-sdk-js) - AWS Package to help connect node.js applications to AWS IoT
- [ds18x20.js](https://github.com/mraxus/ds18x20.js) - Raspberry Pi Specific node.js DS1820 temperature probe reading

## Raspberry Pi Setup
To enable W1 add the following to the /boot/config.txt file of your pi, replacing the 'x' with the GPIO pin you wish to use for your temp probe input.
```
dtoverlay=w1-gpio,gpiopin=x
```

