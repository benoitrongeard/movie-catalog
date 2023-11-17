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

  // Key used to display label value of generic data
  @Input({ required: true }) labelKey?: string;

  // Key used to display value of generic data
  @Input({ required: true }) valueKey?: string;

  //Key of image url
  @Input() imageKey?: string;

  // Image url
  @Input() imageUrl?: string;

  // Image extension
  @Input() imageExtension?: string = 'svg';

  getLabelKey() {
    return this.labelKey as keyof TData;
  }

  getValueKey() {
    return this.valueKey as keyof TData;
  }

  getImageKey() {
    return this.imageKey as keyof TData;
  }

  /**
   * Get the label of selected generic data from the current form control name
   */
  getLabelFromControl() {
    return this.data.find(
      d => d[this.getValueKey()] === this.controlName?.value
    )?.[this.getLabelKey()] as string;
  }

  getImageFromControl() {
    return this.data.find(
      d => d[this.getValueKey()] === this.controlName?.value
    )?.[this.getImageKey()] as string;
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

  /**
   * Select a generic data and fire output event change
   * @param value Generic data that selected
   */
  select(value: TData) {
    this.controlName?.patchValue(value[this.getValueKey()]);
  }
}
