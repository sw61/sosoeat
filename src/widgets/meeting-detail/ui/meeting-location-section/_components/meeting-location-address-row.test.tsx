import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { writeClipboardText } from '@/shared/lib/write-clipboard-text';

import { MeetingLocationAddressRow } from './meeting-location-address-row';

jest.mock('@/shared/lib/write-clipboard-text', () => ({
  writeClipboardText: jest.fn(),
}));
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedWriteClipboardText = jest.mocked(writeClipboardText);

const TEST_ADDRESS = '서울 강남구 테헤란로 123';

beforeEach(() => {
  jest.clearAllMocks();
  mockedWriteClipboardText.mockResolvedValue(undefined);
});

describe('MeetingLocationAddressRow', () => {
  it('주소 텍스트와 복사 버튼이 렌더링된다', () => {
    render(<MeetingLocationAddressRow address={TEST_ADDRESS} />);

    expect(screen.getByText(TEST_ADDRESS)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '주소 복사' })).toBeInTheDocument();
  });

  it('복사 버튼 클릭 시 clipboard.writeText가 주소와 함께 호출된다', async () => {
    const user = userEvent.setup();
    render(<MeetingLocationAddressRow address={TEST_ADDRESS} />);

    await user.click(screen.getByRole('button', { name: '주소 복사' }));

    await waitFor(() => {
      expect(mockedWriteClipboardText).toHaveBeenCalledWith(TEST_ADDRESS);
    });
  });

  it('복사 성공 시 toast.success가 호출된다', async () => {
    const user = userEvent.setup();
    render(<MeetingLocationAddressRow address={TEST_ADDRESS} />);

    await user.click(screen.getByRole('button', { name: '주소 복사' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('주소가 복사되었습니다.');
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('복사 실패 시 toast.error가 호출된다', async () => {
    mockedWriteClipboardText.mockRejectedValue(new Error('denied'));
    const user = userEvent.setup();
    render(<MeetingLocationAddressRow address={TEST_ADDRESS} />);

    await user.click(screen.getByRole('button', { name: '주소 복사' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('복사에 실패했습니다.');
    });
    expect(toast.success).not.toHaveBeenCalled();
  });
});
