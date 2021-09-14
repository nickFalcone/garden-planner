import React, { FunctionComponent, useState } from "react";
import { ZoneAPIResponse } from "./ZoneAPIResponse";
import ZoneData from "./ZoneData";

const ZoneInput: FunctionComponent = () => {
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState({} as ZoneAPIResponse);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <label>
          Zipcode:&nbsp;
          <input type="number" value={zipcode} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error && <p>Error retrieving climate zone data.</p>}
      <ZoneData {...data} />
    </div>
  )
};

export default ZoneInput;
