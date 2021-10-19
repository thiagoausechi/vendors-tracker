import React from "react";
import { VendorTitle } from "./factory/VendorFactory";
import styles from "../styles/Vendors.module.css";
import { useCountdown } from "@kfiros/react-countdown-hook";

export class XurPlaceholder extends React.Component
{
  render()
  {
    return (
      <div className={styles.wrapper}>
        <VendorTitle
          name="Xûr is arriving..."
          icon="https://www.bungie.net/img/destiny_content/vendor/icons/xur_large_icon.png"
        />
        <div
          className={`row ${styles.container}`}
          style={{
            backgroundImage: `url(https://icfvx.csb.app/assets/img/vendors/xur_placeholder.png)`
          }}
        >
          <DateCountdown />
        </div>
      </div>
    );
  }
}

function DateCountdown(props)
{
  function nextFriday()
  {
    var date = new Date();
    date.setDate(date.getDate() + ((5 /*Friday*/ + (7 - date.getDay())) % 7));
    date.setUTCHours(17, 0, 0, 0);

    return date;
  }

  function aboutToArrive()
  {
    var date = new Date();
    var reset = new Date();
    reset.setUTCHours(17, 0, 0, 0);

    return date.getDay() === 5 && date.getUTCHours() >= reset.getUTCHours();
  }

  const timer = useCountdown({
    finishTime: nextFriday()
  });

  return aboutToArrive() ? (
    <ArriveDelay />
  ) : (
    <Timer countdown={timer.countdown} />
  );
}

function ArriveDelay(props)
{
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexDirection: "row",
        width: "600px",
        height: "100px",
        justifyContent: "space-evenly",
        transform: "translate(300px, 360px)",
        alignItems: "center"
      }}
    >
      <h2> Coming soon... </h2>
    </div>
  );
}

function Timer(props)
{
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "600px",
        height: "100px",
        justifyContent: "space-evenly",
        transform: "translate(300px, 360px)",
        alignItems: "center"
      }}
    >
      <Time title="Day" time={props.countdown.days} />
      <Time title="Hour" time={props.countdown.hours} />
      <Time title="Minute" time={props.countdown.minutes} />
      <Time title="Second" time={props.countdown.seconds} />
    </div>
  );
}

function Time(props)
{
  return (
    <div style={{ color: "white" }}>
      <div style={{ textAlign: "center" }}>
        {" "}
        {formattedTime(props.title, props.time)}{" "}
      </div>
      <div style={{ textAlign: "center", fontSize: "48px", fontWeight: 700 }}>
        {props.time}
      </div>
    </div>
  );
}

function formattedTime(title, value)
{
  return (title += value > 1 ? "s" : "");
}
