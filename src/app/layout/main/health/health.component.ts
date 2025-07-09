import { Component } from '@angular/core';
import {formatChartData} from '../../../utils/chart-utils';
import {HealthStorageService} from '../../../services/health-storage.service';
import {HealthCardComponent} from '../../../components/health-card/health-card.component';
import {HealthValueDialogComponent} from '../../../components/health-value-dialog/health-value-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css'],
  imports: [
    HealthCardComponent,
    NgForOf
  ]
})
export class HealthComponent {
  cards = [
    {
      title: 'Calories',
      icon: '/flame.png',
      subtitle: 'kcal today',
      wrapperClass: 'calories',
      chartColor: '#e67e22'
    },
    {
      title: 'Sleep',
      icon: '/sleep.png',
      subtitle: 'Last night',
      wrapperClass: 'sleep',
      chartColor: '#9b59b6'
    },
    {
      title: 'Gewicht',
      icon: '/scale.png',
      subtitle: 'Aktueller Stand',
      wrapperClass: 'gewicht',
      chartColor: '#e67e22'
    },
    {
      title: 'Bier',
      icon: '/water.png',
      subtitle: 'Today',
      wrapperClass: 'water',
      chartColor: '#3498db'
    },
    {
      title: 'Stress',
      icon: '/stress.png',
      subtitle: 'Heute',
      wrapperClass: 'stress',
      chartColor: '#c0392b'
    },
    {
      title: 'Herzschlag',
      icon: '/heartbeat.png',
      subtitle: 'Letzte Messung',
      wrapperClass: 'herzschlag',
      chartColor: '#e74c3c'
    },
    {
      title: 'Blutdruck',
      icon: '/bloodpressure.png',
      subtitle: 'Letzte Messung',
      wrapperClass: 'blutdruck',
      chartColor: '#2980b9'
    },
    {
      title: 'Blutzucker',
      icon: '/blood-sugar.png',
      subtitle: 'Heute',
      wrapperClass: 'blutzucker',
      chartColor: '#1abc9c'
    }
  ];

  constructor(
    private dialog: MatDialog,
    private storage: HealthStorageService
  ) {}

  // Wert für die aktuelle Tagesanzeige holen
  getValue(category: string): string {
    const entry = this.storage.getValue(category, new Date());
    return entry !== null ? entry.toString() : '-';
  }

  // Werte der letzten 7 Tage holen für Chart
  getChartPoints(category: string): number[] {
    const points: number[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const value = this.storage.getValue(category, date);
      points.push(value ?? 0);
    }

    return points;
  }

  getSvgPoints(category: string): string {
    const values = this.getChartPoints(category);
    const max = Math.max(...values, 1);
    const pointCount = values.length;

    return values
      .map((v, i) => {
        const x = (i / (pointCount - 1)) * 150; // x-Koordinate (Breite)
        const y = 50 - (v / max) * 50;           // y-Koordinate (Höhe), invertiert da SVG y=0 oben ist
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  }

  // Dialog öffnen zum Bearbeiten des Werts
  openEditDialog(category: string) {
    const dialogRef = this.dialog.open(HealthValueDialogComponent, {
      width: '300px',
      data: {
        category,
        value: this.storage.getValue(category, new Date()),
        date: new Date(),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.storage.saveValue(result.category, result.value, result.date);

        // Trigger zum Neurendern
        this.cards = [...this.cards];
      }
    });
  }
}
