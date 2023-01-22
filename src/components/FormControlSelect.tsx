import type { FC, SelectHTMLAttributes } from "react";

type Props = {
  label?: string;
  options: Array<{
    value: string;
    name?: string;
  }>;
} & SelectHTMLAttributes<HTMLSelectElement>;

const FormControlSelect: FC<Props> = ({ label, options, ...props }) => {
  const optionsFormatted = [
    {
      value: "",
      name: "Select an option",
    },
    ...options,
  ];

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block mb-2">
          {label}
        </label>
      )}
      <select
        name="username"
        id={props.id}
        {...props}
        className={`py-2 px-4 rounded-md text-black w-full ${props.className}`}
      >
        {optionsFormatted.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name || option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormControlSelect;
