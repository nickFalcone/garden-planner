import { FunctionComponent } from "react";
import { ZoneAPIResponse } from "./ZoneAPIResponse";

const ZoneData: FunctionComponent<ZoneAPIResponse> = ({ zone, zipcode, rangemin}) => {
  return (
    <div>
      {zone && <p><strong>{zipcode}</strong> is in climate zone <strong>{zone}</strong>.</p>}
      {rangemin && <p><em>You can expect a winter low temperature of {rangemin} degrees Fahrenheit.</em></p>}
    </div>
  )
};

export default ZoneData;