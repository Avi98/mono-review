import { useMemo, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useToggle } from "../hooks/use-toggle";
import { IOption, ISelect } from "./type";
import { useOnClickOutside } from "../hooks/use-onclick-outside";
import { cn } from "../../utils/classNameMerge";
import { SelectProvider } from "./provider/SelectProvider";
import { Options } from "./Options";
import { baseFieldStyle, errorFieldBaseStyle } from "../utils/baseFieldStyles";
import { ErrorSubField } from "../error/ErrorField";

export function Select(props: ISelect) {
  const { toggle, open, onClose } = useToggle();
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({ ref: selectRef, handler: onClose });

  const handleOnChange = (value: any) => {
    props.onChange(value);
    toggle();
  };

  const baseSelectClass = useMemo(
    () =>
      cn(
        [
          "flex",
          "justify-between",
          "cursor-pointer",
          "rounded",
          "px-2 py-1.5",
          "shadow-sm",
          "transition-all",
          "duration-300",
          "focus:ring-blue-500/20",
        ],
        props.disabled && ["bg-background/30", "cursor-not-allowed"],
        baseFieldStyle,
        props.error && errorFieldBaseStyle
      ),
    [props.disabled, props.error]
  );

  const hasValue = props.value && !Array.isArray(props.value);
  return (
    <SelectProvider
      handleChange={handleOnChange}
      value={props.value}
      isOpen={open}
      selectEle={selectRef}
    >
      <div
        ref={selectRef}
        aria-expanded={open}
        className="relative w-full"
        tabIndex={0}
      >
        <div className="relative" onClick={toggle}>
          <div className={baseSelectClass}>
            <p
              className={cn(
                hasValue ? "select-none truncate " : "text-muted-foreground"
              )}
            >
              {hasValue ? (props.value as IOption).label : props.placeholder}
            </p>
            <ChevronDown
              className={cn("h-6 w-6 p-0.5 transition duration-300", {
                "rotate-180 text-gray-100": !props.disabled && open,
                "text-gray-300": !open,
              })}
            />
          </div>
        </div>
        <ErrorSubField error={props.error} />
        <Options options={props.options} />
      </div>
    </SelectProvider>
  );
}
