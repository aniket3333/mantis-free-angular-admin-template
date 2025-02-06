import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from './user-model';

export class UserFormModel extends FormGroup {

  //#region Constructor
  constructor() {
    super({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: new FormControl(''),
      userType: new FormControl(''),
      specialization: new FormControl(''),
    });
  }
  //#endregion

  //#region Methods

  // Method to get form data as a UserModel
  getFormData(): UserModel {
    let model = new UserModel();
    model.id = this.get('id')?.value || 0;
    model.firstName = this.get('firstName')?.value;
    model.lastName = this.get('lastName')?.value;
    model.email = this.get('email')?.value;
    model.password = this.get('password')?.value;
    model.confirmPassword = this.get('confirmPassword')?.value;
    model.phoneNumber = this.get('phoneNumber')?.value;
    model.address = this.get('address')?.value;
    model.userType = this.get('userType')?.value;
    model.specialization = this.get('specialization')?.value;
    return model;
  }

  // Method to set values for specific form controls
  setControls(userModel: UserModel): void {
    this.get('id')?.setValue(userModel.id || '');
    this.get('firstName')?.setValue(userModel.firstName || '');
    this.get('lastName')?.setValue(userModel.lastName || '');
    this.get('email')?.setValue(userModel.email || '');
    this.get('password')?.setValue(userModel.password || '');
    this.get('confirmPassword')?.setValue(userModel.confirmPassword || '');
    this.get('phoneNumber')?.setValue(userModel.phoneNumber || '');
    this.get('address')?.setValue(userModel.address || '');
    this.get('userType')?.setValue(userModel.userType || '');
    this.get('specialization')?.setValue(userModel.specialization || '');
  }

  //#endregion
}
