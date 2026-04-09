interface MeetingDescriptionSectionProps {
  description: string;
}

export function MeetingDescriptionSection({ description }: MeetingDescriptionSectionProps) {
  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 설명</h2>
      <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-12 py-10">
        <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-line">
          {description}
        </p>
      </div>
    </section>
  );
}
