import { HelperText, Label } from "flowbite-react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  DatePickerProps;

const DateInput = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}
      <DatePicker
        {...props}
        {...field}
        placeholderText={props.label}
        selected={field.value}
        className={`
                        rounded-lg w-[100%] flex flex-col h-[100%] p-2.5 border-1
                        ${
                          fieldState.error
                            ? "bg-red-50 border-red-500 text-red-900"
                            : !fieldState.invalid && fieldState.isDirty
                            ? "bg-green-50 border-green-500 text-green-900"
                            : ""
                        }
                    `}
      />
      <HelperText color="failure">{fieldState.error?.message}</HelperText>
    </div>
  );
};

export default DateInput;
