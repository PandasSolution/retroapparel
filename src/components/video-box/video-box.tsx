'use client'
import React, { useState } from "react";
import video_bg from '@/assets/img/bg/bg-video.webp';
import VideoPopup from "../common/modals/video-popup";

const VideoBox = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="video__area-df"
        style={{ background: `url(${video_bg.src})` }}
      >
        <div className="container">
          <div className="video__content text-center">
            <div className="video__button mb-60">
              <button onClick={()=> setIsVideoOpen(true)}>
                <i className="fas fa-play"></i>
              </button>
            </div>
            <h5 className="video__title">AWESOME VIDEO LIGHTBOX </h5>
            <p>
              Investigationes demonstraverunt lectores legere me lius quod ii
              legunt saepius.{" "}
            </p>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId="TYYf8zYjP5k"
      />
      {/* video modal end */}
    </>
  );
};

export default VideoBox;
