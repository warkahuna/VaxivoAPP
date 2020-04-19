import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { Temperature, TemperatureHumidityData } from '../../@core/data/temperature-humidity';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.scss']
})
export class DialogueComponent implements OnDestroy {
  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';

  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });

    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    )
      .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
