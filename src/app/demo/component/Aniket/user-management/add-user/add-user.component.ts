import { CommonModule } from '@angular/common';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../Ishare-point.service';
import { HttpStatus } from '../../common/http-status';
import { ProviderList } from 'src/app/app-provider.registrar';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoaderService } from '../../loader.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
    standalone: true,
    imports: [HttpClientModule,CommonModule,ReactiveFormsModule],
    encapsulation: ViewEncapsulation.None,
    providers: [ProviderList]
})
export class AddUserComponent implements OnInit{

  addUserForm:FormGroup;
  selectedFile: File | null = null; // Stores the selected file
  // showError: string;
  showSuccess: string;

 get f(){
 return this.addUserForm.controls;
 }
constructor(private _loaderservice:LoaderService,private toasterService:HotToastService,private fb:FormBuilder,private http: HttpClient,private _formBuilder: UntypedFormBuilder,private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }
ngOnInit(): void {
  this.addUserForm = this.fb.group({
    Name: [''],
    MobileNumber: [''],
    EmailAddress: [''],
    MFAStatusId: [5],
    LanguageId: [1],
    GenderId: [1],
    ImageFile: [null]
  })
}


createFormData(formValue: any): FormData {
  const formData = new FormData();
console.log(formValue);
  formData.append('Name', formValue.Name);
  formData.append('MobileNumber', formValue.MobileNumber);
  formData.append('EmailAddress', formValue.EmailAddress);
  formData.append('MFAStatusId', formValue.MFAStatusId);
  formData.append('LanguageId', formValue.LanguageId);
  formData.append('GenderId', formValue.GenderId);
  if (formValue.ImageFile) {
    formData.append('ImageFile', this.selectedFile);
  }

  

  return formData;
}


cancelAddUpdateModel()
{
  this._router.navigate(['/pages/users']);
}

onSubmit() {
  const formData = this.createFormData(this.addUserForm.value);
  this._loaderservice.isLoading.next(true);
  this.sharePointService.addUser(formData)
    .subscribe((response) => {
      if(response.Status == HttpStatus.Failed){
        // this.showError = response.Message.trim();
        this._loaderservice.isLoading.next(false);

        this.toasterService.error(response.Message);
      }
      if (response.Status == HttpStatus.Success) {
        // this.showSuccess = response.Message.trim();
        this._loaderservice.isLoading.next(false);

        this.toasterService.success(response.Message);
        setTimeout(()=>{
          this.cancelAddUpdateModel();
        },2000)
      } else {
        // this.showError =response.Message.trim();
        this._loaderservice.isLoading.next(false);

        this.toasterService.error(response.Message);

        // this.cancelAddUpdateModel();
      }
   
    },
  (error)=>{
    // this.showError ='';
    // this.cancelAddUpdateModel();
    this._loaderservice.isLoading.next(false);
    this.toasterService.error(error.Message);


  });
}
onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement)?.files?.[0];

  if (file) {
    this.selectedFile = file;
    this.addUserForm.patchValue({ ImageFile: file });
    this.addUserForm.get('ImageFile')?.updateValueAndValidity();
  } else {
    this.addUserForm.patchValue({ ImageFile: null });
    this.addUserForm.get('ImageFile')?.updateValueAndValidity();
  }
}
}
