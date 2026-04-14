import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeetingCreateModal } from './meeting-create-modal';

// useUploadImage mock — 이미지 업로드를 즉시 성공으로 처리
jest.mock('@/entities/image', () => ({
  useUploadImage: () => ({
    mutateAsync: jest.fn().mockResolvedValue('https://s3.example.com/image.jpg'),
    data: undefined,
    isPending: false,
    error: null,
  }),
  MIME_TO_EXT: {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  },
}));

// DateTimePicker mock — JSDOM에서 Popover 기반 picker 조작 불가, hidden input으로 대체
jest.mock('@/shared/ui/date-picker/date-time-picker', () => ({
  DateTimePicker: ({
    dateValue,
    timeValue,
    onDateChange,
    onTimeChange,
    children,
  }: {
    dateValue?: string;
    timeValue?: string;
    onDateChange: (v: string) => void;
    onTimeChange: (v: string) => void;
    children?: React.ReactNode;
  }) => (
    <div>
      <input
        type="text"
        data-testid="date-input"
        defaultValue={dateValue ?? ''}
        onChange={(e) => onDateChange(e.target.value)}
        style={{ display: 'none' }}
      />
      <input
        type="text"
        data-testid="time-input"
        defaultValue={timeValue ?? ''}
        onChange={(e) => onTimeChange(e.target.value)}
        style={{ display: 'none' }}
      />
      {children}
    </div>
  ),
}));

// LocationSearchModal mock — 장소 검색 모달 자체는 별도 테스트, 여기선 선택 동작만 검증
jest.mock('@/entities/location', () => ({
  LocationSearchModal: ({
    open,
    onSelect,
  }: {
    open: boolean;
    onSelect: (r: unknown) => void;
    onClose: () => void;
  }) => {
    if (!open) return null;
    return (
      <div data-testid="location-search-modal">
        <button
          onClick={() =>
            onSelect({
              placeName: '테헤란로 123',
              addressName: '서울 강남구 여의도동',
              latitude: 37.5,
              longitude: 127.0,
              region1: '서울',
              region2: '강남구',
            })
          }
        >
          장소선택
        </button>
      </div>
    );
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const renderWithClient = (ui: React.ReactElement) => render(ui, { wrapper: createWrapper() });

// Radix UI Dialog needs ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// PointerEvent might be needed for Radix UI
if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    constructor(type: string, props: PointerEventInit = {}) {
      super(type, props);
    }
  }
  global.PointerEvent = PointerEvent as unknown as typeof global.PointerEvent;
}

const DEFAULT_PROPS = {
  open: true,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
};

describe('MeetingCreateModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('open이 true일 때 모달이 렌더링된다', () => {
    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText((_, el) => el?.textContent === '1/4')).toBeInTheDocument();
    expect(within(dialog).getByRole('heading', { name: '카테고리 선택' })).toBeInTheDocument();
  });

  it('전체 폼을 작성하고 제출하면 onSubmit이 호출된다', async () => {
    const user = userEvent.setup();
    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);
    const dialog = screen.getByRole('dialog');

    // Step 1: Category
    await user.click(within(dialog).getByLabelText('함께먹기'));
    await user.click(within(dialog).getByRole('button', { name: '다음' }));

    // Step 2: Basic Info
    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '2/4')).toBeInTheDocument();
    });
    await user.type(
      within(dialog).getByPlaceholderText('모임 이름을 입력해 주세요'),
      '맛있는 삼겹살 모임'
    );

    // 장소: readOnly input 클릭 → LocationSearchModal mock에서 장소 선택
    await user.click(within(dialog).getByPlaceholderText('건물, 지번 또는 도로명 검색'));
    await waitFor(() => {
      expect(screen.getByTestId('location-search-modal')).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: '장소선택' }));
    await waitFor(() => {
      expect(screen.queryByTestId('location-search-modal')).not.toBeInTheDocument();
    });

    // 이미지 업로드 (mock: 즉시 publicUrl 반환)
    const imageInput = dialog.querySelector('input[type="file"]') as HTMLInputElement;
    const mockImageFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    await user.upload(imageInput, mockImageFile);
    await waitFor(() => {
      expect(within(dialog).getByRole('button', { name: '다음' })).toBeEnabled();
    });

    await user.click(within(dialog).getByRole('button', { name: '다음' }));

    // Step 3: Description
    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '3/4')).toBeInTheDocument();
    });
    await user.type(
      within(dialog).getByPlaceholderText('모임을 설명해주세요'),
      '같이 삼겹살 먹어요!'
    );
    await user.click(within(dialog).getByRole('button', { name: '다음' }));

    // Step 4: Schedule
    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '4/4')).toBeInTheDocument();
    });

    // DateTimePicker는 mock으로 hidden input 2쌍 렌더링 (모임 일정, 모집 마감 순서)
    const [meetingDateInput, registrationEndDateInput] =
      within(dialog).getAllByTestId('date-input');
    const [meetingTimeInput, registrationEndTimeInput] =
      within(dialog).getAllByTestId('time-input');
    const capacityInput = within(dialog).getByPlaceholderText('최소 2명 이상 입력해 주세요.');

    fireEvent.change(meetingDateInput, { target: { value: '2026-12-31' } });
    fireEvent.change(meetingTimeInput, { target: { value: '19:00' } });
    fireEvent.change(registrationEndDateInput, { target: { value: '2026-12-30' } });
    fireEvent.change(registrationEndTimeInput, { target: { value: '18:00' } });
    await user.clear(capacityInput);
    await user.type(capacityInput, '10');

    const submitButton = within(dialog).getByRole('button', { name: '모임 만들기' });

    await waitFor(
      () => {
        const btn = within(dialog).getByRole('button', { name: '모임 만들기' });
        expect(btn).toBeEnabled();
      },
      { timeout: 3000 }
    );

    await user.click(submitButton);

    await waitFor(
      () => {
        expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );

    expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'groupEat',
        name: '맛있는 삼겹살 모임',
        region: '서울 강남구',
        image: 'https://s3.example.com/image.jpg',
        description: '같이 삼겹살 먹어요!',
        dateTime: new Date('2026-12-31T19:00'),
        registrationEnd: new Date('2026-12-30T18:00'),
        capacity: 10,
      })
    );
  });

  it('이전 버튼을 누르면 이전 단계로 돌아간다', async () => {
    const user = userEvent.setup();
    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);
    const dialog = screen.getByRole('dialog');

    await user.click(within(dialog).getByLabelText('함께먹기'));
    await user.click(within(dialog).getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '2/4')).toBeInTheDocument();
    });

    await user.click(within(dialog).getByRole('button', { name: '이전' }));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '1/4')).toBeInTheDocument();
    });
    expect(within(dialog).getByLabelText('함께먹기')).toBeChecked();
  });

  it('취소 버튼을 누르면 onClose가 호출된다', async () => {
    const user = userEvent.setup();
    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);
    const dialog = screen.getByRole('dialog');

    // 1단계에서 취소 버튼 클릭
    const cancelBtn = within(dialog).getByRole('button', { name: '취소' });
    await user.click(cancelBtn);

    expect(DEFAULT_PROPS.onClose).toHaveBeenCalled();
  });
});
