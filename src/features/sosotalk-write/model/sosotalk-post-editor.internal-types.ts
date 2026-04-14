export type ActiveFormatKey =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'unorderedList'
  | 'orderedList'
  | 'alignCenter';

export type ActiveFormats = Record<ActiveFormatKey, boolean>;
