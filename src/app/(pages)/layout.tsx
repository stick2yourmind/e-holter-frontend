'use client';

import Navbar from '@/components/Navbar/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm sm:max-w-xl xl:max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
}
