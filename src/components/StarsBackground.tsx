"use client";

export default function StarsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <span
          key={`twinkle-${i}`}
          className="absolute text-white text-[12px] animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          ★
        </span>
      ))}

      {[...Array(4)].map((_, i) => (
        <span
          key={`shoot-${i}`}
          className="animate-shooting-star text-yellow-400 absolute text-xl"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
