import { TextInput } from "flowbite-react";

const Input = (props) => {
  const { id, type, placeholder, value, onChange } = props;
  return (
    <div className="w-full">
      <TextInput
        color="gray"
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
