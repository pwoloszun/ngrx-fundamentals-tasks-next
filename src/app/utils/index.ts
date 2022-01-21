import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';

const successColor = '#007700';
const errorColor = '#FF3300';
const completeColor = successColor;

export function fullObserver(tag: string): Observer<any> {
  return {
    next(value: any) {
      const message = tag.length < 5 ? `[${tag}]:\t\t` : `[${tag}]:\t`;
      console.log(`%c${message}`, `color: ${successColor}; font-weight: bold;`, value);
    },
    error(error: Error) {
      const message = tag.length < 5 ? `[${tag}]:\t\t ERROR` : `[${tag}]:\t ERROR`;
      console.log(`%c${message}`, `color: ${errorColor}; font-weight: bold;`, error.stack || error);
    },
    complete() {
      const message = tag.length < 5 ? `[${tag}]:\t\t COMPLETE` : `[${tag}]:\t COMPLETE`;
      console.log(`%c${message}`, `color: #ffffff; background-color: ${completeColor}`);
    }
  };
}

export function random(max: number, roundDown = false): number {
  const result = Math.random() * max;
  if (roundDown) {
    return Math.floor(result);
  } else {
    return result;
  }
}

export function randomBetween(min: number, max: number, roundDown = false): number {
  return min + random(max - min, roundDown);
}

export function deriveNextID(): number {
  return Math.random();
}

export function getParamFromParentRoute(paramName: string, activatedRoute: ActivatedRoute): string {
  const parentRoute = activatedRoute.parent;
  if (parentRoute === null) {
    throw new Error(`Undefined parent route`);
  };
  const paramValue = parentRoute.snapshot.paramMap.get(paramName);
  if (paramValue === null) {
    throw new Error(`Missing '${paramName}' param`);
  };
  return paramValue;
}

export function getFormArray(ctrlName: string, formGroup: FormGroup): FormArray {
  const arrayCtrl = formGroup.get('ctrlName') as FormArray | null;
  if (arrayCtrl === null) {
    throw new Error(`Undefined '${ctrlName}' ctrl`);
  }
  return arrayCtrl;
}

export function getArraysOfFormControls(ctrlName: string, formGroup: FormGroup): FormControl[] {
  const arrayCtrl = getFormArray(ctrlName, formGroup);
  return arrayCtrl.controls as FormControl[];
}
