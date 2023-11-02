import { cn } from "../../utils/classNameMerge";
import { useSelect } from "./provider/SelectProvider";
import { IOption } from "./type";

interface IOptions {
  options: Array<IOption>;
}

const List = (props: { options: IOption[] }) => {
  const { handleChange } = useSelect();
  return (
    <>
      {props.options.map((option, i) => (
        <div
          className="hover:bg-optionBg flex cursor-pointer items-center rounded-sm p-2"
          onClick={() => handleChange(option.value)}
          key={`${option.value}-${i}`}
        >
          {option.label}
        </div>
      ))}
    </>
  );
};

export const Options = (props: IOptions) => {
  const {
    isOpen,
    optionPos: { top, left, width },
  } = useSelect();

  return (
    <div
      className={cn(
        "bg-popover text-popover-foreground outline-border absolute rounded p-2 outline outline-1",
        {
          hidden: !isOpen,
        }
      )}
      style={{
        top,
        width,
      }}
    >
      <List options={props.options} />
    </div>
  );
};
