import { FunctionComponent } from "react";

interface Props {
  list: Array<string>;
}

const Features: FunctionComponent<Props> = (props) => {
  const listItems = props.list.map((feature, index) => (
    <li key={index}>{feature}</li>
  ));
  return <ul>{listItems}</ul>;
};

export default Features;
