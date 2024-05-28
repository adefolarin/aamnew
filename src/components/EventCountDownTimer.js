
import { React, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Container, Col, Row, ButtonGroup, Button } from 'react-bootstrap';
import "./EventCountDownTimer.css";
import axios  from 'axios';
import { serverurl } from "../providers/ServerUrl";


const x = window.matchMedia("(max-width: 767px)");

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  strokeWidth: 0
};

// Create a MediaQueryList object
const y = window.matchMedia("(max-width: 767px)")

const changeSize = (x) => {
  if(x.matches) { 
    timerProps.size = 70
  } else {
    timerProps.size = 100
  }
}

changeSize(y)

// Attach listener function on state changes
y.addEventListener("change", function() {
  changeSize(y);
});

/*const navigate = useNavigate();
const goToEvent = () => {
  navigate('/event');
}*/




const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div className="dimension">{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export function EventCountDownTimer({eventcountdown}) {

//const [eventcountdown, setEventCountDown] = useState([]);

//const fetchEventCountDownData = () => {
  //return axios.get(serverurl + "/api/nextevent")
    //  .then((response) => setEventCountDown(response.data['event']));
//};

//useEffect(() => {
  //fetchEventCountDownData();
//},[])

//fetchEventCountDownData();

  const countdown = eventcountdown;


  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = countdown; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className="Timer">
      <CountdownCircleTimer
        {...timerProps}
        colors="#fff"
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Days", getTimeDays(daysDuration - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#fff"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Hours", getTimeHours(daySeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#fff"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#fff"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
       /* onComplete={
           (totalElapsedTime) => ({
           shouldRepeat: remainingTime - totalElapsedTime > 0
           })
          
        }*/
        onComplete={(totalElapsedTime) => {
          // do your stuff here
          if(remainingTime - totalElapsedTime > 0) {
            return { shouldRepeat: true } // repeat animation in 1.5 seconds
          } else {
            //alert("Great");
            
          }
        }}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("Seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
