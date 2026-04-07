import { renderHook } from '@testing-library/react';

import { useIsMaxWidth767 } from './use-is-max-width-767';

describe('useIsMaxWidth767', () => {
  it('matchMedia가 없으면 false', () => {
    const { result } = renderHook(() => useIsMaxWidth767());
    expect(result.current).toBe(false);
  });
});
