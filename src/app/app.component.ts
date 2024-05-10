import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { forbiddenNameValidtor } from './shared/user-name.validator';
import { passwordValidtor } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RF-Demo';

  // registrationForm:FormGroup=new FormGroup({});
  registrationForm!:FormGroup

  constructor(private fb:FormBuilder,private _registrationService:RegistrationService){}

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail()
  {
    this.alternateEmails.push(this.fb.control(''));
  }

  ngOnInit(): void {
    this.registrationForm=this.fb.group({
      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidtor(/password/)]],
      email:[''],
      subscribe:[false],
      password:[''],
      confirmPwd:[''],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      }),
      alternateEmails: this.fb.array([])
    },{validators:passwordValidtor})

    this.registrationForm.get('subscribe')?.valueChanges
    .subscribe(checkedvalue=>{
      const email=this.registrationForm.get('email');
      if(checkedvalue)
      {
        email?.setValidators(Validators.required);
      }else
      {
        email?.clearValidators();
      }
      email?.updateValueAndValidity()
    })
    
  }
// using Form Builder to manage control values


  // registrationForm=new FormGroup({
  //   userName: new FormControl('Salman'),
  //   email:new FormControl(''),
  //   subscrive:new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPwd:new FormControl(''),
  //   address: new FormGroup({
  //     city:new FormControl(''),
  //     state:new FormControl(''),
  //     postalCode:new FormControl('')
  //   }),
  // });

  loadApiData()
  {
    this.registrationForm.setValue({
      userName:'Bruce',
      email:'avs@test.com',
      subscribe:'',
      password:'test',
      confirmPwd:'test',
      address:{
        city:'Bangalore',
        state:'Karnataka',
        postalCode:'560001'
      },
      alternateEmails:''
    });
  }
  patchApiData()
  {
    this.registrationForm.patchValue({
      userName:'Sam',
      password:'tester',
      confirmPwd:'tester',
    });
  }


  onSubmit(){
    console.log(this.registrationForm.value)
    this._registrationService.register(this.registrationForm.value)
    .subscribe(
      response =>console.log('Success!',response),
      error=>console.error('Error!',error)
    )
  }
}
