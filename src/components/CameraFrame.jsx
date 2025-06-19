import React, { useRef, useEffect } from 'react';
import './CameraFrame.css';

function CameraFrame() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        alert("Accès à la caméra refusé.");
        console.error(err);
      });
  }, []);

  return (
    <div className="camera-container">
      <div className="camera-frame scanner-frame">
        <video ref={videoRef} autoPlay muted playsInline />
      </div>
    </div>
  );
}

export default CameraFrame;