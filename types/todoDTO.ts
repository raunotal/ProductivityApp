export type TodoDTO = {
  id: number;
  name: string;
  totalTimeInSeconds: number;
  progressInSeconds: number;
};

export type NewTodoDTO = {
  name: string;
  totalTimeInSeconds: number;
};

export type UpdateTodoDTO = {
  id: number;
  isRunning: boolean;
  dateTime: Date;
};
