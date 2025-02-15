import { Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastrAlertService {

  //#region Constructor

  constructor(@Inject(ToastrService) private _toastrService: ToastrService) { }

  //#endregion

  //#region Properties

  

  //#endregion

  //#region Methods

  success(title: string, message: string) {
    if (!(message)) {
      return;
    }
    title = title;
    message = message;
    this._toastrService.success(message, title);
  }

  error(title: string, message: string) {
    if (!(message)) {
      return;
    }
    title = title;
    message = message;
    this._toastrService.error(message, title);
  }

  info(title: string, message: string) {
    if (!(message)) {
      return;
    }

    this._toastrService.info(message, title);
  }

  

  //#endregion

}
