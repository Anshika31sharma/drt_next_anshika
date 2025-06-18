"use client";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {

  return (
    <header className="flex items-center justify-between mb-6 px-2 sm:px-4 py-2">
      <h1 className="text-lg sm:text-xl font-bold text-white">
          {title}
        </h1>
    </header>
  );
}
