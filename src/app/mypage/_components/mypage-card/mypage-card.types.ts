export interface MyPageCardProps {
  title: string;
  currentCount: number;
  maxCount: number;
  location: string;
  month: number;
  day: number;
  hour: number;
  minute: number;
  imageUrl?: string;
  imageAlt?: string;
  variant: 'groupBuy' | 'groupEat';
  confirmedAt?: Date | null;
  className?: string;
}
