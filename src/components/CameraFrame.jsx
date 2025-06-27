import React, { useRef, useEffect } from 'react';
import './CameraFrame.css';
import axios from 'axios';

function CameraFrame() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

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

    const handleCapture = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageBase64 = canvas.toDataURL('image/png');

        try {
            const response = await axios.post('http://localhost:5000/api/analyze', {
                image: imageBase64
            });
            console.log("Réponse backend :", response.data);
        } catch (err) {
            console.error("Erreur envoi image :", err);
        }
    };

    return (
        <div className="camera-container">
            <div className="camera-frame scanner-frame">
                <video ref={videoRef} autoPlay muted playsInline />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <button className="capture-button" onClick={handleCapture}>
                <img src="/images/camera-icon.png" alt="Prendre la photo" className="camera-icon" />

            </button>
        </div>
    );
}

export default CameraFrame;
