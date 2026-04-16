export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** 루트 컨테이너에 합쳐진다 */
  className?: string;
  error?: string;
}
