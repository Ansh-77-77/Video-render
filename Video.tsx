import React from 'react'
import {useCurrentFrame, interpolate, Easing, Composition} from 'remotion'

export default function Video() {
  const frame = useCurrentFrame()
  const duration = 180

  const zoom = interpolate(frame, [0, duration], [1, 1.15], {easing: Easing.out(Easing.cubic)})
  const glitch = Math.sin(frame * 0.7) * (frame > 30 ? 6 : 0)
  const crackProgress = interpolate(frame, [60, 140], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  const textOpacity = interpolate(frame, [90, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  const shake = Math.sin(frame * 2.5) * 8 * textOpacity
  const pulse = interpolate(frame % 20, [0, 10, 20], [0.6, 1, 0.6])
  const flash = frame % 40 < 2 ? 1 : 0

  return (
    <div
      style={{
        width: '1920px',
        height: '1080px',
        backgroundColor: '#050505',
        position: 'relative',
        overflow: 'hidden',
        transform: `scale(${zoom})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)',
          opacity: 0.25,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 320,
          height: 420,
          borderRadius: 24,
          border: '6px solid #ff2a2a',
          transform: `translate(-50%, -50%) translate(${glitch}px, 0px)`,
          boxShadow: `0 0 40px rgba(255,40,40,0.9), 0 0 120px rgba(255,40,40,0.6)`,
          opacity: pulse,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            border: '6px solid #ff2a2a',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 40px rgba(255,40,40,0.9)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, transparent 45%, rgba(255,60,60,0.9) 50%, transparent 55%)',
            opacity: crackProgress,
          }}
        />
      </div>
      {Array.from({length: 8}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 4,
            height: 60,
            background: '#ff4d4d',
            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-220px) scaleY(${crackProgress})`,
            boxShadow: '0 0 20px rgba(255,80,80,1)',
            opacity: crackProgress,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '75%',
          transform: `translate(-50%, 0px) translate(${shake}px, ${shake * 0.5}px)`,
          fontSize: 96,
          fontWeight: 900,
          fontFamily: 'Arial, sans-serif',
          color: '#ff3b3b',
          textShadow:
            '0 0 20px rgba(255,50,50,1), 0 0 60px rgba(255,50,50,0.8)',
          opacity: textOpacity,
          whiteSpace: 'nowrap',
        }}
      >
        Hackers don't guess passwords…
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ff0000',
          opacity: flash,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}

// 🔴 THIS IS THE MISSING PART - REMOTION COMPOSITION
export const VideoComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
            }
