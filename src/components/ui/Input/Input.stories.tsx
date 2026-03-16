import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Eye, EyeOff } from 'lucide-react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '입력 필드 레이블' },
    errorMessage: { control: 'text', description: '에러 메시지 (외부 폼에서 주입)' },
    placeholder: { control: 'text', description: 'placeholder 텍스트' },
    required: { control: 'boolean', description: '필수 입력 여부' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본
export const Default: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
  },
};

// 필수 입력
export const Required: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    required: true,
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    label: '아이디',
    defaultValue: 'codeit',
    errorMessage: '이메일 형식이 아닙니다.',
    required: true,
  },
};

// 비밀번호 (눈 아이콘)
export const Password: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <Input
        label="비밀번호"
        type={show ? 'text' : 'password'}
        placeholder="비밀번호를 입력하세요"
        required
        rightAddon={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="text-sosoeat-gray-400 hover:text-sosoeat-gray-600 transition-colors"
            aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        }
      />
    );
  },
};

// 비밀번호 에러 상태
export const PasswordError: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('1234');

    return (
      <Input
        label="비밀번호"
        type={show ? 'text' : 'password'}
        defaultValue={value}
        errorMessage={value.length < 8 ? '8자 이상 입력해주세요.' : ''}
        required
        rightAddon={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="text-sosoeat-gray-400 hover:text-sosoeat-gray-600 transition-colors"
            aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        }
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    );
  },
};

// 로그인 폼 미리보기
export const LoginFormPreview: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <div className="w-80 space-y-4">
        <Input label="아이디" type="email" placeholder="이메일을 입력하세요" required />
        <Input
          label="비밀번호"
          type={show ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          required
          rightAddon={
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="text-sosoeat-gray-400 hover:text-sosoeat-gray-600 transition-colors"
              aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          }
        />
      </div>
    );
  },
};

//  회원가입 폼 미리보기
export const SignupFormPreview: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
      <div className="w-80 space-y-4">
        <Input label="이름" type="text" placeholder="이름을 입력하세요" required />
        <Input label="이메일" type="email" placeholder="이메일을 입력하세요" required />
        <Input
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          required
          rightAddon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-sosoeat-gray-400 hover:text-sosoeat-gray-600 transition-colors"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          }
        />
        <Input
          label="비밀번호 확인"
          type={showConfirm ? 'text' : 'password'}
          placeholder="비밀번호를 다시 입력하세요"
          required
          rightAddon={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-sosoeat-gray-400 hover:text-sosoeat-gray-600 transition-colors"
              aria-label={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          }
        />
      </div>
    );
  },
};
