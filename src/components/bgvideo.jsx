import React from 'react'

export const Bgvideo = () => {
  return (
    <div className= 'absolute top-0 left-0 h-full w-full overflow-hidden -z-10'>

            {/* video page */}
            <video
                src="https://res.cloudinary.com/dhlflr2cc/video/upload/v1780210673/beach_drozo9.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0  h-full w-full object-cover object-center pointer-events-none"
            />
    </div>
  )
}
