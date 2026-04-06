type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];

declare module '*.json' {
  const value: JsonValue;
  export default value;
}
