/** 시·도+구·군 조합 배열. 미선택은 null */
export type RegionSelection =
  | {
      province: string;
      district: string;
    }[]
  | null;
