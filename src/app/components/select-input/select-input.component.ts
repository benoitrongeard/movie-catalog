import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent<TData> {
  showList = false;
  private _data!: TData[];
  private _controlName!: AbstractControl;

  // Liste of generic data
  @Input({ required: true }) set data(value: TData[]) {
    // When data changed, reset filtered data and selected value
    if (value) {
      this._data = Object.create(value);
    }
  }

  get data() {
    return this._data;
  }

  // Control name to bind
  @Input({ required: true }) set controlName(value: AbstractControl | null) {
    if (value) {
      this._controlName = value;
    }
  }

  get controlName() {
    return this._controlName;
  }

  /**
   * Show suggestion list on focus
   */
  toggleList() {
    this.showList = !this.showList;
  }

  /**
   * Hide suggestion list on focus
   */
  hideDataList() {
    this.showList = false;
  }
}
