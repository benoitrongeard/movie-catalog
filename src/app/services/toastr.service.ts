import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service for displaying custom toastr messages.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  private _options;

  /**
   * Constructs a new instance of the CustomToastrService.
   * @param _ngxToastr The ToastrService instance.
   */
  constructor(private _ngxToastr: ToastrService) {
    this._options = this._ngxToastr.toastrConfig;
    this._options.toastClass = 'custom-toastr';
    this._options.progressBar = true;
    this._options.timeOut = 3000;
    this._options.iconClasses = {
      success: 'success',
      error: 'error',
      warning: 'warning',
    };
  }

  /**
   * Displays a success toastr message.
   * @param title The title of the toastr message.
   * @param message The content of the toastr message.
   */
  success(title: string, message: string) {
    this._options = { ...this._options, toastClass: 'success' };
    this._ngxToastr.success(message, title, this._options);
  }

  /**
   * Displays an error toastr message.
   * @param title The title of the toastr message.
   * @param message The content of the toastr message.
   */
  error(title: string, message: string) {
    this._options = { ...this._options, toastClass: 'error' };
    this._ngxToastr.error(message, title, this._options);
  }

  /**
   * Displays a warning toastr message.
   * @param title The title of the toastr message.
   * @param message The content of the toastr message.
   */
  warning(title: string, message: string) {
    this._options = { ...this._options, toastClass: 'warning' };
    this._ngxToastr.warning(message, title, this._options);
  }
}
