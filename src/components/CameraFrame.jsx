import React, { useRef, useEffect, useState } from 'react';
import './CameraFrame.css';
import axios from 'axios';

function CameraFrame() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [description, setDescription] = useState("");
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
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

        const fullBase64 = canvas.toDataURL('image/jpeg');
        const pureBase64 = fullBase64.split(',')[1];

        try {
            const response = await axios.post('https://culturia.onrender.com/api/analyze', {
                base64Image: pureBase64
            });
            console.log("Réponse backend :", response.data);
            setDescription(response.data.description);
            setShowDescription(true); // affiche la description
        } catch (err) {
            console.error("Erreur envoi image :", err);
        }
    };

    const handleCloseDescription = () => {
        setShowDescription(false);
        setDescription("");
    };

    return (
        <div className="camera-container">
            {showDescription && (
                <div className="description-frame fade-in">
                    <button className="close-button" onClick={handleCloseDescription}>×</button>
                    <div className="description-content">
                        {description.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            )}

            <div className="camera-frame scanner-frame">
                <video ref={videoRef} autoPlay muted playsInline />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            {!showDescription && (
                <button className="capture-button" onClick={handleCapture}>
                    <img src="/images/camera-icon.png" alt="Prendre la photo" className="camera-icon" />
                </button>
            )}
        </div>
    );
}

export default CameraFrame;
