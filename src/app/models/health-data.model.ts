export interface HealthEntry {
  date: string;
  value: string;
}

export interface HealthData {
  [category: string]: HealthEntry[];
}
