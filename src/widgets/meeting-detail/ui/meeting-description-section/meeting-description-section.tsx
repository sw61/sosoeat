interface MeetingDescriptionSectionProps {
  description: string;
}

export function MeetingDescriptionSection({ description }: MeetingDescriptionSectionProps) {
  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-3 text-xl font-semibold md:text-2xl">모임 설명</h2>
      <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-5 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10">
        <p className="text-sosoeat-gray-800 text-base font-normal whitespace-pre-line md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
