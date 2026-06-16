'use client';

import { useState, useRef } from 'react';

interface VideoPlayerProps {
  title: string;
  videoUrl?: string;
  posterUrl?: string;
}

export function VideoPlayer({ title, videoUrl, posterUrl }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout>();

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !muted;
    videoRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full aspect-video bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
        />
      ) : (
        /* Demo player UI when no video URL */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <div className="w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold mb-2">{title}</p>
            <p className="text-gray-400 text-sm">Trailer Preview</p>
            <p className="text-gray-500 text-xs mt-2">Connect TMDB API for real trailers</p>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-gradient-to-t from-black via-black/50 to-transparent p-4">
          {/* Progress bar */}
          {videoUrl && (
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 accent-netflix-red cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted || volume === 0 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              {videoUrl && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 accent-netflix-red cursor-pointer"
                />
              )}
            </div>

            <span className="text-white text-sm font-semibold ml-2 flex-1">{title}</span>

            <button
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Fullscreen"
              onClick={() => {
                const el = document.querySelector('.relative.w-full.aspect-video') as HTMLElement;
                if (el?.requestFullscreen) el.requestFullscreen();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
