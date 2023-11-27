import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  effect,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { StringUtils } from 'src/app/utils/string.utils';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
})
export class ComboboxComponent<TData> implements OnInit {
  private _data!: TData[];
  private _controlName!: AbstractControl<TData>;

  // Liste of generic data
  @Input({ required: true }) set data(value: TData[]) {
    // When data changed, reset filtered data and selected value
    if (value) {
      this._data = Object.create(value);
      this.filteredData = this._data;

      this.selectedValue?.patchValue('');
    }
  }

  get data() {
    return this._data;
  }

  // Key used to display label value of generic data
  @Input({ required: true }) labelKey?: string;

  // Output event when a generic data is selected
  @Output() newItemSelected = new EventEmitter<TData>();

  //Key of image url
  @Input() imageKey?: string;

  // Image url
  @Input() imageUrl?: string;

  // Image extension
  @Input() imageExtension?: string | null;

  // Label of input
  @Input({ required: true }) labelField!: string;

  // Control name to bind
  @Input({ required: true }) set controlName(value: AbstractControl<TData>) {
    if (value) {
      this._controlName = value;
    }
  }

  get controlName() {
    return this._controlName;
  }

  selectedValue: FormControl = new FormControl('');
  filteredData!: TData[];
  showList = false;

  // Listen change on input field
  selectedValueSignal$: Signal<string>;

  constructor() {
    this.selectedValueSignal$ = toSignal(this.selectedValue.valueChanges);
    effect(() => {
      const value = this.selectedValueSignal$();
      if (value != undefined) {
        this.filterData(value);
      }
    });
  }

  ngOnInit(): void {
    this.selectedValue.patchValue(this.controlName?.value[this.getLabelKey()]);
  }

  getLabelKey() {
    return this.labelKey as keyof TData;
  }

  getImageKey() {
    return this.imageKey as keyof TData;
  }

  /**
   * Select a generic data and fire output event change
   * @param value Generic data that selected
   */
  select(value: TData) {
    this.selectedValue?.patchValue(value[this.getLabelKey()]);

    if (this.controlName) {
      this.controlName.patchValue(value);
    }

    this.newItemSelected.emit(value);
  }

  /**
   * Show suggestion list on focus
   */
  showDataList() {
    this.showList = true;
  }

  /**
   * Hide suggestion list on focus
   */
  hideDataList() {
    this.showList = false;
  }

  /**
   * Toggle suggestion list on click
   */
  toggleDataList() {
    this.showList = !this.showList;
  }

  /**
   * Filter generic data with comparaison between value a
   * @param value string to compare with value of generic data to filter array
   * @returns void
   */
  filterData(value: string) {
    if (value && value.length > 0) {
      this.filteredData = this.data
        ?.filter(item =>
          StringUtils.ignoreCaseAndDiacritic(
            item[this.getLabelKey()] as string
          ).includes(StringUtils.ignoreCaseAndDiacritic(value))
        )
        .sort((a, b) => {
          return a[this.getLabelKey()] > b[this.getLabelKey()] ? 1 : -1;
        });
      return;
    }

    this.filteredData = this.data;
  }
}
