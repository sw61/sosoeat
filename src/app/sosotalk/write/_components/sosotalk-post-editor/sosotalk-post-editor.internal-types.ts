export type ActiveFormatKey =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'unorderedList'
  | 'orderedList'
  | 'alignLeft'
  | 'alignCenter';

export type ActiveFormats = Record<ActiveFormatKey, boolean>;
