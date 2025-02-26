import { RelativeDay, WeatherCondition } from "./util";

export const tasks = [
  {
    id: 1,
    name: "Task 1",
    checked: false,
    children: [
      { id: 5, name: "Subtask 1.1", checked: false },
      { id: 6, name: "Subtask 1.2", checked: true },
      { id: 7, name: "Subtask 1.3", checked: false },
      { id: 8, name: "Subtask 1.4", checked: true },
    ],
  },
  { id: 2, name: "Task 2", checked: true, children: [] },
  {
    id: 3,
    name: "Task 3",
    checked: false,
    children: [
      { id: 9, name: "Subtask 3.1", checked: false },
      {
        id: 10,
        name: "Subtask 3.2",
        checked: true,
        children: [
          { id: 11, name: "Subtask 3.2.1", checked: false },
          { id: 12, name: "Subtask 3.2.2", checked: true },
        ],
      },
      { id: 13, name: "Subtask 3.3", checked: false },
      { id: 14, name: "Subtask 3.4", checked: true },
    ],
  },
  { id: 4, name: "Task 4", checked: true },
];

export const smartTasks = [
  {
    id: 1,
    name: "Bring in cushions",
    checked: false,
    when: RelativeDay.Tomorrow,
    condition: WeatherCondition.Thunderstorm,
  },
  {
    id: 2,
    name: "Clean the pool",
    checked: false,
    when: RelativeDay.Today,
    condition: WeatherCondition.Sunny,
  },
  {
    id: 3,
    name: "Water the plants",
    checked: false,
    when: RelativeDay.Today,
    condition: WeatherCondition.Cloudy,
  },
];

export const weatherConditions = {
  [RelativeDay.Today]: WeatherCondition.Sunny,
  [RelativeDay.Tomorrow]: WeatherCondition.Thunderstorm,
  [RelativeDay.Yesterday]: WeatherCondition.Windy,
};
