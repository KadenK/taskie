import { WeatherCondition } from "./util";

export const tasks = [
  { id: 1, name: "Task 1", checked: false, parentId: null },
  { id: 5, name: "Subtask 1.1", checked: false, parentId: 1 },
  { id: 6, name: "Subtask 1.2", checked: true, parentId: 1 },
  { id: 7, name: "Subtask 1.3", checked: false, parentId: 1 },
  { id: 8, name: "Subtask 1.4", checked: true, parentId: 1 },
  { id: 2, name: "Task 2", checked: true, parentId: null },
  { id: 3, name: "Task 3", checked: false, parentId: null },
  { id: 9, name: "Subtask 3.1", checked: false, parentId: 3 },
  { id: 10, name: "Subtask 3.2", checked: true, parentId: 3 },
  { id: 11, name: "Subtask 3.2.1", checked: false, parentId: 10 },
  { id: 12, name: "Subtask 3.2.2", checked: true, parentId: 10 },
  { id: 13, name: "Subtask 3.3", checked: false, parentId: 3 },
  { id: 14, name: "Subtask 3.4", checked: true, parentId: 3 },
  { id: 4, name: "Task 4", checked: true, parentId: null },
];

export const weatherConditions = {
  today: WeatherCondition.Thunderstorm,
  tomorrow: WeatherCondition.Snowy,
};
