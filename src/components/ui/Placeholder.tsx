'use client';
import type { ReactNode } from 'react';

interface PlaceholderProps {
  /** Descriptive label shown in the striped placeholder when no media URL is set */
  label:            string;
  className?:       string;
  children?:        ReactNode;
  /** Image URL — set this in siteData.ts to replace the striped placeholder */
  imageUrl?:        string;
  /** Video URL — takes priority over imageUrl when both are set (autoplay, muted, loop) */
  videoUrl?:        string;
  /** CSS object-position for the media, e.g. 'top center' */
  objectPosition?:  string;
}

export function Placeholder({
  label,
  className = '',
  children,
  imageUrl,
  videoUrl,
  objectPosition = 'center',
}: PlaceholderProps) {
  const hasMedia = Boolean(videoUrl || imageUrl);

  return (
    <div
      className={`ph ${className}`}
      /* Remove the text label from the ::after pseudo-element when real media is shown */
      data-ph={hasMedia ? undefined : label}
    >
      {/* Video — rendered first so it sits below the gradient/text children */}
      {videoUrl && (
        <video
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          aria-label={label}
        />
      )}

      {/* Static image — only shown when there's no video */}
      {imageUrl && !videoUrl && (
        <img
          src={imageUrl}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{ objectPosition }}
        />
      )}

      {/* Children (gradient overlays, text, etc.) — always above the media */}
      {children}
    </div>
  );
}
