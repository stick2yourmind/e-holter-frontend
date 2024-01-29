export default function SkeletonRecordCard() {
  return (
    <div className="h-[18.3rem] w-[17rem] rounded-md border-2 border-slate-600 p-6">
      <div className="flex animate-pulse flex-col  gap-2">
        <div className="h-16 w-full rounded-md bg-gray-300 "></div>
        <div className="h-16 w-full rounded-md bg-gray-300 "></div>
        <div className="h-16 w-full rounded-md bg-gray-300 "></div>
        <div className="h-6 w-1/2 self-end rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}
