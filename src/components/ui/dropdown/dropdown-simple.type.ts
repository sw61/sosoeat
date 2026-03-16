export type DropdownSimpleProp = {
  options: string[];
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
};
