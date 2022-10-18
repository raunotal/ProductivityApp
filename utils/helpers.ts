export const fromSecondsToString = (seconds: number) => {
  const todoTimeMinutes = Math.round(seconds / 60);
  return fromMinutesToString(todoTimeMinutes);
};

export const fromMinutesToString = (todoTimeMinutes: number) => {
  let durationText = `${todoTimeMinutes}min`;
  if (todoTimeMinutes === 60) {
    durationText = "1h";
  } else if (todoTimeMinutes > 60) {
    durationText = `${Math.floor(todoTimeMinutes / 60)}h ${
      todoTimeMinutes % 60
    }min`;
  }
  return durationText;
};
