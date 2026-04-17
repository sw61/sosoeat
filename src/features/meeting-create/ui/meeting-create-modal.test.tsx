import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeetingCreateModal } from './meeting-create-modal';

jest.mock('./_components/meeting-image-editor', () => ({
  MeetingImageEditor: ({
    imageUrl,
    onChange,
    error,
  }: {
    imageUrl?: string;
    onChange: (url: string) => void;
    error?: string;
  }) => (
    <div>
      <input
        type="file"
        aria-label="meeting-image-input"
        onChange={() => onChange('https://s3.example.com/image.jpg')}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {imageUrl ? <img alt="meeting-image-preview" src={imageUrl} /> : null}
      {error ? <p>{error}</p> : null}
    </div>
  ),
}));

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

jest.mock('@/entities/location', () => ({
  LocationSearchModal: ({
    open,
    onSelect,
  }: {
    open: boolean;
    onSelect: (result: unknown) => void;
    onClose: () => void;
  }) => {
    if (!open) return null;

    return (
      <div data-testid="location-search-modal">
        <button
          type="button"
          onClick={() =>
            onSelect({
              placeName: 'Teheran-ro 123',
              addressName: 'Seoul Gangnam-gu Yeoksam-dong',
              latitude: 37.5,
              longitude: 127.0,
              region1: 'Seoul',
              region2: 'Gangnam-gu',
            })
          }
        >
          select-location
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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

const getDialog = async () => screen.findByRole('dialog');

const getPrimaryButton = (dialog: HTMLElement) =>
  within(dialog).queryByRole('button', { name: '다음' }) ??
  within(dialog).getByRole('button', { name: '모임 만들기' });

const getSecondaryButton = (dialog: HTMLElement) =>
  within(dialog).queryByRole('button', { name: '취소' }) ??
  within(dialog).getByRole('button', { name: '이전' });

describe('MeetingCreateModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders the dialog when open is true', async () => {
    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);

    const dialog = await getDialog();

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText((_, el) => el?.textContent === '1/4')).toBeInTheDocument();
  });

  it('submits the completed form', async () => {
    const user = userEvent.setup();

    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);

    const dialog = await getDialog();
    const categoryInput = dialog.querySelector('input[type="radio"][value="groupEat"]');

    expect(categoryInput).toBeInstanceOf(HTMLInputElement);
    await user.click(categoryInput as HTMLInputElement);
    await user.click(getPrimaryButton(dialog));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '2/4')).toBeInTheDocument();
    });

    fireEvent.change(dialog.querySelector('input[name="name"]') as HTMLInputElement, {
      target: { value: 'Dinner meetup' },
    });

    await user.click(
      within(dialog).getByPlaceholderText('건물, 지번 또는 도로명 검색') as HTMLInputElement
    );
    await waitFor(() => {
      expect(screen.getByTestId('location-search-modal')).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: 'select-location' }));
    await waitFor(() => {
      expect(screen.queryByTestId('location-search-modal')).not.toBeInTheDocument();
    });

    const imageInput = dialog.querySelector('input[type="file"]') as HTMLInputElement;
    const mockImageFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    await user.upload(imageInput, mockImageFile);

    await waitFor(() => {
      expect(getPrimaryButton(dialog)).toBeEnabled();
    });

    await user.click(getPrimaryButton(dialog));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '3/4')).toBeInTheDocument();
    });

    fireEvent.change(dialog.querySelector('textarea[name="description"]') as HTMLTextAreaElement, {
      target: { value: 'Let us eat together after work.' },
    });

    await user.click(getPrimaryButton(dialog));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '4/4')).toBeInTheDocument();
    });

    const [meetingDateInput, registrationEndDateInput] =
      within(dialog).getAllByTestId('date-input');
    const [meetingTimeInput, registrationEndTimeInput] =
      within(dialog).getAllByTestId('time-input');

    fireEvent.change(meetingDateInput, { target: { value: '2026-12-31' } });
    fireEvent.change(meetingTimeInput, { target: { value: '19:00' } });
    fireEvent.change(registrationEndDateInput, { target: { value: '2026-12-30' } });
    fireEvent.change(registrationEndTimeInput, { target: { value: '18:00' } });
    fireEvent.change(dialog.querySelector('input[name="capacity"]') as HTMLInputElement, {
      target: { value: '10' },
    });

    await waitFor(() => {
      expect(getPrimaryButton(dialog)).toBeEnabled();
    });

    await user.click(getPrimaryButton(dialog));

    await waitFor(() => {
      expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalled();
    });

    expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'groupEat',
        name: 'Dinner meetup',
        region: 'Seoul Gangnam-gu',
        image: 'https://s3.example.com/image.jpg',
        description: 'Let us eat together after work.',
        dateTime: new Date('2026-12-31T19:00'),
        registrationEnd: new Date('2026-12-30T18:00'),
        capacity: 10,
      })
    );
  });

  it('moves back to the previous step', async () => {
    const user = userEvent.setup();

    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);

    const dialog = await getDialog();
    const categoryInput = dialog.querySelector('input[type="radio"][value="groupEat"]');

    await user.click(categoryInput as HTMLInputElement);
    await user.click(getPrimaryButton(dialog));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '2/4')).toBeInTheDocument();
    });

    await user.click(getSecondaryButton(dialog));

    await waitFor(() => {
      expect(within(dialog).getByText((_, el) => el?.textContent === '1/4')).toBeInTheDocument();
    });

    expect(dialog.querySelector('input[type="radio"][value="groupEat"]')).toBeChecked();
  });

  it('calls onClose when cancel is pressed on the first step', async () => {
    const user = userEvent.setup();

    renderWithClient(<MeetingCreateModal {...DEFAULT_PROPS} />);

    const dialog = await getDialog();

    await user.click(getSecondaryButton(dialog));

    expect(DEFAULT_PROPS.onClose).toHaveBeenCalled();
  });
});
