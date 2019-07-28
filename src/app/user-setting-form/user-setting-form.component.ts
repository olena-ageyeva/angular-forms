import { Component, OnInit } from '@angular/core';
import { UserSettings } from 'src/app/data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.css']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings: UserSettings ={
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
    }

  singleModel="On";

  userSettings: UserSettings={... this.originalUserSettings};
  postError=false;
  postErrorMessage='';
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionTypes=this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any){
    console.log('error: ', errorResponse);
    this.postError=true;
    this.postErrorMessage=errorResponse.error.errorMeddage;
  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid)
    if (form.valid){
    this.dataService.postUserSettingsForm(this.originalUserSettings).subscribe(
      result=>console.log('success:', result),
      error=>this.onHttpError(error)
    );
    }
    else{
      this.postError=true;
      this.postErrorMessage="Please fix the above errors."
    }
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid)
    
  }

}
