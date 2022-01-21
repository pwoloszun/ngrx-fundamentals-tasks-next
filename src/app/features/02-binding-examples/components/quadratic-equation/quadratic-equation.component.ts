import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-quadratic-equation',
  templateUrl: './quadratic-equation.component.html',
  styleUrls: ['./quadratic-equation.component.css']
})
export class QuadraticEquationComponent implements OnInit {

  a = 2;
  b = 8;
  c = -10;

  get delta(): number {
    const { a, b, c } = this;
    return (b * b) - (4 * a * c);
  }

  get x1(): number {
    const { b, deltaSqrt, doubleA } = this;
    return (b - deltaSqrt) / doubleA;
  }

  get x2(): number {
    const { b, deltaSqrt, doubleA } = this;
    return (-b - deltaSqrt) / doubleA;
  }

  private get deltaSqrt(): number {
    return Math.sqrt(this.delta);
  }

  private get doubleA(): number {
    return 2 * this.a;

  }

  ngOnInit() {
  }

}
