import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbComponentShape, NbComponentSize, NbDialogService } from '@nebular/theme';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'ngx-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  constructor(private dialogService: NbDialogService,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getgover(); 
    this.getdelegate();
  }
  statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  gouver ;
  delegate ;
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  patientForm:FormGroup = new FormGroup({
    idPatient : new FormControl(null),
    firstName: new FormControl(null,Validators.required),
    lastName: new FormControl(null,Validators.required),
    birthday: new FormControl(null,Validators.required),
    sexe : new FormControl(null,Validators.required),
    cin : new FormControl(null,),
    gouvernerat : new FormControl(null,Validators.required),
    delegation   : new FormControl(null,Validators.required),
    fievre : new FormControl(null),
    toux : new FormControl(null),
    respiratoire : new FormControl(null),
    diarrhee : new FormControl(null),
    maux_tete : new FormControl(null),
    doux_muscule : new FormControl(null),
    perte_adorat : new FormControl(null),
    perte_appetit : new FormControl(null),
    fatigue_inahbituelle : new FormControl(null),
    pas_sympthomes : new FormControl(null),
  })

  register()
  {
    this.verify();
    const randomId = this.getRandom(9)
    this.patientForm.get('idPatient').setValue(randomId);
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: "l'id : " +randomId,
      },
    });
    console.log(this.patientForm.value)
    this.patientService.register(JSON.stringify(this.patientForm.value)).subscribe(
      data=> {console.log(data);},
      error=> {console.error(error);}
      
      )
      this.patientForm.reset();
  }

  getgover() {
    this.patientService.getgouvernerat().subscribe(
      data=> {console.log(data);this.gouver = data},
      error=> {console.error(error);}
      
      )
    }

    getdelegate() {
      this.patientService.getdelegation().subscribe(
        data=> {console.log(data);this.delegate = data},
        error=> {console.error(error);}
        
        )
      }

  getRandom(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    }

verify()
{
  //this.patientForm.get('email').setValue(this.patientForm.value.email);
  if(this.patientForm.get('fievre').value ==null)
  {
    this.patientForm.get('fievre').setValue(false);
  }
  if(this.patientForm.get('toux').value ==null)
  {
    this.patientForm.get('toux').setValue(false);
  }
  if(this.patientForm.get('respiratoire').value ==null)
  {
    this.patientForm.get('respiratoire').setValue(false);
  }
  if(this.patientForm.get('diarrhee').value ==null)
  {
    this.patientForm.get('diarrhee').setValue(false);
  }
  if(this.patientForm.get('maux_tete').value ==null)
  {
    this.patientForm.get('maux_tete').setValue(false);
  }
  if(this.patientForm.get('doux_muscule').value ==null)
  {
    this.patientForm.get('doux_muscule').setValue(false);
  }
  if(this.patientForm.get('perte_appetit').value ==null)
  {
    this.patientForm.get('perte_appetit').setValue(false);
  }
  if(this.patientForm.get('fatigue_inahbituelle').value ==null)
  {
    this.patientForm.get('fatigue_inahbituelle').setValue(false);
  }
  if(this.patientForm.get('pas_sympthomes').value ==null)
  {
    this.patientForm.get('pas_sympthomes').setValue(false);
  }
  if(this.patientForm.get('perte_adorat').value ==null)
  {
    this.patientForm.get('perte_adorat').setValue(false);
  }
}

}
