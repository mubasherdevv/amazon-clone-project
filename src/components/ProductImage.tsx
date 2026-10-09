import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  fallback,
  className = 'w-full h-full relative flex items-center justify-center',
  imageClassName = 'w-full h-full object-contain'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className}>
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`${imageClassName} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
          }`}
        />
      )}

      {(!isLoaded || hasError) && fallback && (
        <div className="w-full h-full flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
};
