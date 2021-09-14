import React, { FunctionComponent, useState, useEffect } from "react";
import { ZoneAPIResponse } from "./ZoneAPIResponse";
import ZoneData from "./ZoneData";

const ZoneInput: FunctionComponent = () => {
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState({} as ZoneAPIResponse);
  const [error, setError] = useState(false);

  useEffect(() => {
    // handle case of a refresh, where the zipcode response was already stored
    const ACTIVE_ZIPCODE = localStorage.getItem("ACTIVE_ZIPCODE");
    if (ACTIVE_ZIPCODE) {
      const localData = localStorage.getItem(ACTIVE_ZIPCODE);
      if (localData) setData(JSON.parse(localData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ACTIVE_ZIPCODE", zipcode);

    // avoid a network request if we have a matching zipcode response stored
    const localData = localStorage.getItem(zipcode);
    if (localData) {
      setError(false);
      setData(JSON.parse(localData));
      setZipcode(""); // clear zipcode input after submission
      return;
    }

    void (async () => {
      const res = await fetch(
        `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zipcode}`
      );

      const json = (await res.json()) as ZoneAPIResponse;

      if (json.zone) {
        setError(false);
        setData(json);
        localStorage.setItem(json.zipcode, JSON.stringify(json));
      } else {
        setError(true);
        setData({} as ZoneAPIResponse);
      }
    })();

    setZipcode(""); // clear zipcode input after submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipcodeInput">Zipcode:</label>
        <input
          className="zipcode-input"
          id="zipcodeInput"
          type="number"
          value={zipcode}
          onChange={handleChange}
          aria-controls="zoneInfo"
        />
        <input
          className="zipcode-submit"
          type="submit"
          value="Submit"
          disabled={zipcode.length !== 5}
        />
      </form>
      <ZoneData {...data} error={error} />
    </div>
  );
};

export default ZoneInput;
