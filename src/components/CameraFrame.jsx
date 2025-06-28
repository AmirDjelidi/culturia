import React, { useRef, useEffect, useState } from 'react';
import './CameraFrame.css';
import axios from 'axios';

function CameraFrame() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [description, setDescription] = useState("");
    const [showDescription, setShowDescription] = useState(false);
    const [facingMode, setFacingMode] = useState("environment");
    const [loading, setLoading] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            alert("Accès à la caméra refusé.");
            console.error(err);
        }
    };

    useEffect(() => {
        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [facingMode]);

    const handleCapture = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const fullBase64 = canvas.toDataURL('image/jpeg');
        const pureBase64 = fullBase64.split(',')[1];

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/analyze', {
                base64Image: pureBase64
            });
            console.log("Réponse backend :", response.data);
            setDescription(response.data.description);
            setShowDescription(true);
        } catch (err) {
            console.error("Erreur envoi image :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDescription = () => {
        setShowDescription(false);
        setDescription("");
        startCamera(); // ✅ relance la caméra
    };

    const handleSwitchCamera = () => {
        if (!loading) {
            setFacingMode(prev => prev === "user" ? "environment" : "user");
        }
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
                {loading ? (
                    <canvas ref={canvasRef} />
                ) : (
                    <>
                        <video ref={videoRef} autoPlay muted playsInline />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </>
                )}
            </div>

            {!showDescription && (
                <div className="button-wrapper">
                    <button className="capture-button" onClick={handleCapture} disabled={loading}>
                        <img src="/images/camera-icon.png" alt="Prendre la photo" className="camera-icon" />
                    </button>
                    <button className="switch-button" onClick={handleSwitchCamera} disabled={loading}>
                        <img src="/images/switch.png" alt="Changer de caméra" className="camera-icon" />
                    </button>
                </div>
            )}

            {loading && (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>Analyse en cours…</p>
                </div>
            )}
        </div>
    );
}

export default CameraFrame;
