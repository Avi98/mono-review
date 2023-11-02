import { useMemo, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useToggle } from "../hooks/use-toggle";
import { ISelect } from "./type";
import { useOnClickOutside } from "../hooks/use-onclick-outside";
import { cn } from "../../utils/classNameMerge";
import { SelectProvider } from "./provider/SelectProvider";
import { Options } from "./Options";

export function Select(props: ISelect) {
  const { toggle, open } = useToggle();
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({ ref: selectRef, handler: toggle });

  const handleOnChange = (value: any) => {
    if (typeof value === "string") props.onChange(value);
    toggle();
  };

  const baseSelectClass = useMemo(
    () =>
      cn(
        [
          "flex",
          "outline-border",
          "bg-background",
          "cursor-pointer",
          "rounded",
          "px-2 py-1.5",
          "shadow-sm",
          "outline",
          "outline-1",
          "outline-offset-2",
          "transition-all",
          "duration-300",
          "focus:ring-blue-500/20",
        ],
        props.disabled && ["bg-background/30", "cursor-not-allowed"]
      ),
    [props.disabled]
  );
  return (
    <SelectProvider
      handleChange={handleOnChange}
      value={props.value}
      isOpen={open}
      selectEle={selectRef}
    >
      <div ref={selectRef} aria-expanded={open} className="relative">
        <div className="relative w-full" onClick={toggle}>
          <div className={baseSelectClass}>
            <p className="select-none truncate">
              {props.value && !Array.isArray(props.value)
                ? props.value.label
                : props.placeholder}
            </p>
            <ChevronDown
              className={cn("h-6 w-6 p-0.5 transition duration-300", {
                "rotate-180 text-gray-100": !props.disabled && open,
                "text-gray-300": !open,
              })}
            />
          </div>
        </div>
        <Options options={props.options} />
      </div>
    </SelectProvider>
  );
}
