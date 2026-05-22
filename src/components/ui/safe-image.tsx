"use client";

import { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackElement?: React.ReactNode;
}

export function SafeImage({ src, alt, className, fallbackElement, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    if (fallbackElement) return <>{fallbackElement}</>;
    // Default fallback
    return (
      <div className={`bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center ${className || ""}`}>
        <span className="text-indigo-300 text-2xl font-normal tracking-tight">SIGMA</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
