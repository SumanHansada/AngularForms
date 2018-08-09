import { FormPoster } from './../services/form-poster.service';
import { Employee } from './../models/employee.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  //languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Others']
  languages = [];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError = false;
  startDate: Date;
  minDate: Date = new Date();
  startTime: Date = new Date();
  onOffSwitch = "Off";
  postRating = 5;
  constructor(private formPoster: FormPoster){
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error: ', err)
      );
  }
  submitForm(form: NgForm){
      //console.log(this.model);
      //It can be also -
      //console.log(form.value);
      this.validatePrimaryLanguage(this.model.primaryLanguage);
      if(this.hasPrimaryLanguageError)
        return;

      this.formPoster.postEmployeeForm(this.model).
      subscribe(
        data => console.log('Success : ', data),
        err => console.log('Error : ', err)
      )
  }
  validatePrimaryLanguage(value)
  {
    //console.log("Selected Primary Language :- " + this.model.primaryLanguage);
    if(value === "default")
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }
  hover(value) {
    console.log("hover - ", value);
  }

  leave(value) {
    console.log("leave - ", value)

  }
  //model = new Employee(null, null, null, null, null);
  // firstNameToUpperCase(value: string)
  // {
  //   if(value.length > 0)
  //     this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
  //   else
  //     this.model.firstName = value;
  // }
}
