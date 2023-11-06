import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { StringUtils } from 'src/app/utils/string.utils';

@Component({
  selector: 'app-combobox-with-badges',
  templateUrl: './combobox-with-badges.component.html',
  styleUrls: ['./combobox-with-badges.component.css'],
})
export class ComboboxWithBadgesComponent<TData> {
  private _data!: TData[];

  // Liste of generic data
  @Input({ required: true }) set data(value: TData[]) {
    if (value) {
      this._data = Object.create(value);
      this.filteredData = this._data;

      this.inputValue?.patchValue('');
    }
  }

  get data() {
    return this._data;
  }

  // Key of generic data
  @Input({ required: true }) key?: string;

  // Value of generic data
  @Input({ required: true }) value?: string;

  // Output event when a generic data is selected
  @Output() newItemsSelected = new EventEmitter<TData[]>();

  //Key of image url
  @Input() imageKey?: string;

  // Image url
  @Input() imageUrl?: string;

  // Image extension
  @Input() imageExtension?: string | null;

  @Input({ required: true }) label!: string;

  inputValue: FormControl = new FormControl('');
  selectedBadges: TData[] = [];
  filteredData!: TData[];
  showList = false;

  // Listen change on input field
  inputValueSignal$: Signal<string>;

  constructor() {
    this.inputValueSignal$ = toSignal(this.inputValue.valueChanges);
    effect(() => {
      const value = this.inputValueSignal$();
      if (value != undefined) {
        this.filterData(value);
      }
    });
  }

  getKey() {
    return this.key as keyof TData;
  }

  getValue() {
    return this.value as keyof TData;
  }

  getImageKey() {
    return this.imageKey as keyof TData;
  }

  /**
   * Add a generic data to badge list and notify parent component
   * @param value Generic data that selected
   */
  select(value: TData) {
    if (this.selectedBadges.includes(value)) {
      return;
    }
    this.selectedBadges.push(value);
    this.orderBadges();
    this.inputValue.patchValue('');
    this.newItemsSelected.emit(this.selectedBadges);
  }

  /**
   * Remove a generic data from badge list and notify parent component
   * @param value Generic data that deleted
   */
  delete(value: TData) {
    const index = this.selectedBadges.indexOf(value);
    if (index > -1) {
      this.selectedBadges.splice(index, 1);
    }
    this.orderBadges();
    this.inputValue.patchValue('');
    this.newItemsSelected.emit(this.selectedBadges);
  }

  /**
   * Order badges list by value
   */
  orderBadges() {
    this.selectedBadges.sort((a, b) => {
      return StringUtils.ignoreCaseAndDiacritic(a[this.getValue()] as string) >
        StringUtils.ignoreCaseAndDiacritic(b[this.getValue()] as string)
        ? 1
        : -1;
    });
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
   * Filter generic data with comparaison between value a
   * @param value string to compare with value of generic data to filter array
   * @returns void
   */
  filterData(value: string) {
    if (value && value.length > 0) {
      this.filteredData = this.data?.filter(item =>
        StringUtils.ignoreCaseAndDiacritic(
          item[this.getValue()] as string
        ).includes(StringUtils.ignoreCaseAndDiacritic(value))
      );
      return;
    }

    this.filteredData = this.data;
  }
}
