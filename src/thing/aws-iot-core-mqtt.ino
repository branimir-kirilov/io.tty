#include <ESP8266WiFi.h>
#include <ArduinoJson.h>    
#include <ESP8266AWSIoTMQTTWS.h>
#include <Adafruit_BME280.h>
#include <hcsr04.h>

const char *ssid = "***";
const char *password = "***";

#define trigPin D7
#define echoPin D6

// See `src/aws_iot_config.h` for formatting
char *region = (char *) "***";
char *endpoint = (char *) "***";
char *mqttHost = (char *) "***";
int mqttPort = 443;
char *iamKeyId = (char *) "***";
char *iamSecretKey = (char *) "***";
const char* aws_topic  = "***";


ESP8266DateTimeProvider dtp;
AwsIotSigv4 sigv4(&dtp, region, endpoint, mqttHost, mqttPort, iamKeyId, iamSecretKey);
AWSConnectionParams cp(sigv4);
AWSWebSocketClientAdapter adapter(cp);
AWSMqttClient client(adapter, cp);

float bme_pressure, bme_temp, bme_humidity;
Adafruit_BME280 bme; // Note Adafruit assumes I2C adress = 0x77 my module (eBay) uses 0x76 so the library address has been changed.

int distance;
int duration;

void setup() {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    Serial.begin(115200);
    while(!Serial) {
        yield();
    }

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

    pinMode(D3, INPUT_PULLUP); //Set input (SDA) pull-up resistor on

    Wire.setClock(2000000);    // Set I2C bus speed 
    Wire.begin(D3,D4); // Define which ESP8266 pins to use for SDA, SCL of the Sensor
    if (!bme.begin()) {
      Serial.println("Could not find a valid BME280 sensor, check wiring!");
      while (1);
    }

    int res = client.connect();
    Serial.printf("mqtt connect=%d\n", res);

    if (res == 0) {
      client.subscribe(aws_topic, 1,
        [](const char* topic, const char* msg)
        { Serial.printf("Got msg '%s' on topic %s\n", msg, topic); }
      );
    }
}

void loop() {
  if (client.isConnected()) {  
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
  
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);


    duration = pulseIn(echoPin, HIGH);  // Reads the echoPin, returns the sound wave travel time in microseconds
    distance = duration * 0.034 / 2;  
    
    Serial.println("Distance: " + String(distance) + "cm");
    
    bme_temp     = bme.readTemperature();        // No correction factor needed for this sensor
    bme_humidity = bme.readHumidity() + 1.0;     // Plus a correction factor for this sensor
    bme_pressure = bme.readPressure()/100 + 3.7; // Plus a correction factor for this sensor

    DynamicJsonDocument jsonBuffer;
    JsonObject root = jsonBuffer.to<JsonObject>();
    root["clientToken"] = "device1"; 
    JsonObject state = root.createNestedObject("state");
    JsonObject state_reported = state.createNestedObject("reported");
    state_reported["temp"] = bme_temp;
    state_reported["humidity"] = bme_humidity;
    state_reported["pressure"] = bme_pressure;
    state_reported["distance"] = distance;

    serializeJson(root, Serial);
    Serial.println();
    char shadow[measureJson(root) + 1];
    serializeJson(root, shadow, sizeof(shadow));

    client.publish(aws_topic, shadow, 0, false);
    client.yield();

  } else {
    Serial.println("Not connected...");
    delay(2000);
  }

  delay(30000);
}