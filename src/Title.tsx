import { FunctionComponent } from "react";

interface Props {
  title: string;
}

const Title: FunctionComponent<Props> = ({ title }) => {
  return <h1>{title}</h1>
};

export default Title;
