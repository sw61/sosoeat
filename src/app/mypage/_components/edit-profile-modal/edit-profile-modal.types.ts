export type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  onSubmit?: (name: string, email: string) => void;
};
