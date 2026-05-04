import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Legaseedz — Legacy Cannabis Genetics & Lifestyle'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '64px 72px',
          background: '#0D0C08',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,146,10,0.15) 0%, transparent 70%)',
          }}
        />
        {/* Green ambient bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -40,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,92,20,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'rgba(242,237,224,0.4)',
            textTransform: 'uppercase',
            marginBottom: 20,
            fontFamily: 'monospace',
          }}
        >
          Legacy Cannabis Genetics
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: '#C9920A',
            lineHeight: 0.85,
            letterSpacing: '-0.01em',
            marginBottom: 32,
          }}
        >
          Legaseedz
        </div>

        {/* Divider */}
        <div style={{ width: 64, height: 2, background: 'rgba(201,146,10,0.5)', marginBottom: 24 }} />

        {/* Subtext */}
        <div
          style={{
            fontSize: 18,
            color: 'rgba(242,237,224,0.55)',
            letterSpacing: '0.05em',
            fontFamily: 'serif',
          }}
        >
          From the growers who built it.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
