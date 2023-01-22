import type { FC, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormControl: FC<Props> = ({ label, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block mb-2">
          {label}
        </label>
      )}
      <input
        type="text"
        id={props.id}
        {...props}
        className={`py-2 px-4 rounded-md text-black w-full ${props.className}`}
      />
    </div>
  );
};

export default FormControl;
