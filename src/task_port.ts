import { ObservableValue } from "./hex/observable_value";

export interface Task {
  id: string;
  name: string;
  position: number;
  isArchived: boolean;
  isActive: boolean;
}

export interface TasksPort {
  items: ObservableValue<Task[]>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  archive(task: Task): Promise<void>;
  restore(task: Task): Promise<void>;
  startTimer(task: Task): Promise<void>;
  stopTimer(task: Task): Promise<void>;
  getIsActive(task: Task): Promise<boolean>;
  getIsArchived(task: Task): Promise<boolean>;
}
