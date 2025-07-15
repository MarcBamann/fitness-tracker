import { Injectable } from '@angular/core';

interface HealthData {
  [category: string]: {
    [date: string]: number;
  };
}

@Injectable({ providedIn: 'root' })
export class HealthStorageService {
  private STORAGE_KEY = 'health-data';

  constructor() {}

  // Hilfsfunktion: Datum als String formatieren: "YYYY-MM-DD"
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Gesamte Daten aus LocalStorage holen
  getAllData(): HealthData {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  // Einzelnen Wert lesen (Kategorie + Datum)
  getValue(category: string, date: Date): number | null {
    const data = this.getAllData();
    const dateKey = this.formatDate(date);
    return data[category]?.[dateKey] ?? null;
  }

  // Einzelnen Wert speichern / überschreiben
  saveValue(category: string, value: number, date: Date): void {
    const data = this.getAllData();
    const dateKey = this.formatDate(date);

    if (!data[category]) {
      data[category] = {};
    }
    data[category][dateKey] = value;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
}
