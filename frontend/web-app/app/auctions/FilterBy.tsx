import { Button, ButtonGroup } from "flowbite-react";
import { IconType } from "react-icons";

type Buttons = { label: string; icon: IconType; value: string }[];
type Props = {
  buttons: Buttons;
  value: string;
  setParams: (value: string) => void;
  label: string;
};
const FilterBy = ({ buttons, value, setParams, label }: Props) => {
  return (
    <div>
      <span className="uppercase text-sm text-gray-500 mr-2">{label}</span>
      <ButtonGroup>
        {buttons.map((button) => (
          <Button
            key={button.value}
            onClick={() => setParams(button.value)}
            color={`${value === button.value ? "red" : "gray"}`}
            size="sm"
            className="focus:ring-0"
          >
            <button.icon className="mr-3 h-4 w-4" />
            {button.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FilterBy;
