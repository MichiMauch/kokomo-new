export default function Background() {
    return (
      <div className="fixed inset-0 -z-10 bg-white">
        {/* Hintergrundbild */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/images/banner-gradient.png')" }}
        />
  
        {/* Grid-Textur über das Bild legen */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 0, 0, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
  
          {/* Grid als Overlay */}
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  }
  