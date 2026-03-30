export interface DropdownSimpleProp {
  options: string[];
  placeholder?: React.ReactNode;
  value: string | null;
  onChange: (value: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}
