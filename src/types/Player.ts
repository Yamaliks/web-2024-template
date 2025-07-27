export interface Player {
  id: number;
  name: string;
  team: string;
  position: 'Вратарь' | 'Защитник' | 'Полузащитник' | 'Нападающий';
  rating: number;
  price: number; // в миллионах евро
  goals: number;
  assists: number;
  isBarcelona: boolean;
}

export interface TeamStats {
  totalCost: number;
  averageRating: number;
  barcelonaPlayers: number;
  dreamIndex: number;
  playerCount: number;
}

export interface SelectedPlayer extends Player {
  isSelected: boolean;
} 