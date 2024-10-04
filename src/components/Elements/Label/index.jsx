import { Label } from "flowbite-react";
import React from "react";

const ComponentLabel = (props) => {
  const { htmlFor, value } = props;
  return (
    <div>
      <Label htmlFor={htmlFor} value={value} />
    </div>
  );
};

export default ComponentLabel;
