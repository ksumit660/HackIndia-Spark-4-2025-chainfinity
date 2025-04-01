/**
 * VideoBackground Component
 * Renders a fullscreen video background with overlay
 * Features:
 * - Autoplay and loop functionality
 * - Slowed playback rate
 * - Dark overlay with blur effect
 */
import React, { useRef, useEffect } from 'react';

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover -z-10"
      >
        <source src="/assests/background2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] -z-10" />
    </>
  );
};
