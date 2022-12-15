export type TodoDTO = {
  id: number;
  name: string;
  totalTimeInSeconds: number;
  progressInSeconds: number;
  isRunning: boolean;
};

export type NewTodoDTO = {
  name: string;
  totalTimeInSeconds: number;
};

export type UpdateTodoDTO = {
  id: number;
  isRunning: boolean;
}
