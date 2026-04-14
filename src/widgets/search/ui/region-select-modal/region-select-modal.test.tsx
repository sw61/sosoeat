import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/shared/ui/button/button';

import { RegionSelectModal } from './region-select-modal';
import type { RegionSelection } from './region-select-modal.types';

const dropdownFixture = {
  data: { label: '서울', options: ['강남구', '서초구'] as string[] },
  value: null as RegionSelection,
  onChange: jest.fn(),
};

describe('RegionSelectModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('트리거를 누르면 다이얼로그가 열리고 제목이 보인다', async () => {
    const user = userEvent.setup();

    render(<RegionSelectModal trigger={<Button type="button">열기</Button>} title="지역 선택" />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '지역 선택' })).toBeInTheDocument();
  });

  it('dropdownSub가 없으면 닫기 경로만 노출된다', async () => {
    const user = userEvent.setup();

    render(<RegionSelectModal trigger={<Button type="button">열기</Button>} title="안내" />);

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    expect(screen.queryByRole('button', { name: '초기화' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '확인' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '닫기' })).toHaveLength(2);
  });

  it('dropdownSub가 있으면 초기화, 확인, 헤더 닫기 버튼이 보인다', async () => {
    const user = userEvent.setup();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={dropdownFixture}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));

    expect(await screen.findByRole('button', { name: '초기화' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '닫기' })).toHaveLength(1);
  });

  it('확인 시 dropdownSub.onChange에 draft가 전달되고 다이얼로그가 닫힌다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={{
          ...dropdownFixture,
          value: [{ province: '서울', district: '강남구' }],
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([{ province: '서울', district: '강남구' }]);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('열릴 때 draftValue 대신 확정값이 onDraftChange로 동기화된다', async () => {
    const user = userEvent.setup();
    const onDraftChange = jest.fn();
    const onChange = jest.fn();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        draftValue={null}
        onDraftChange={onDraftChange}
        dropdownSub={{
          ...dropdownFixture,
          value: [{ province: '서울', district: '서초구' }],
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    expect(onDraftChange).toHaveBeenCalledWith([{ province: '서울', district: '서초구' }]);
  });

  it('초기화 클릭 후 확인하면 onChange에 null이 전달된다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={{
          ...dropdownFixture,
          value: [{ province: '서울', district: '강남구' }],
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: '초기화' }));
    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('regionCascade에서 여러 구를 선택하면 배열 전체가 전달된다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const cascadeRegions = [
      { id: 'seoul', name: '서울', nameEn: 'Seoul', districts: ['강남구', '서초구'] },
    ];

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        regionCascade={{ regions: cascadeRegions }}
        dropdownSub={{
          data: { label: '_', options: [] },
          value: null,
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: '서울' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: '강남구' }));

    await user.click(screen.getByRole('button', { name: /서울/ }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: '서초구' }));

    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        { province: '서울', district: '강남구' },
        { province: '서울', district: '서초구' },
      ])
    );
  });

  it('contentClassName이 Dialog 루트에 적용된다', async () => {
    const user = userEvent.setup();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        contentClassName="region-modal-test-class"
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveClass('region-modal-test-class');
  });

  it('regionCascade에서 시도를 누르면 구 선택 드롭다운 메뉴가 열린다', async () => {
    const user = userEvent.setup();
    const cascadeRegions = [
      { id: 'seoul', name: '서울', nameEn: 'Seoul', districts: ['강남구', '서초구'] },
    ];

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        regionCascade={{ regions: cascadeRegions }}
        dropdownSub={{
          data: { label: '_', options: [] },
          value: null,
          onChange: jest.fn(),
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    expect(screen.getByRole('list', { name: '시·도 목록' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '서울' }));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitemcheckbox', { name: '강남구' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemcheckbox', { name: '서초구' })).toBeInTheDocument();
  });
});
