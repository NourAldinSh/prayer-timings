// Material Ui
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Exteranl Libraryies
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  // States

  const [nextPrayerIndex, setNextPrayerIndex] = useState(4);
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const [remainingTime, setRemainingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
  });

  const [today, setToday] = useState("");

  const availableCities = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
    },
    {
      displayName: "الدمام",
      apiName: "Dammam",
    },
  ];

  const prayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Sunset",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];

  const getTimings = async () => {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`);
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("hi im kid");
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 4;

    if (momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))) {
      console.log("next prayer is dhuhr");
      prayerIndex = 1;
    } else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timings["Asr"], "hh:mm"))) {
      console.log("next prayer is asr");
      prayerIndex = 2;
    } else if (momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))) {
      console.log("next prayer is sunset");
      prayerIndex = 3;
    } else if (momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) && momentNow.isBefore(moment(timings["Isha"], "hh:mm"))) {
      console.log("next prayer is isha");
      prayerIndex = 4;
    } else {
      console.log("next prayer is Fajr");
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"));

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`);
  };

  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.apiName === event.target.value;
    });
    setSelectedCity(cityObject);
  };

  return (
    <>
      {/* Titles */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h3>{today}</h3>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h3>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h3>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/* === Titles === */}

      <Divider variant="middle" style={{ borderColor: "white", opacity: "0.1", marginBottom: "25px", marginInline: "0" }} />

      {/* Prayer Cards */}
      <Stack direction="row" justifyContent={"space-between"}>
        <Prayer image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2" name="الفجر" time={timings.Fajr} />
        <Prayer image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921" name="الظهر" time={timings.Dhuhr} />
        <Prayer image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf" name="العصر" time={timings.Asr} />
        <Prayer image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5" name="المغرب" time={timings.Sunset} />
        <Prayer image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d" name="العشاء" time={timings.Isha} />
      </Stack>
      {/* === Prayer Cards === */}

      {/* Select City */}
      <Stack direction="row" style={{ marginTop: "25px" }} justifyContent="center">
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select style={{ color: "white" }} labelId="demo-simple-select-label" id="demo-simple-select" label="Age" onChange={handleCityChange}>
            {availableCities.map((city, index) => {
              return (
                <MenuItem key={index} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* === Select City === */}
    </>
  );
}
