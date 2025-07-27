import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  styled
} from '@mui/material';
import { Star, TrendingUp } from '@mui/icons-material';
import { Player } from '../types/Player';
import { useState } from 'react';

interface RecommendationsProps {
  topPlayers: Player[];
}

const RecommendationsCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    border: 2px solid #FFCB05;
  }
`;

const TopPlayerChip = styled(Chip)`
  && {
    background: linear-gradient(45deg, #FFCB05 30%, #FF9800 90%);
    color: white;
    font-weight: bold;
  }
`;

const RecommendationAvatar = styled(Avatar)<{ isBarcelona: boolean }>`
  && {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    font-weight: bold;
    background: ${props => props.isBarcelona 
      ? 'linear-gradient(45deg, #A50044 30%, #004D98 90%)' 
      : 'linear-gradient(45deg, #FF9800 30%, #FFCB05 90%)'
    };
    border: ${props => props.isBarcelona ? '2px solid #FFCB05' : '2px solid #e0e0e0'};
  }
`;

const RecommendationImage = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Recommendations = ({ topPlayers }: RecommendationsProps) => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Получаем инициалы игрока
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Получаем URL изображения игрока
  const getPlayerImageUrl = (player: Player) => {
    const playerImages: { [key: string]: string } = {
      // Игроки Барселоны
      "Robert Lewandowski": "https://upload.wikimedia.org/wikipedia/commons/8/82/Robert_Lewandowski_2018.jpg",
      "Marc-Andre ter Stegen": "https://upload.wikimedia.org/wikipedia/commons/7/72/Marc-Andr%C3%A9_ter_Stegen_2018.jpg",
      "Pedri": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Pedri_2021.jpg/800px-Pedri_2021.jpg",
      "Gavi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gavi_2022.jpg/800px-Gavi_2022.jpg",
      "Ronald Araujo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ronald_Ara%C3%BAjo_2022.jpg/800px-Ronald_Ara%C3%BAjo_2022.jpg",
      "Frenkie de Jong": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Frenkie_de_Jong_2021.jpg/800px-Frenkie_de_Jong_2021.jpg",
      "Joao Cancelo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jo%C3%A3o_Cancelo_2019.jpg/800px-Jo%C3%A3o_Cancelo_2019.jpg",
      "Raphinha": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Raphinha_2022.jpg/800px-Raphinha_2022.jpg",
      "Lamine Yamal": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lamine_Yamal_2024.jpg/800px-Lamine_Yamal_2024.jpg",
      "Fermin Lopez": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fermin_Lopez_2024.jpg/800px-Fermin_Lopez_2024.jpg",
      "Pau Cubarsi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pau_Cubarsi_2024.jpg/800px-Pau_Cubarsi_2024.jpg",
      "Hector Fort": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hector_Fort_2024.jpg/800px-Hector_Fort_2024.jpg",
      "Vitor Roque": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Vitor_Roque_2024.jpg/800px-Vitor_Roque_2024.jpg",
      "Alejandro Balde": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Alejandro_Balde_2023.jpg/800px-Alejandro_Balde_2023.jpg",
      "Inigo Martinez": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Inigo_Martinez_2023.jpg/800px-Inigo_Martinez_2023.jpg",
      
      // Другие звезды
      "Erling Haaland": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Erling_Haaland_2023.jpg/800px-Erling_Haaland_2023.jpg",
      "Kevin De Bruyne": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kevin_De_Bruyne_2019.jpg/800px-Kevin_De_Bruyne_2019.jpg",
      "Kylian Mbappe": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_v_PSG_850_1707.jpg/800px-2019-07-17_SG_Dynamo_Dresden_v_PSG_850_1707.jpg",
      "Jude Bellingham": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Jude_Bellingham_2023.jpg/800px-Jude_Bellingham_2023.jpg",
      "Vinicius Junior": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Vin%C3%ADcius_Jr._2022.jpg/800px-Vin%C3%ADcius_Jr._2022.jpg",
      "Mohamed Salah": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Mo_Salah_2018.jpg/800px-Mo_Salah_2018.jpg",
      "Victor Osimhen": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Victor_Osimhen_2023.jpg/800px-Victor_Osimhen_2023.jpg",
      "Xavi Simons": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Xavi_Simons_2023.jpg/800px-Xavi_Simons_2023.jpg",
      "Alisson": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Alisson_2018.jpg/800px-Alisson_2018.jpg",
      "Eder Militao": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eder_Militao_2022.jpg/800px-Eder_Militao_2022.jpg",
      "Trent Alexander-Arnold": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Trent_Alexander-Arnold_2018.jpg/800px-Trent_Alexander-Arnold_2018.jpg",
      "Kingsley Coman": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kingsley_Coman_2021.jpg/800px-Kingsley_Coman_2021.jpg",
      "Joshua Kimmich": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Joshua_Kimmich_2021.jpg/800px-Joshua_Kimmich_2021.jpg",
      "Manuel Neuer": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Manuel_Neuer_2018.jpg/800px-Manuel_Neuer_2018.jpg",
      "Ruben Dias": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ruben_Dias_2021.jpg/800px-Ruben_Dias_2021.jpg",
      "Bernardo Silva": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bernardo_Silva_2021.jpg/800px-Bernardo_Silva_2021.jpg",
      "Lautaro Martinez": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lautaro_Martinez_2022.jpg/800px-Lautaro_Martinez_2022.jpg",
      "Marcus Rashford": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Marcus_Rashford_2023.jpg/800px-Marcus_Rashford_2023.jpg",
      "Bruno Fernandes": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bruno_Fernandes_2023.jpg/800px-Bruno_Fernandes_2023.jpg",
      "Harry Kane": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Harry_Kane_2023.jpg/800px-Harry_Kane_2023.jpg",
      "Jamal Musiala": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jamal_Musiala_2023.jpg/800px-Jamal_Musiala_2023.jpg",
      "Florian Wirtz": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Florian_Wirtz_2024.jpg/800px-Florian_Wirtz_2024.jpg",
      "Victor Boniface": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Victor_Boniface_2024.jpg/800px-Victor_Boniface_2024.jpg",
      "Bukayo Saka": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bukayo_Saka_2023.jpg/800px-Bukayo_Saka_2023.jpg",
      "Martin Odegaard": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Martin_Odegaard_2023.jpg/800px-Martin_Odegaard_2023.jpg",
      "Declan Rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Declan_Rice_2023.jpg/800px-Declan_Rice_2023.jpg",
      "William Saliba": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/William_Saliba_2023.jpg/800px-William_Saliba_2023.jpg",
      "Phil Foden": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Phil_Foden_2023.jpg/800px-Phil_Foden_2023.jpg",
      "Rodri": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rodri_2023.jpg/800px-Rodri_2023.jpg",
      "Ederson": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ederson_2023.jpg/800px-Ederson_2023.jpg",
      "Thibaut Courtois": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Thibaut_Courtois_2023.jpg/800px-Thibaut_Courtois_2023.jpg",
      "Antonio Rudiger": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Antonio_Rudiger_2023.jpg/800px-Antonio_Rudiger_2023.jpg",
      "Federico Valverde": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Federico_Valverde_2023.jpg/800px-Federico_Valverde_2023.jpg",
      "Toni Kroos": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Toni_Kroos_2023.jpg/800px-Toni_Kroos_2023.jpg",
      "Luka Modric": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Luka_Modric_2023.jpg/800px-Luka_Modric_2023.jpg"
    };
    
    return playerImages[player.name] || null;
  };

  const handleImageError = (playerId: number) => {
    setImageErrors(prev => ({ ...prev, [playerId]: true }));
  };

  if (topPlayers.length === 0) {
    return (
      <RecommendationsCard>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#FF9800' }}>
            🎯 Рекомендации
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Нет доступных игроков в рамках бюджета
          </Typography>
        </CardContent>
      </RecommendationsCard>
    );
  }

  return (
    <RecommendationsCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUp sx={{ mr: 1, color: '#FF9800' }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
            🎯 ТОП-3 Рекомендации
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Лучшие доступные игроки по рейтингу:
        </Typography>

        <List sx={{ p: 0 }}>
          {topPlayers.map((player, index) => {
            const imageUrl = getPlayerImageUrl(player);
            const hasImageError = imageErrors[player.id];
            
            return (
              <ListItem key={player.id} sx={{ 
                p: 1.5, 
                mb: 1, 
                borderRadius: 2, 
                background: 'rgba(255, 255, 255, 0.7)',
                border: player.isBarcelona ? '2px solid #A50044' : '1px solid #e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <ListItemAvatar>
                  {imageUrl && !hasImageError ? (
                    <RecommendationImage
                      src={imageUrl}
                      alt={player.name}
                      onError={() => handleImageError(player.id)}
                      sx={{
                        border: player.isBarcelona ? '2px solid #FFCB05' : '2px solid #e0e0e0'
                      }}
                    />
                  ) : (
                    <RecommendationAvatar isBarcelona={player.isBarcelona}>
                      {getInitials(player.name)}
                    </RecommendationAvatar>
                  )}
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {player.name}
                      </Typography>
                      {player.isBarcelona && (
                        <TopPlayerChip label="🔴🔵" size="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {player.team} • {player.position}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ fontSize: 16, color: '#FF9800', mr: 0.5 }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {player.rating}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {player.isBarcelona ? 'БЕСПЛАТНО' : `${player.price}M €`}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ 
          mt: 2, 
          p: 2, 
          borderRadius: 2, 
          background: 'rgba(255, 152, 0, 0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            💡 Совет: Игроки Барселоны бесплатны и дают +2 балла к индексу мечты!
          </Typography>
        </Box>
      </CardContent>
    </RecommendationsCard>
  );
};

export default Recommendations; 