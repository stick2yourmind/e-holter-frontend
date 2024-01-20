'use client';
import { Bruno_Ace_SC } from 'next/font/google';
import formatRelativeDate from '@/util/formatRelativeDate';

const brunoAceSc = Bruno_Ace_SC({
  subsets: ['latin'],
  weight: '400',
});

export interface RecordCardProps {
  maxPressure: number;
  minPressure: number;
  pulse: number;
  date: string;
}

export default function RecordCard({ maxPressure, minPressure, pulse, date }: RecordCardProps) {
  return (
    <article
      className={`${brunoAceSc.className} flex flex-col  text-[color:#14b8a6] bg-[#182138] p-6 rounded-md shadow-sm shadow-slate-800`}
    >
      <div className="flex gap-2">
        <p className="text-6xl min-w-32 text-right">{maxPressure}</p>
        <div className="flex justify-center items-center">
          <span className="min-w-12">SYS</span>
          <span className="text-xs text-[color:#E3E7EE]">mmHg</span>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="text-6xl min-w-32 text-right">{minPressure}</p>
        <div className="flex justify-center items-center">
          <span className="min-w-12">DIA</span>
          <span className="text-xs text-[color:#E3E7EE]">mmHg</span>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="text-6xl min-w-32 text-right">{pulse}</p>
        <div className="flex justify-center items-center">
          <span className="min-w-12">P/min</span>
        </div>
      </div>
      <span className="self-end text-[color:#E3E7EE] text-sm pt-4">{formatRelativeDate(date)}</span>
    </article>
  );
}
