import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Container,
  Typography,
  Box,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
  Snackbar,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import {
  SportsSoccer,
  Settings,
  Refresh,
  Close,
  Menu
} from "@mui/icons-material";

import { players } from './data/players';
import { Player, TeamStats } from './types/Player';
import { 
  calculateTeamStats, 
  canAddPlayer, 
  getTopAvailablePlayers,
  filterPlayersByPosition,
  sortPlayers
} from './utils/teamUtils';
import PlayerCard from './components/PlayerCard';
import TeamStatsComponent from './components/TeamStats';
import Recommendations from './components/Recommendations';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeaderContainer = styled.div`
  background: linear-gradient(45deg, #004D98 30%, #A50044 90%);
  color: white;
  padding: 2rem 0;
  text-align: center;
`;

const SidebarContainer = styled.div`
  width: 320px;
  padding: 2rem;
`;

const MainContent = styled.div`
  padding: 2rem;
`;

const FilterContainer = styled(Paper)`
  && {
    padding: 1.5rem;
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.9);
  }
`;

const PlayersGrid = styled(Grid)`
  && {
    margin-top: 2rem;
  }
`;

function App() {
  // Состояние приложения
  const [selectedPlayers, setSelectedPlayers] = useLocalStorageState<Player[]>("selectedPlayers", {
    defaultValue: [],
  });
  const [budget, setBudget] = useLocalStorageState<number>("budget", {
    defaultValue: 100,
  });
  const [positionFilter, setPositionFilter] = useState<string>("Все");
  const [showOnlyBarcelona, setShowOnlyBarcelona] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'name'>('rating');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Расчет статистики команды
  const teamStats = calculateTeamStats(selectedPlayers);
  const topRecommendations = getTopAvailablePlayers(players, selectedPlayers, budget);

  // Фильтрация и сортировка игроков
  let filteredPlayers = filterPlayersByPosition(players, positionFilter);
  if (showOnlyBarcelona) {
    filteredPlayers = filteredPlayers.filter(player => player.isBarcelona);
  }
  filteredPlayers = sortPlayers(filteredPlayers, sortBy);

  // Обработчики событий
  const handleTogglePlayer = (player: Player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      // Удаляем игрока
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      showSnackbar(`${player.name} удален из команды`, 'success');
    } else {
      // Добавляем игрока
      const { canAdd, reason } = canAddPlayer(player, selectedPlayers, budget);
      
      if (canAdd) {
        setSelectedPlayers([...selectedPlayers, player]);
        if (player.isBarcelona) {
          showSnackbar(`🔥 VISCA BARÇA! ${player.name} добавлен в команду!`, 'success');
        } else {
          showSnackbar(`${player.name} добавлен в команду`, 'success');
        }
      } else {
        showSnackbar(reason || "Не удалось добавить игрока", 'error');
      }
    }
  };

  const handleResetTeam = () => {
    setSelectedPlayers([]);
    showSnackbar("Команда сброшена", 'success');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Боковая панель с настройками
  const Sidebar = () => (
    <SidebarContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#004D98' }}>
          ⚙️ Настройки
        </Typography>
        <IconButton onClick={() => setSidebarOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          💰 Бюджет команды: {budget}M €
        </Typography>
        <Slider
          value={budget}
          onChange={(_, value) => setBudget(value as number)}
          min={50}
          max={200}
          step={10}
          marks={[
            { value: 50, label: '50M' },
            { value: 100, label: '100M' },
            { value: 150, label: '150M' },
            { value: 200, label: '200M' }
          ]}
          sx={{
            '& .MuiSlider-track': {
              background: 'linear-gradient(45deg, #A50044 30%, #004D98 90%)',
            },
            '& .MuiSlider-thumb': {
              background: 'linear-gradient(45deg, #A50044 30%, #004D98 90%)',
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Позиция</InputLabel>
          <Select
            value={positionFilter}
            label="Позиция"
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <MenuItem value="Все">Все позиции</MenuItem>
            <MenuItem value="Вратарь">Вратарь</MenuItem>
            <MenuItem value="Защитник">Защитник</MenuItem>
            <MenuItem value="Полузащитник">Полузащитник</MenuItem>
            <MenuItem value="Нападающий">Нападающий</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={sortBy}
            label="Сортировка"
            onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'name')}
          >
            <MenuItem value="rating">По рейтингу</MenuItem>
            <MenuItem value="price">По цене</MenuItem>
            <MenuItem value="name">По имени</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlyBarcelona}
              onChange={(e) => setShowOnlyBarcelona(e.target.checked)}
              sx={{
                color: '#A50044',
                '&.Mui-checked': {
                  color: '#A50044',
                },
              }}
            />
          }
          label="Показать только игроков Барселоны"
        />
      </Box>

      <Button
        variant="outlined"
        fullWidth
        onClick={handleResetTeam}
        startIcon={<Refresh />}
        sx={{ 
          borderColor: '#A50044', 
          color: '#A50044',
          '&:hover': {
            borderColor: '#8B0038',
            backgroundColor: 'rgba(165, 0, 68, 0.1)',
          }
        }}
      >
        Сбросить команду
      </Button>
    </SidebarContainer>
  );

  return (
    <AppContainer>
      {/* Заголовок */}
      <HeaderContainer>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <SportsSoccer sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                ⚽ Футбольный Калькулятор Команды
              </Typography>
              <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
                Создай команду мечты! 🔴🔵
              </Typography>
            </Box>
          </Box>
        </Container>
      </HeaderContainer>

      {/* Основной контент */}
      <Container maxWidth="xl">
        <MainContent>
          {/* Фильтры */}
          <FilterContainer elevation={3}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  💰 Бюджет: {budget}M €
                </Typography>
                <Slider
                  value={budget}
                  onChange={(_, value) => setBudget(value as number)}
                  min={50}
                  max={200}
                  step={10}
                  sx={{
                    '& .MuiSlider-track': {
                      background: 'linear-gradient(45deg, #A50044 30%, #004D98 90%)',
                    },
                    '& .MuiSlider-thumb': {
                      background: 'linear-gradient(45deg, #A50044 30%, #004D98 90%)',
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Позиция</InputLabel>
                  <Select
                    value={positionFilter}
                    label="Позиция"
                    onChange={(e) => setPositionFilter(e.target.value)}
                  >
                    <MenuItem value="Все">Все позиции</MenuItem>
                    <MenuItem value="Вратарь">Вратарь</MenuItem>
                    <MenuItem value="Защитник">Защитник</MenuItem>
                    <MenuItem value="Полузащитник">Полузащитник</MenuItem>
                    <MenuItem value="Нападающий">Нападающий</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Сортировка</InputLabel>
                  <Select
                    value={sortBy}
                    label="Сортировка"
                    onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'name')}
                  >
                    <MenuItem value="rating">По рейтингу</MenuItem>
                    <MenuItem value="price">По цене</MenuItem>
                    <MenuItem value="name">По имени</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showOnlyBarcelona}
                        onChange={(e) => setShowOnlyBarcelona(e.target.checked)}
                        sx={{
                          color: '#A50044',
                          '&.Mui-checked': {
                            color: '#A50044',
                          },
                        }}
                      />
                    }
                    label="Только Барса"
                  />
                  <IconButton 
                    onClick={() => setSidebarOpen(true)}
                    sx={{ color: '#004D98' }}
                  >
                    <Settings />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </FilterContainer>

          {/* Основная сетка */}
          <Grid container spacing={3}>
            {/* Левая колонка - Игроки */}
            <Grid item xs={12} lg={8}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#004D98' }}>
                👥 Доступные игроки ({filteredPlayers.length})
              </Typography>
              
              <Box className="players-grid">
                {filteredPlayers.map((player) => {
                  const isSelected = selectedPlayers.some(p => p.id === player.id);
                  const { canAdd, reason } = canAddPlayer(player, selectedPlayers, budget);
                  
                  return (
                    <Box key={player.id} className="player-card-container">
                      <PlayerCard
                        player={player}
                        isSelected={isSelected}
                        onToggleSelection={handleTogglePlayer}
                        canAdd={canAdd}
                        reason={reason}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            {/* Правая колонка - Статистика и рекомендации */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TeamStatsComponent stats={teamStats} budget={budget} />
                <Recommendations topPlayers={topRecommendations} />
              </Box>
            </Grid>
          </Grid>
        </MainContent>
      </Container>

      {/* Боковая панель */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Sidebar />
      </Drawer>

      {/* Уведомления */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ 
            width: '100%',
            ...(snackbarSeverity === 'success' && {
              background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)',
              color: 'white'
            })
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppContainer>
  );
}

export default App;
