import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegionSelectModal } from '@/app/meetings/_components/region-select-modal';
import type { RegionSelection } from '@/app/meetings/_components/region-select-modal/region-select-modal.type';
import { Button } from '@/components/ui/button/button';

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

  it('description이 있으면 본문에 표시된다', async () => {
    const user = userEvent.setup();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        description="설명 문구입니다."
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));

    expect(await screen.findByText('설명 문구입니다.')).toBeInTheDocument();
  });

  it('dropdownSub가 없으면 취소·확인 없이 닫기 경로만 있다 (헤더 X + 푸터 닫기)', async () => {
    const user = userEvent.setup();

    render(<RegionSelectModal trigger={<Button type="button">열기</Button>} title="안내" />);

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    expect(screen.queryByRole('button', { name: '취소' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '확인' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '닫기' })).toHaveLength(2);
  });

  it('dropdownSub가 있으면 취소·확인과 헤더 닫기(X)가 있다', async () => {
    const user = userEvent.setup();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={dropdownFixture}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));

    expect(await screen.findByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '닫기' })).toHaveLength(1);
  });

  it('확인 시 dropdownSub.onChange에 draft를 넘기고 다이얼로그가 닫힌다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={{
          ...dropdownFixture,
          value: { province: '서울', district: '강남구' },
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: '확인' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ province: '서울', district: '강남구' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('취소 시 onChange는 호출되지 않고 다이얼로그만 닫힌다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <RegionSelectModal
        trigger={<Button type="button">열기</Button>}
        title="지역 선택"
        dropdownSub={{
          ...dropdownFixture,
          value: { province: '서울', district: '강남구' },
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(onChange).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('외부 draft 제어 시 열릴 때 onDraftChange로 확정값이 시드된다', async () => {
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
          value: { province: '서울', district: '서초구' },
          onChange,
        }}
      />
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await screen.findByRole('dialog');

    expect(onDraftChange).toHaveBeenCalledWith({ province: '서울', district: '서초구' });
  });

  it('contentClassName이 Dialog 루트에 합쳐진다', async () => {
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

  it('regionCascade일 때 시·도를 누르면 구·군이 드롭다운 메뉴로 펼쳐진다', async () => {
    const user = userEvent.setup();
    const cascadeRegions = [
      { id: 'seoul', name: '서울특별시', nameEn: 'Seoul', districts: ['강남구', '서초구'] },
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

    await user.click(screen.getByRole('button', { name: '서울특별시' }));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitemcheckbox', { name: '강남구' })).toBeInTheDocument();
    expect(screen.getByRole('menuitemcheckbox', { name: '서초구' })).toBeInTheDocument();
  });
});
