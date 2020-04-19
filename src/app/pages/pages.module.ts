import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule, NbSelectModule, NbDatepickerModule, NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeComponent } from './home/home.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PatientImageComponent } from './patient-image/patient-image.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    NgxGaugeModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    PatientFormComponent,
    PatientTableComponent,
    PatientImageComponent,
    DialogueComponent,
    MapComponent,
  ],
})
export class PagesModule {
}
