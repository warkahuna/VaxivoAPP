import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'ngx-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss']
})
export class PatientTableComponent implements OnInit {

  //constructor() { }
  private info = [];
  private info2 = [];
  ngOnInit(): void {
  }
  settings = {
    ////////
    hideSubHeader: true,
    actions: {
      add: false,
      edit:false,

      },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-edit"></i>',
      confirmDelete: true,
    },

    ////
    columns: {
      idPatient : {
        title: 'ID',
        type: 'string',
      },
    
      firstName: {
        title: 'Nom',
        type: 'string',
      },
      lastName: {
        title: 'Prenom',
        type: 'string',
      },
      sexe: {
        title: 'Sexe',
        type: 'string',
      },
      gouvernerat : {
        title: 'Gouvernerat',
        type: 'string',
      },
      delegation : {
        title: 'Délégation',
        type: 'string',
      },
     
      birthday: {
        title: 'Date de naissance',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service: SmartTableData,private router: Router,private patientService : PatientService) {
    const data =  {
      id: 3,
      firstName: 'Mark',
      lastName: 'Otto',
      sex: 'Male',
      age: '28',
    }
    this.getdata()
  }

  public getdata()
  {
    this.patientService.listUsers()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public fillData(data){
    console.log(data)
    /*data.forEach(element => {
      this.info.push(element["firstName"])
      this.info.push(element["firstName"])
      this.info.push(element["firstName"])
      this.info.push(element["firstName"])
      this.info.push(element["firstName"])
      this.info2.push(this.info);
      this.info=[];
    });*/
    //console.log(this.info2);
    //console.log(this.tablesService.getBorderedTable())
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
   this.router.navigate(['/pages/patientImage'])
  }
}
