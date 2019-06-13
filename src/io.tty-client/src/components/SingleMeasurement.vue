<template>
  <div class="main">
      <div class="single-measurement-wrapper" v-if="isAuthenticated">
          <h2 class="current-title"> Current measurement <em>({{ this.timeConverter(stats.timestamp) }})</em></h2>
          <h2 class="proximity-alert blinking" v-if="stats.payload.state.reported.distance < 50"> Proximity alert! </h2>
          <div> Last known distance to sensor: <strong>{{ stats.payload.state.reported.distance }} cm </strong> </div>
          <section class="content">
                <div class="single-block">
                    <div class="box gauge--1">
                        <div class="mask">
                            <div class="semi-circle" :data-bind="stats.payload.state.reported.temp"></div>
                            <div class="semi-circle--mask" :style="temperatureStyle"></div>
                        </div>
                    </div>
                    <h3 class="info">Temperature <em>( °C )</em></h3>
                </div>

                <div class="single-block">
                    <div class="box gauge--2">
                        <div class="mask">
                            <div class="semi-circle" :data-bind="stats.payload.state.reported.pressure.toFixed(2)"></div>
                            <div class="semi-circle--mask" :style="humidityStyle"></div>
                        </div>
                    </div>
                    <h3 class="info">Humidity <em>( hPa )</em></h3>
                </div>

                <div class="single-block">
                    <div class="box gauge--3">
                        <div class="mask">
                            <div class="semi-circle" :data-bind="stats.payload.state.reported.humidity.toFixed(2)"></div>
                            <div class="semi-circle--mask" :style="pressureStyle"></div>
                        </div>
                    </div>
                    <h3 class="info">Pressure <em>( % RH )</em></h3>
                </div>

            </section>
      </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'SingleMeasurmentShort',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAuthenticated() {
      return !!Auth.user;
    },
    tempDegrees() {
      return Math.abs(this.stats.payload.state.reported.temp * 4);
    },
    humidityDegrees() {
      return Math.abs(this.stats.payload.state.reported.humidity * 1);
    },
    pressureDegrees() {
      return Math.abs(this.stats.payload.state.reported.pressure * 3.5);
    },
    temperatureStyle() {
      return {
        transform: `rotate(${this.tempDegrees}deg) translate3d(0,0,0)`,
      };
    },
    humidityStyle() {
      return {
        transform: `rotate(${this.humidityDegrees}deg) translate3d(0,0,0)`,
      };
    },
    pressureStyle() {
      return {
        transform: `rotate(${this.pressureDegrees}deg) translate3d(0,0,0)`,
      };
    },
  },
  methods: {
    timeConverter(unixTimestamp) {
      const a = new Date(unixTimestamp * 1);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;

      return time;
    },
  },
};
</script>

<style scoped lang="scss">
$baseFontSize: 16;
$green: #1abc9c;
$yellow: #f1c40f;
$red: #c0392b;
$blue: #3498db;
$grey: #f2f2f2;

.blinking {
    animation: blinkingText 1.5s infinite;
}

@keyframes blinkingText{
    0%{     color: #f00;    }
    49%{    color: #fff; }
    50%{    color: #f00; }
    99%{    color: #fff;  }
    100%{   color: #f00;    }
}

@function rem($val) {
  @return #{$val / $baseFontSize}rem;
}

.info {
    font-size: 18px;
    margin: 0;
}

.single-block {
    display: inline-block;
}

.current-title {
    margin-top: 100px;
}

.proximity-alert {
    color: red;
}

// Gauge
.mask {
  position: relative;
  overflow: hidden;

  display: block;
  width: rem(200);
  height: rem(100);
  margin: rem(20);
}
.semi-circle {
  position: relative;

  display: block;
  width: rem(200);
  height: rem(100);

  background: linear-gradient(to right, $green 0%, $yellow 50%, $red 100%);

  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;

  &::before {
    content: attr(data-bind);

    font-size: 35px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-style: italic;
    color: #444;
    text-align: center;
    line-height: 85px;

    position: absolute;
    bottom: 0px;
    left: 50%;
    z-index: 2;

    display: block;
    width: rem(140);
    height: rem(70);
    margin-left: rem(-70);

    background: #fff;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }
}
.semi-circle--mask {
  position: absolute;
  top: 0;
  left: 0;

  width: rem(200);
  height: rem(200);

  background: transparent;

  transform: rotate(120deg) translate3d(0,0,0);
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all .3s ease-in-out;

  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;

    display: block;
    width: rem(202);
    height: rem(102);
    margin: -1px 0 0 -1px;
    background: #f2f2f2;

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
  }
}
.gauge--1 {
    .semi-circle--mask {
        transform: rotate(150deg) translate3d(0,0,0);
    }
}
</style>
