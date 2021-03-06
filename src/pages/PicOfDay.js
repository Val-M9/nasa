import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";

import loader from "../assets/loader/Ripple-1.4s-200px.svg";
import { apodAPI } from "../api/api";

const PicOfDay = () => {
  const [picture, setPicture] = useState(null);
  const [date, setDate] = useState(null);

  const today = new Date(Date.now()).toISOString().split("T")[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    let result = async () => {
      const response = await apodAPI(date || today);
      response && setPicture(response);
    };
    result();
  }, [date]);

  const changeDateHandler = (d) => {
    setDate(d && d._d.toISOString().split("T")[0]);

    return date;
  };

  const disabledDate = (current) => {
    return current < moment("1995-06-16", "YYYY-MM-DD") || current > tomorrow;
  };

  return (
    <div>
      <h1>Astonomy Picture of the Day</h1>
      <div className="datepicker">
        <div className="datepicker-item" dataAttr="First picture is dated 1995-06-16.">
          <DatePicker onChange={changeDateHandler} disabledDate={disabledDate} />
        </div>
        <span className="datepicker-span">
          Pick up the date and see the different pictures and videos of our fantastic universe.
        </span>
      </div>
      {picture ? (
        <>
          <div>
            {picture.media_type === "video" ? (
              <div className="apod-video">
                <iframe
                  src={picture.url}
                  title="Video player"
                  width="960"
                  height="640"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            ) : (
              <div className="apod-picture">
                <img src={picture.url} alt="APOD" />
                {picture.hdurl && (
                  <a href={picture.hdurl} target="_blank" rel="noopener noreferrer">
                    Link to HD format
                  </a>
                )}
              </div>
            )}
          </div>
          <p className="apod-explanation">{picture.explanation}</p>
        </>
      ) : (
        <img className="loader" src={loader} alt="Loader" />
      )}
    </div>
  );
};

export default PicOfDay;
