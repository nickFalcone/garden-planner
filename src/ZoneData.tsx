import { FunctionComponent } from "react";
import { ZoneAPIResponse } from "./ZoneAPIResponse";

const ZoneData: FunctionComponent<ZoneAPIResponse> = ({ zone, zipcode, rangemin, error }) => {
  return (
    <div
      role="region"
      id="zoneInfo"
      aria-live="polite"
    >
      {!error && zone && <p><strong>{zipcode}</strong> is in climate zone <strong>{zone}</strong>.</p>}
      {!error && rangemin && <p><em>You can expect a winter low temperature of {rangemin} degrees Fahrenheit.</em></p>}
      {error && <p>Error retrieving climate zone data.</p>}
    </div>
  )
};

export default ZoneData;