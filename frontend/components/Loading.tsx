import React, { useEffect, useState } from 'react';

const LoadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-200">
      <div 
        className="h-full bg-blue-500 transition-all duration-200 ease-in-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default LoadingProgressBar;
