import { useTheme } from '@/contexts/ThemeContext';

const pieces = [
  { type: '♔', position: 'e1', color: 'white' },
  { type: '♕', position: 'd8', color: 'black' },
  { type: '♖', position: 'a1', color: 'white' },
  { type: '♜', position: 'h8', color: 'black' },
  { type: '♗', position: 'c1', color: 'white' },
  { type: '♝', position: 'f8', color: 'black' },
  { type: '♘', position: 'b1', color: 'white' },
  { type: '♞', position: 'g8', color: 'black' },
  { type: '♙', position: 'e2', color: 'white' },
  { type: '♟', position: 'e7', color: 'black' }
];

export function ChessBoardPreview() {
  const { theme } = useTheme();

  const getSquareClass = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    
    switch (theme) {
      case 'grid':
        return isLight 
          ? 'bg-slate-200 hover:bg-slate-100' 
          : 'bg-slate-800 hover:bg-slate-700';
      case 'flux':
        return isLight 
          ? 'bg-cyan-100 hover:bg-cyan-50 shadow-sm shadow-cyan-500/20' 
          : 'bg-slate-900 hover:bg-slate-800 shadow-sm shadow-cyan-500/30';
      case 'terra':
        return isLight 
          ? 'bg-green-50 hover:bg-green-25' 
          : 'bg-green-200 hover:bg-green-150';
      default: // sol
        return isLight 
          ? 'bg-amber-50 hover:bg-amber-25' 
          : 'bg-amber-200 hover:bg-amber-150';
    }
  };

  const getPieceColor = (pieceColor: string) => {
    switch (theme) {
      case 'grid':
        return pieceColor === 'white' ? 'text-slate-100' : 'text-slate-900';
      case 'flux':
        return pieceColor === 'white' ? 'text-cyan-100' : 'text-slate-900';
      case 'terra':
        return pieceColor === 'white' ? 'text-green-800' : 'text-green-900';
      default: // sol
        return pieceColor === 'white' ? 'text-amber-800' : 'text-amber-900';
    }
  };

  const fileToCol = (file: string) => file.charCodeAt(0) - 97; // a=0, b=1, etc.
  const rankToRow = (rank: string) => 8 - parseInt(rank); // 8=0, 7=1, etc.

  return (
    <div className="floating-panel p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 text-center">Live Board</h3>
      
      <div className="relative">
        {/* Chess Board */}
        <div className="grid grid-cols-8 gap-0 aspect-square w-64 mx-auto border-2 border-border rounded-lg overflow-hidden">
          {Array.from({ length: 64 }).map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const file = String.fromCharCode(97 + col); // a-h
            const rank = (8 - row).toString(); // 8-1
            const position = file + rank;
            
            const piece = pieces.find(p => p.position === position);
            
            return (
              <div
                key={index}
                className={`
                  relative aspect-square flex items-center justify-center
                  transition-all duration-200 cursor-pointer
                  ${getSquareClass(row, col)}
                `}
              >
                {piece && (
                  <span 
                    className={`
                      text-2xl font-bold animate-float
                      ${getPieceColor(piece.color)}
                      transition-all duration-200 hover:scale-110
                    `}
                    style={{ 
                      animationDelay: `${Math.random() * 2}s`,
                      filter: theme === 'flux' ? 'drop-shadow(0 0 4px currentColor)' : 'none'
                    }}
                  >
                    {piece.type}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Coordinate Labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
            <span key={file} className="w-8 text-center">{file}</span>
          ))}
        </div>
        
        <div className="absolute top-0 -left-6 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-1">
          {['8', '7', '6', '5', '4', '3', '2', '1'].map(rank => (
            <span key={rank} className="h-8 flex items-center">{rank}</span>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">White to move</div>
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}