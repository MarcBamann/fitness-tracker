import { HealthEntry } from '../models/health-data.model';

export function formatChartData(values: number[]): string {
  return values.map((v, i) => `${i * 20},${50 - v}`).join(' ');
}
