import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'ngx-patient-image',
  templateUrl: './patient-image.component.html',
  styleUrls: ['./patient-image.component.scss']
})
export class PatientImageComponent implements OnInit {
  myImage = new Image();
  result;
  gaugeType = "arch";
  gaugeValue = 0;
  gaugeLabel = "";
  gaugeAppendText = "%";
  size = 125;
  thick = 10;
  animate = true;
  thresholdConfig = {
    '0': {color: 'green'},
    '25': {color: 'yellow'},
    '75': {color: 'orange'},
    '100': {color: 'red'}
};
 /* myImage.crossOrigin = "anonymous";
  myImage.src = 'http://localhost:3000/getImage';*/

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  imageSrc: string;
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });
   
 get f(){
   return this.myForm.controls;
 }
  
 onFileChange(event) {
   const reader = new FileReader();
   
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     reader.readAsDataURL(file);
   
     reader.onload = () => {
  
       this.imageSrc = reader.result as string;
    
       this.myForm.patchValue({
         fileSource: reader.result
       });
  
     };
  
   }
 }
  
 submit(){
   console.log(this.myForm.value);
   this.modelLoad("http://localhost:3000/getModel");
 }


 modelLoad(model)
     {
     this.myImage.crossOrigin = "anonymous";
     this.myImage.src = this.imageSrc;
      (async () => {
        model = await tf.loadLayersModel(model);
        const pred = model.predict(this.preprocess(this.myImage)).dataSync();
        console.log(pred);
        this.result =  Array.prototype.slice.call(pred);
        this.gaugeValue = this.result*100
     })();
     }
    preprocess(img)
    {

    //convert the image data to a tensor 
    let tensor = tf.browser.fromPixels(img)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [150,150]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
    }

}
