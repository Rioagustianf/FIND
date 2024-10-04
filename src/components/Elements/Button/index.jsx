import { Button } from "flowbite-react";

const PrimButton = (props) => {
  const { type = "button", children, href } = props;
  return (
    <Button
      type={type}
      href={href}
      className="w-full font-bold px-4 rounded"
      color="warning"
    >
      {children}
    </Button>
  );
};

export default PrimButton;
