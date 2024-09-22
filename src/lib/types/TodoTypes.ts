export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  time: string;
}

export type TodoResponse = TodoItem[];
