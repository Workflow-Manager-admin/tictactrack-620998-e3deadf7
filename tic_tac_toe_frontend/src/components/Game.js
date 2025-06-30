import React, { useState, useEffect } from 'react';
import { gameService } from '../services/api';
import GameBoard from './GameBoard';
import GameHistory from './GameHistory';

const Game = () => {
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  const fetchActiveGame = async () => {
    try {
      const response = await gameService.getActiveGame();
      setGame(response.data);
    } catch (error) {
      console.error('Failed to fetch active game:', error);
    }
  };

  useEffect(() => {
    fetchActiveGame();
  }, []);

  const handleNewGame = async () => {
    try {
      const response = await gameService.createGame();
      setGame(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to start new game');
    }
  };

  const handleMove = async (position) => {
    if (!game || game.winner) return;

    try {
      const response = await gameService.makeMove(game.id, position);
      setGame(response.data);
      setError(null);
    } catch (error) {
      setError('Invalid move');
    }
  };

  const getGameStatus = () => {
    if (!game) return 'Loading...';
    if (game.winner) return `Winner: ${game.winner}`;
    if (game.is_draw) return 'Game Draw!';
    return `Current player: ${game.current_player}`;
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2>Tic Tac Toe</h2>
        <div className="game-status">{getGameStatus()}</div>
        {game && (
          <GameBoard
            board={game.board}
            onCellClick={handleMove}
            disabled={!!game.winner || game.is_draw}
          />
        )}
        {error && <div className="error">{error}</div>}
        <button className="button" onClick={handleNewGame}>
          New Game
        </button>
      </div>
      <GameHistory />
    </div>
  );
};

export default Game;
