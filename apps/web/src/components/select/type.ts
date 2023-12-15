import { FieldError } from "react-hook-form";

export interface ISelect {
  options: IOption[];
  onChange: (value: string) => void;
  value?: Array<IOption> | IOption;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  isClearable?: boolean;
  error?: FieldError | string;
}

export interface IOption {
  label: string;
  value: string;
}

export type IOptions = Array<IOption>;
