import React, { useState, useEffect } from 'react';

// Define types for the player and wish data
interface Player {
  name: string;
  color: string;
  wishes: string[];
}

const GrantWishes: React.FC = () => {
  // Mock data for 2 players with 5 wishes each
  const playersData: Player[] = [
    {
      name: 'Player 1',
      color: '#FF5733', // Red
      wishes: ['Wish 1: A new car', 'Wish 2: World Peace', 'Wish 3: Happiness', 'Wish 4: Vacation', 'Wish 5: Wealth'],
    },
    {
      name: 'Player 2',
      color: '#33C3FF', // Blue
      wishes: ['Wish 1: Fame', 'Wish 2: Health', 'Wish 3: Success', 'Wish 4: Knowledge', 'Wish 5: Adventure'],
    }
  ];

  // State for storing the wishes grid and reveal state
  const [wishes, setWishes] = useState<string[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);

  useEffect(() => {
    // Initialize the grid with players' data
    const generateGrid = () => {
      const grid: string[][] = [];
      const revealGrid: boolean[][] = [];
      playersData.forEach((player) => {
        const playerRow: string[] = [];
        const revealRow: boolean[] = [];
        player.wishes.forEach(() => {
          playerRow.push(''); // Placeholder for wish
          revealRow.push(false); // Initially, all wishes are hidden
        });
        grid.push(playerRow);
        revealGrid.push(revealRow);
      });
      setWishes(grid);
      setRevealed(revealGrid);
    };

    generateGrid();
  }, []);

  const handleCellClick = (playerIndex: number, wishIndex: number) => {
    // Ensure we do not try to mutate state directly
    const newRevealed = [...revealed];
    newRevealed[playerIndex][wishIndex] = true; // Mark wish as revealed
    setRevealed(newRevealed);
  };

  return (
    <div>
      <h1>Grant Wishes Game</h1>

      {/* Loop through each player and display their wish grid */}
      {playersData.map((player, playerIndex) => (
        <div
          key={playerIndex}
          style={{
            margin: '20px',
            padding: '10px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: player.color,
          }}
        >
          <h2>{player.name}'s Dashboard</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
            }}
          >
            {/* Loop through each wish and create a grid of cells */}
            {player.wishes.map((wish, wishIndex) => (
              <div
                key={wishIndex}
                onClick={() => handleCellClick(playerIndex, wishIndex)}
                style={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: revealed[playerIndex]?.[wishIndex] ? 'lightgreen' : '#ccc',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  fontSize: '14px',
                  textAlign: 'center',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {revealed[playerIndex]?.[wishIndex] ? wish : 'Click to Reveal'}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrantWishes;



