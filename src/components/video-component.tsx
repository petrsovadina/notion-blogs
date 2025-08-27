import React from "react";
import HeroVideoDialog from "./magicui/hero-video-dialog";

interface VideoComponentProps {
  href: string;
  children?: React.ReactNode;
}

export const VideoComponent: React.FC<VideoComponentProps> = ({ href, children }) => {
  // Zkontroluj jestli je to YouTube video link s textem "video"
  if (href && href.includes('youtube.com') && children === 'video') {
    const videoId = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      return (
        <div className="my-6">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc={embedUrl}
            thumbnailSrc={thumbnailUrl}
            thumbnailAlt="YouTube Video Thumbnail"
            className="w-full max-w-4xl mx-auto"
          />
        </div>
      );
    }
  }
  
  // Pro ostatní případy vrať obyčejný odkaz
  return (
    <a href={href} className="text-blue-500">
      {children}
    </a>
  );
};