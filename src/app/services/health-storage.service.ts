import { Injectable } from '@angular/core';
import { HealthData, HealthEntry } from '../models/health-data.model';

@Injectable({ providedIn: 'root' })
export class HealthStorageService {
  private readonly STORAGE_KEY = 'health-data';

  getHealthData(): HealthData {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  saveEntry(category: string, entry: HealthEntry): void {
    const data = this.getHealthData();
    if (!data[category]) {
      data[category] = [];
    }

    const index = data[category].findIndex(e => e.date === entry.date);
    if (index >= 0) {
      data[category][index] = entry;
    } else {
      data[category].push(entry);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getEntry(category: string, date: string): HealthEntry | undefined {
    return this.getHealthData()[category]?.find(e => e.date === date);
  }

  getLast7Days(category: string): HealthEntry[] {
    const today = new Date();
    const data = this.getHealthData()[category] || [];

    return [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      return data.find(e => e.date === dateStr) || { date: dateStr, value: '-' };
    }).reverse();
  }
}
