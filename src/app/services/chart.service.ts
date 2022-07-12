import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getOptions(type: any): any {
    switch(type.type) {
      case 'pieChart': 
        return {
          chart: {
            type: 'pieChart',
            height: 400,
            x: function (d: any) { return d.code; },
            y: function (d: any) { return d.count; },
            showLabels: true,
            duration:500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
              margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            }
          }
        }
      case 'multiBarChart':
        return {
          chart: {
            type: 'multiBarChart',
            height: 400,
            stacked: true,
            duration: 500,
            legend: {
              margin: {
                top: 12
              }
            },
            margin:{
              top: 0,
              bottom: 100,
            },
            xAxis: {
              axisLabel: type.xAxisLabel || 'xAxis',
              rotateLabels: -70,
              margin:{
                top: 0,
                right: 0,
                bottom: 100,
                left: 0
              },
            },
            yAxis: {
              axisLabel: type.yAxisLabel || 'yAxis',
            }
          }
        }
    }
  }
}
