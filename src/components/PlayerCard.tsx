import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Avatar,
  styled
} from '@mui/material';
import { Star, Euro, SportsSoccer } from '@mui/icons-material';
import { Player } from '../types/Player';
import { useState } from 'react';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggleSelection: (player: Player) => void;
  canAdd: boolean;
  reason?: string;
}

// Стилизованные компоненты для Барселоны
const BarcelonaCard = styled(Card)<{ isBarcelona: boolean }>`
  && {
    border: ${props => props.isBarcelona ? '3px solid #A50044' : '1px solid #e0e0e0'};
    background: ${props => props.isBarcelona ? 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)' : '#ffffff'};
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &:hover {
      transform: ${props => props.isBarcelona ? 'translateY(-8px) scale(1.02)' : 'translateY(-4px)'};
      box-shadow: ${props => props.isBarcelona 
        ? '0 12px 24px rgba(165, 0, 68, 0.3)' 
        : '0 8px 16px rgba(0, 0, 0, 0.1)'
      };
    }
  }
`;

const BarcelonaChip = styled(Chip)`
  && {
    background: linear-gradient(45deg, #A50044 30%, #004D98 90%);
    color: white;
    font-weight: bold;
  }
`;

const PlayerAvatar = styled(Avatar)<{ isBarcelona: boolean }>`
  && {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
    font-weight: bold;
    background: ${props => props.isBarcelona 
      ? 'linear-gradient(45deg, #A50044 30%, #004D98 90%)' 
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    };
    border: ${props => props.isBarcelona ? '3px solid #FFCB05' : '3px solid #e0e0e0'};
    box-shadow: ${props => props.isBarcelona 
      ? '0 4px 8px rgba(165, 0, 68, 0.3)' 
      : '0 4px 8px rgba(33, 150, 243, 0.3)'
    };
  }
`;

const PlayerImage = styled('img')`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardContentWrapper = styled(CardContent)`
  && {
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const PlayerCard = ({ player, isSelected, onToggleSelection, canAdd, reason }: PlayerCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleClick = () => {
    if (canAdd || isSelected) {
      onToggleSelection(player);
    }
  };

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

  const imageUrl = getPlayerImageUrl(player);

  return (
    <BarcelonaCard isBarcelona={player.isBarcelona}>
      <CardContentWrapper>
        {/* Заголовок с аватаром/фото */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          {imageUrl && !imageError ? (
            <PlayerImage
              src={imageUrl}
              alt={player.name}
              onError={() => setImageError(true)}
              sx={{
                border: player.isBarcelona ? '3px solid #FFCB05' : '3px solid #e0e0e0',
                boxShadow: player.isBarcelona 
                  ? '0 4px 8px rgba(165, 0, 68, 0.3)' 
                  : '0 4px 8px rgba(33, 150, 243, 0.3)'
              }}
            />
          ) : (
            <PlayerAvatar isBarcelona={player.isBarcelona}>
              {getInitials(player.name)}
            </PlayerAvatar>
          )}
          <Box sx={{ ml: 1.5, flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="h3" sx={{ 
              fontWeight: 'bold', 
              lineHeight: 1.2,
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {player.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ 
              lineHeight: 1.2,
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {player.team}
            </Typography>
          </Box>
          {player.isBarcelona && (
            <BarcelonaChip 
              label="🔴🔵" 
              size="small" 
              icon={<SportsSoccer />}
            />
          )}
        </Box>

        {/* Позиция и рейтинг */}
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.875rem' }}>
            {player.position}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={player.rating / 20} 
              precision={0.1} 
              readOnly 
              size="small"
            />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
              {player.rating} ⭐
            </Typography>
          </Box>
        </Box>

        {/* Статистика */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          p: 1.5,
          borderRadius: 2,
          background: 'rgba(0, 0, 0, 0.03)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Euro sx={{ fontSize: 14, mr: 0.5, color: player.isBarcelona ? '#A50044' : '#4caf50' }} />
            <Typography variant="body2" fontWeight="bold" color={player.isBarcelona ? '#A50044' : '#4caf50'} sx={{ fontSize: '0.875rem' }}>
              {player.isBarcelona ? 'БЕСПЛАТНО' : `${player.price}M €`}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {player.goals}⚽ {player.assists}🎯
            </Typography>
          </Box>
        </Box>

        {/* Специальное сообщение для Барсы */}
        {player.isBarcelona && (
          <Box sx={{ 
            mb: 1.5, 
            p: 1, 
            borderRadius: 1.5, 
            background: 'linear-gradient(45deg, rgba(165, 0, 68, 0.1) 30%, rgba(0, 77, 152, 0.1) 90%)',
            textAlign: 'center',
            border: '1px solid rgba(165, 0, 68, 0.2)'
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                color: '#A50044', 
                fontWeight: 'bold',
                animation: 'pulse 2s infinite',
                fontSize: '0.75rem'
              }}
            >
              VISCA BARÇA! 🔥
            </Typography>
          </Box>
        )}

        {/* Кнопка - всегда внизу */}
        <Box sx={{ mt: 'auto', pt: 1 }}>
          <Button
            variant={isSelected ? "outlined" : "contained"}
            fullWidth
            onClick={handleClick}
            disabled={!canAdd && !isSelected}
            size="small"
            sx={{
              fontSize: '0.875rem',
              py: 0.75,
              ...(player.isBarcelona && !isSelected && {
                background: 'linear-gradient(45deg, #A50044 30%, #004D98 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #8B0038 30%, #003D7A 90%)',
                }
              })
            }}
          >
            {isSelected ? "Убрать из команды" : "Добавить в команду"}
          </Button>

          {!canAdd && !isSelected && reason && (
            <Typography 
              variant="caption" 
              color="error" 
              sx={{ 
                display: 'block', 
                textAlign: 'center', 
                mt: 0.5,
                fontSize: '0.75rem'
              }}
            >
              {reason}
            </Typography>
          )}
        </Box>
      </CardContentWrapper>
    </BarcelonaCard>
  );
};

export default PlayerCard; 