
import "./App.css"; 
import { useEffect, useState } from "react"; 
  
export default function App() { 
  
    // Number of rows 
    const n = 8; 
  
    // Number of columns 
    const m = 8; 
  
    // Array which will be used to  
    // display the chessboard 
    const [chessBoard, setChessBoard] = useState([]); 
  
    useEffect(() => { 
  
        // Initialize result with an empty array 
        const result = []; 
  
        // Iterate n number of times to 
        // create n number of rows 
        for (let i = 0; i < n; i++) { 
  
            // For each of row create an Array 
            // of length m (number of columns) 
            const row = Array.from({ length: m }); 
            result.push(row); 
        } 
  
        // Set chess board's value to the 
        // created 2d result array 
        setChessBoard(result); 
    }, []); 
  
    return ( 
        <> 
{chessBoard.length > 0 && 
    chessBoard.map((row, rIndex) => { 
        return ( 
<div className="row" key={rIndex}> 
    {row.map((_, cIndex) => { 
        return ( 
          <div 
              className={`box ${ 

                  // If the sum of row index  
                  // and column index is even  
                  // then background will be  
                  // black else white 
                  (rIndex + cIndex) % 2 === 0  
                      ? "black" : "white"
                  }`} 
              key={cIndex} 
          ></div> 
        ); 
     })} 
 </div> 
); 
})} 
</> 
); 
} 