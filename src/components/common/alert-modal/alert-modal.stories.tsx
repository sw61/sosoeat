import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AlertModal } from './alert-modal';

const meta = {
  title: 'Components/common/alert-modal',
  component: AlertModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    // 모든 스토리의 공통 기본값
    open: true,
    title: '로그인이 필요한 서비스입니다.',
    onCancel: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    open: {
      description: '모달 표시 여부',
      control: 'boolean',
    },
    title: {
      description: '모달 타이틀 (필수)',
      control: 'text',
    },
    description: {
      description: '추가 설명 텍스트',
      control: 'text',
    },
    cancelText: {
      description: '우측 1번째 버튼 텍스트',
      control: 'text',
    },
    confirmText: {
      description: '우측 2번째 버튼 텍스트',
      control: 'text',
    },
    dismissible: {
      description: '외부 클릭/ESC로 닫기 허용 여부',
      control: 'boolean',
    },
    onCancel: {
      description: '취소 버튼 또는 모달 닫기 콜백',
      action: 'onCancel',
    },
    onConfirm: {
      description: '확인 버튼 클릭 콜백',
      action: 'onConfirm',
    },
  },
} satisfies Meta<typeof AlertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기본 (기존 로그인 유도 역할) ─────────────────────

/** 가장 흔한 로그인 유도 혹은 안내용 */
export const Default: Story = {
  name: '기본 안내',
};

// ── 경고/재확인 포함 상태 (커스텀 텍스트) ──────────────

/** 버튼 텍스트와 타이틀/설명을 모두 변경해 재확인 용도로 활용 */
export const AsConfirmDialog: Story = {
  name: '데이터 삭제 재확인',
  args: {
    title: '정말 삭제하시겠습니까?',
    description: '삭제된 데이터는 다시 복구할 수 없습니다.',
    cancelText: '취소',
    confirmText: '삭제하기',
  },
};

// ── dismissible 비활성화 ──────────────────────────────

/** 외부 클릭 및 ESC 키로 닫기 비활성화된 상태 (버튼으로만 액션 강제) */
export const NonDismissible: Story = {
  name: '닫기 비활성화 (dismissible=false)',
  args: {
    title: '약관에 동의해주세요',
    description: '이용약관 동의 후 서비스를 이용하실 수 있습니다.',
    dismissible: false,
    cancelText: '뒤로가기',
    confirmText: '동의하기',
  },
};
