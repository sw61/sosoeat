export type LocalDroupDownProp = {
  data: { label: string; options: string[] }; //들어올값의 형태
  value: Record<string, string>; //선택할 값
  onChange: (value: Record<string, string>) => void;
};
