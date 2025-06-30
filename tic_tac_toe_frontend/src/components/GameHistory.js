import React, { useEffect, useState } from 'react';
import { gameService } from '../services/api';

const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await gameService.getGameHistory();
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch game history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="sidebar">
      <h3>Game History</h3>
      <div className="history-list">
        {history.map((game) => (
          <div key={game.id} className="history-item">
            <div>Game #{game.id}</div>
            <div>Winner: {game.winner || 'Draw'}</div>
            <div>Date: {new Date(game.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;
