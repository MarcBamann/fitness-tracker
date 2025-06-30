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

  getValue(category: string): string {
    const entry = this.storage.getEntry(category, this.getToday());
    return entry?.value ?? '-';
  }

  getChartPoints(category: string): string {
    const entries = this.storage.getLast7Days(category);
    const numbers = entries.map(e => this.parseValue(e.value));
    return formatChartData(numbers);
  }

  openEditDialog(category: string) {
    const dialogRef = this.dialog.open(HealthValueDialogComponent, {
      width: '300px',
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.storage.saveEntry(category, {
          date: this.getToday(),
          value: result
        });
      }
    });
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private parseValue(value: string): number {
    const cleaned = value.replace(/[^\d.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
}
