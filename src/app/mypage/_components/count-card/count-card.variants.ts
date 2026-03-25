import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'hidden md:flex flex flex-col gap-1 rounded-2xl text-center ring-0 lg:h-20 lg:w-90 max-lg:h-17.5 max-lg:w-52.5',
  {
    variants: {
      variant: {
        meeting: 'bg-sosoeat-orange-100',
        favorite: 'bg-[#FFF0F0]',
        post: 'bg-sosoeat-blue-50',
      },
    },
    defaultVariants: {
      variant: 'meeting',
    },
  }
);

export const countVariants = cva('text-base leading-6 font-black', {
  variants: {
    variant: {
      meeting: 'text-sosoeat-orange-600',
      favorite: 'text-[#EF4444]',
      post: 'text-sosoeat-blue-500',
    },
  },
  defaultVariants: {
    variant: 'meeting',
  },
});
