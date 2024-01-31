'use client';
import { Bruno_Ace_SC } from 'next/font/google';
import formatRelativeDate from '@/util/formatRelativeDate';

const brunoAceSc = Bruno_Ace_SC({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
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
      className={`${brunoAceSc.className} flex max-w-64  flex-col rounded-md bg-[#182138] p-6 text-[color:#14b8a6] shadow-sm shadow-slate-800`}
    >
      <button className="self-end rounded px-2 py-1 text-sm text-[color:#E3E7EE] outline outline-1 outline-[color:#475569]">
        Details &gt;
      </button>
      <div className="flex gap-2">
        <p className="min-w-32 text-right text-6xl">{maxPressure}</p>
        <div className="flex items-center justify-center">
          <span className="min-w-12">SYS</span>
          <span className="text-xs text-[color:#E3E7EE]">mmHg</span>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-32 text-right text-6xl">{minPressure}</p>
        <div className="flex items-center justify-center">
          <span className="min-w-12">DIA</span>
          <span className="text-xs text-[color:#E3E7EE]">mmHg</span>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="min-w-32 text-right text-6xl">{pulse}</p>
        <div className="flex items-center justify-center">
          <span className="min-w-12">P/min</span>
        </div>
      </div>
      <span className="self-end pt-4 text-sm text-[color:#E3E7EE]">{formatRelativeDate(date)}</span>
    </article>
  );
}
