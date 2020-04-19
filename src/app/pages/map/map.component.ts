import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { registerMap } from 'echarts';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
  }
  latlong: any = {};
  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;

  bubbleTheme: any;
  geoColors: any[];

  private alive = true;

  constructor(private theme: NbThemeService,
              private http: HttpClient) {

    combineLatest([
      this.http.get('assets/map/world.json'),
      this.theme.getJsTheme(),
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([map, config]: [any, any]) => {

        registerMap('world', map);

        const colors = config.variables;
        this.bubbleTheme = config.variables.bubbleMap;
        this.geoColors = [colors.primary, colors.info, colors.success, colors.warning, colors.danger];

        this.latlong = {
       
          'TN': { 'latitude': 34, 'longitude': 9 },
          'TN2': { 'latitude': 35, 'longitude': 10 },
          'TN3': { 'latitude': 36, 'longitude': 10.5},
          'TN4': { 'latitude': 37, 'longitude': 9.5 },
          'TN5': { 'latitude': 37, 'longitude': 10 },
          

          
        };

        this.mapData = [
         

          { 'code': 'TN', 'name': 'Gouvernorat de Gafsa', 'value': 32, 'color': this.getRandomGeoColor() },
          { 'code': 'TN2', 'name': 'Gouvernorat de Kairouan', 'value': 6, 'color': this.getRandomGeoColor() },
          { 'code': 'TN3', 'name': 'Gouvernorat de Sousse', 'value': 71, 'color': this.getRandomGeoColor() },
          { 'code': 'TN4', 'name': 'Gouvernorat de Bizerte', 'value': 18, 'color': this.getRandomGeoColor() },
          { 'code': 'TN5', 'name': 'Gouvernorat de Tunis', 'value': 193, 'color': this.getRandomGeoColor() },

         ];

        this.mapData.forEach((itemOpt) => {
          if (itemOpt.value > this.max) {
            this.max = itemOpt.value;
          }
          if (itemOpt.value < this.min) {
            this.min = itemOpt.value;
          }
        });

        this.options = {
          title: {
            text: 'Les nouveaux cas Covid-19 en Tunisie',
            left: 'center',
            top: '16px',
            textStyle: {
              color: this.bubbleTheme.titleColor,
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `${params.name}: ${params.value[2]}`;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            max: this.max,
            inRange: {
              symbolSize: [6, 60],
            },
          },
          geo: {
            name: 'World Population (2010)',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: this.bubbleTheme.areaColor,
                borderColor: this.bubbleTheme.areaBorderColor,
              },
              emphasis: {
                areaColor: this.bubbleTheme.areaHoverColor,
              },
            },
            zoom: 1.1,
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.mapData.map(itemOpt => {
                return {
                  name: itemOpt.name,
                  value: [
                    this.latlong[itemOpt.code].longitude,
                    this.latlong[itemOpt.code].latitude,
                    itemOpt.value,
                  ],
                  itemStyle: {
                    normal: {
                      color: itemOpt.color,
                    },
                  },
                };
              }),
            },
          ],
        };
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getRandomGeoColor() {
    const index = Math.round(Math.random() * this.geoColors.length);
    return this.geoColors[index];
  }
}
