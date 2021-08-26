import { FunctionComponent } from "react";

interface Props {
  title: string;
}

const Title: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

export default Title;
