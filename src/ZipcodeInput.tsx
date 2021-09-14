import React, { FunctionComponent, useState } from "react";

interface ZoneAPIResponse {
  zipcode: string;
  zone: string;
  trange: string;
  zonetitle: string;
  rangemin: string;
  rangemax: string;
}

const ZoneInput: FunctionComponent = () => {
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState({} as ZoneAPIResponse);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getZoneData = async () => {
      const res = await fetch(
        `https://c0bra.api.stdlib.com/zipcode-to-hardiness-zone/?zipcode=${zipcode}`
      );

      const json = (await res.json()) as ZoneAPIResponse;
      console.log(json);
      
      if (json.zone) {
        setError(false);
        setData(json);
      } else {
        setError(true);
        setData({} as ZoneAPIResponse);
      }
  
    }
    void getZoneData();
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
      {data.zone && <h2>{data.zone}</h2>}
    </div>
  )
};

export default ZoneInput;
