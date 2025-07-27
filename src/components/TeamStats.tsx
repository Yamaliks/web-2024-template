import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  styled
} from '@mui/material';
import { 
  Euro, 
  Star, 
  SportsSoccer, 
  EmojiEvents,
  TrendingUp 
} from '@mui/icons-material';
import { TeamStats as TeamStatsType } from '../types/Player';

interface TeamStatsProps {
  stats: TeamStatsType;
  budget: number;
}

const StatsCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
    border: 2px solid #004D98;
  }
`;

const DreamIndexChip = styled(Chip)`
  && {
    background: linear-gradient(45deg, #FFCB05 30%, #A50044 90%);
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const BarcelonaChip = styled(Chip)`
  && {
    background: linear-gradient(45deg, #A50044 30%, #004D98 90%);
    color: white;
    font-weight: bold;
  }
`;

const TeamStats = ({ stats, budget }: TeamStatsProps) => {
  const budgetUsage = (stats.totalCost / budget) * 100;
  const isBudgetExceeded = stats.totalCost > budget;

  return (
    <StatsCard>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#004D98' }}>
          🏆 Статистика Команды
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#A50044' }}>
              {stats.playerCount}/11
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Игроков в команде
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#004D98' }}>
              {stats.averageRating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Средний рейтинг ⭐
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              💰 Бюджет команды
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {stats.totalCost}M / {budget}M €
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(budgetUsage, 100)} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: isBudgetExceeded ? '#f44336' : '#4caf50',
                borderRadius: 4
              }
            }} 
          />
          {isBudgetExceeded && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              ⚠️ Превышен бюджет на {(stats.totalCost - budget)}M €
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsSoccer sx={{ mr: 1, color: '#A50044' }} />
            <Typography variant="body1">
              Игроков Барселоны:
            </Typography>
          </Box>
          <BarcelonaChip 
            label={`${stats.barcelonaPlayers} 🔴🔵`}
            size="medium"
          />
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Индекс Мечты
          </Typography>
          <DreamIndexChip 
            label={`${stats.dreamIndex} 🏆`}
            size="medium"
            icon={<EmojiEvents />}
          />
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Рейтинг + бонус за игроков Барсы (+2 за каждого)
          </Typography>
        </Box>

        {stats.barcelonaPlayers > 0 && (
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            borderRadius: 2, 
            background: 'linear-gradient(45deg, rgba(165, 0, 68, 0.1) 30%, rgba(0, 77, 152, 0.1) 90%)',
            textAlign: 'center'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#A50044' }}>
              🔥 VISCA BARÇA! 🔥
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ваша команда содержит {stats.barcelonaPlayers} игроков из Барселоны!
            </Typography>
          </Box>
        )}
      </CardContent>
    </StatsCard>
  );
};

export default TeamStats; 