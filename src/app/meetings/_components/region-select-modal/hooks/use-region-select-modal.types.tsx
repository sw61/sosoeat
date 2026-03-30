import {
  RegionModalDropdownSub,
  RegionSelection,
  RegionSelectModalProps,
} from '../region-select-modal.types';

export interface UseRegionSelectModalParams {
  dropdownSub: RegionModalDropdownSub | undefined;
  regionCascade: RegionSelectModalProps['regionCascade'];
  draftValueProp: RegionSelection | undefined;
  onDraftChange: RegionSelectModalProps['onDraftChange'];
}
