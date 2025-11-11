import React from 'react';

function FullscreenComponent() {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // If not in fullscreen, request fullscreen for the document body
      document.documentElement.requestFullscreen(); 
    } else {
      // If in fullscreen, exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div>
      <h1>My Fullscreen Content</h1>
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
      {/* Other content that should be visible */}
    </div>
  );
}

export default FullscreenComponent;