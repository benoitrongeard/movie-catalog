import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  private _options;
  constructor(private _ngxToastr: ToastrService) {
    this._options = this._ngxToastr.toastrConfig;
    this._options.toastClass = 'custom-toastr';
    this._options.progressBar = true;

    //REMOVE
    this._options.disableTimeOut = true;
  }

  show() {
    this._ngxToastr.show('Hello world!', 'Toastr fun!', this._options);
  }
}
