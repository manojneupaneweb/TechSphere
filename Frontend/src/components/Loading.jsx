import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2 bg-slate-50 border-red-800 p-4 rounded-lg">
        <div className="text-4xl font-bold text-transparent bg-clip-text animate-shimmer">
          TechSphere
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200%;
          }
          100% {
            background-position: 200%;
          }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, #ff0000, #ffff00, #ff0000);
          background-size: 200% 100%;
          color: transparent;
          -webkit-background-clip: text;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default Loading;
