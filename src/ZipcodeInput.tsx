import React, { FunctionComponent, useState } from "react";
import { ZoneAPIResponse } from "./ZoneAPIResponse";
import ZoneData from "./ZoneData";

const ZoneInput: FunctionComponent = () => {
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState({} as ZoneAPIResponse);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: add response to localStorage and lookup zipcode first before requesting from API

    void (async () => {
      const res = await fetch(
        `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zipcode}`
      );

      const json = (await res.json()) as ZoneAPIResponse;
      
      if (json.zone) {
        setError(false);
        setData(json);
      } else {
        setError(true);
        setData({} as ZoneAPIResponse);
      }
    })();
  
    setZipcode(""); // clear zipcode input after submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipcodeInput">Zipcode:&nbsp;</label>
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
  )
};

export default ZoneInput;
