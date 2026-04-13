import type { LocationSearchResult } from './location.types';

export interface LocationSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (result: LocationSearchResult) => void;
  mapClassName?: string;
}
