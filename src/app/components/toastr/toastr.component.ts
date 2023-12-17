/* eslint-disable @angular-eslint/component-selector */
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';

@Component({
  selector: '[app-toastr]',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0,
        })
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0)',
              opacity: 0,
            }),
            style({
              transform: 'none',
              opacity: 1,
            }),
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(100%, 0, 0)',
              opacity: 0,
            }),
          ])
        )
      ),
    ]),
  ],
})
export class ToastrComponent extends Toast {}
