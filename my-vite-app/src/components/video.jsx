import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import "./video.css";

export const Video = forwardRef((props, ref) => {
  const [recordings, setRecordings] = useState([]);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true });
  const previewVideoRef = useRef(null);

  useEffect(() => {
    if (previewVideoRef.current && previewStream) {
      previewVideoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          downloadVideo(blob);
          const updatedRecordings = [...recordings, mediaBlobUrl];
          setRecordings(updatedRecordings);
        })
        .catch((error) => console.error("Error fetching video blob:", error));
    }
  }, [mediaBlobUrl]);

  const downloadVideo = (blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `recording_${new Date().toISOString()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearRecording = () => {
    clearBlobUrl();
    setRecordings([]);
  };

  // Expose startRecording, stopRecording, and handleClearRecording to the parent component
  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
    handleClearRecording,
  }));

  return (
    <div className="video-interface">
      <video
        ref={previewVideoRef}
        autoPlay
        muted
        className="zoom-style-video" // Apply the zoom-style-video class here
      ></video>
    </div>
  );
});
