// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../../../hooks/useUrlLocation";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import BackButton from "../Button/BackButton";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../../../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form(): JSX.Element {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState<string>("");
  const [isLoadingClickPosition, setIsLoadingClickPosition] = useState(false);
  const [errorClickPosition, setErrorClickPosition] = useState("");
  const [emoji, setEmoji] = useState("");

  const { isLoading: isLoadingCreateNewCity, createNewCity } = useCitiesContext();
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthClickLocation = async () => {
      if (!lat && !lng) return;
      try {
        setErrorClickPosition("");
        setIsLoadingClickPosition(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) throw new Error("Can't fetch data from API");
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("The place doesn't seem to be a city. Click somewhere else 😉");
        // console.log(data);
        setCityName(data.city || data.locality || "");
        setEmoji(data.countryCode);
        setCountry(data.countryName);
      } catch (error: any) {
        setErrorClickPosition(error.message);
      } finally {
        setIsLoadingClickPosition(false);
      }
    };
    fecthClickLocation();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    await createNewCity(city);
    navigate("/app");
  };

  if (isLoadingClickPosition) return <Loading />;

  if (!lat && !lng) return <Message message={"Start by clicking somewhere in the map."} />;

  if (errorClickPosition) return <Message message={errorClickPosition} />;

  return (
    <form
      className={`${styles.form} ${isLoadingCreateNewCity ? styles.loading : ""}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          disabled={isLoadingCreateNewCity}
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          {emoji && (
            <img
              src={`https://flagsapi.com/${emoji}/shiny/64.png`}
              alt='country flag'
              width='30px'
            />
          )}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          disabled={isLoadingCreateNewCity}
          id='date'
          selected={date}
          onChange={(datePicked) => setDate(datePicked)}
          dateFormat='EEEE, dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          disabled={isLoadingCreateNewCity}
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button buttonType='submit' type={"primary"}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
