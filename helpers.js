const saveSession = async () => {
  try {
    const session = {
      duration: Math.floor((INITIAL_TIME - timeLeft) / 60),
      category: selectedCategory,
      distractions: distractionCount,
      date: new Date().toISOString(),
    };

    const existingData = await AsyncStorage.getItem('sessions');
    const sessions = existingData ? JSON.parse(existingData) : [];

    sessions.push(session);

    await AsyncStorage.setItem('sessions', JSON.stringify(sessions));
  } catch (error) {
    console.log('Seans kaydedilemedi', error);
  }
};
