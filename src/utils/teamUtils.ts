import { Player, TeamStats } from '../types/Player';

// Расчет статистики команды
export const calculateTeamStats = (selectedPlayers: Player[]): TeamStats => {
  if (selectedPlayers.length === 0) {
    return {
      totalCost: 0,
      averageRating: 0,
      barcelonaPlayers: 0,
      dreamIndex: 0,
      playerCount: 0
    };
  }

  // Игроки Барселоны не тратят бюджет, но показываем их цену для отображения
  const totalCost = selectedPlayers.reduce((sum, player) => {
    if (player.isBarcelona) {
      return sum; // Игроки Барсы бесплатны
    }
    return sum + player.price;
  }, 0);
  
  const averageRating = selectedPlayers.reduce((sum, player) => sum + player.rating, 0) / selectedPlayers.length;
  const barcelonaPlayers = selectedPlayers.filter(player => player.isBarcelona).length;
  
  // Индекс мечты = средний рейтинг + бонус за игроков Барсы (+2 за каждого)
  const dreamIndex = averageRating + (barcelonaPlayers * 2);

  return {
    totalCost,
    averageRating: Math.round(averageRating * 10) / 10,
    barcelonaPlayers,
    dreamIndex: Math.round(dreamIndex * 10) / 10,
    playerCount: selectedPlayers.length
  };
};

// Проверка возможности добавления игрока
export const canAddPlayer = (
  player: Player, 
  selectedPlayers: Player[], 
  budget: number
): { canAdd: boolean; reason?: string } => {
  const stats = calculateTeamStats(selectedPlayers);
  
  if (selectedPlayers.length >= 11) {
    return { canAdd: false, reason: "Максимум 11 игроков в команде" };
  }
  
  // Игроки Барселоны всегда можно добавить (они бесплатны)
  if (player.isBarcelona) {
    return { canAdd: true };
  }
  
  // Для остальных игроков проверяем бюджет
  if (stats.totalCost + player.price > budget) {
    return { canAdd: false, reason: "Превышен бюджет команды" };
  }
  
  return { canAdd: true };
};

// Получение ТОП-3 лучших доступных игроков
export const getTopAvailablePlayers = (
  allPlayers: Player[], 
  selectedPlayers: Player[], 
  budget: number
): Player[] => {
  const selectedIds = selectedPlayers.map(p => p.id);
  const availablePlayers = allPlayers.filter(player => !selectedIds.includes(player.id));
  
  return availablePlayers
    .filter(player => {
      const { canAdd } = canAddPlayer(player, selectedPlayers, budget);
      return canAdd;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
};

// Фильтрация игроков по позиции
export const filterPlayersByPosition = (
  players: Player[], 
  position: string
): Player[] => {
  if (position === "Все") return players;
  return players.filter(player => player.position === position);
};

// Сортировка игроков
export const sortPlayers = (
  players: Player[], 
  sortBy: 'rating' | 'price' | 'name'
): Player[] => {
  return [...players].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
}; 