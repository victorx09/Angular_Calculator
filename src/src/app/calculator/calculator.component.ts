
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  symbols = ['C', 'del', '!', '/', '*', '-', '+', '=', 'P', '.'];

  setList = [
    [this.symbols[0], this.symbols[1], this.symbols[2], this.symbols[3]],
    [7, 8, 9, this.symbols[4]],
    [6, 5, 4, this.symbols[5]],
    [1, 2, 3, this.symbols[6]],
    [this.symbols[8], 0, this.symbols[9], this.symbols[7]],
  ];

  inp: any = '';
  res: any = '';

  delete() {
    const vals = this.inp.value.split('');
    vals.splice(-1, 1);
    this.inp.value = vals.length > 0 ? vals.join('') : null;
    this.inp.value ? null : this.reset();
  }

  reset() {
    this.inp.value = null;
    this.res.value = null;
  }

  setAnsToDisplay(ans: any) {
    this.inp.value = ans;
  }

  extrude(item: any) {
    const copy = this.inp.value.split('');
    copy.splice(-1, 1);
    this.inp.value = copy.join('') + item;
  }

  isPrime(num: any) {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  }
  factorial(num: any) {
    let pro = 1;
    for (let i = num; i > 0; i--) {
      pro *= i;
    }

    return pro;
  }
  getLength() {
    return this.inp.value.split(/([-+*\/])/g).length;
  }

  evaluate() {
    var ans = eval(this.inp.value);
    var prevValue = this.inp.value;
    this.reset();
    this.res.value = prevValue;
    this.setAnsToDisplay(ans);
  }

  getPrime() {
    if (this.getLength() === 1) {
      const ans = this.isPrime(this.inp.value);
      var prevValue = this.inp.value;
      this.reset();
      this.res.value = prevValue;
      this.setAnsToDisplay(ans ? 'prime' : 'not prime');
      setTimeout(() => {
        this.reset();
      }, 1000);
    }
  }
  checkExtrude(item: any) {
    this.symbols.includes(this.inp.value.at(-1)) && this.symbols.includes(item)
      ? this.extrude(item)
      : (this.inp.value += item);
  }

  getFactorial() {
    if (this.getLength() === 1) {
      const ans = this.factorial(Number(this.inp.value));
      var prevValue = this.inp.value;
      this.reset();
      this.res.value = prevValue;
      this.setAnsToDisplay(ans);
    }
  }

  getValue(item: any) {
    this.inp = <HTMLInputElement>document.querySelector('.inp-field');
    this.res = <HTMLInputElement>document.querySelector('.res-field');

    switch (item) {
      case 'C':
        this.reset();
        break;
      case 'del':
        this.delete();
        break;
      case '=':
        this.evaluate();
        break;
      case 'P':
        this.res.value = this.inp.value;
        this.getPrime();
        break;
      case '!':
        this.res.value = this.inp.value;
        this.getFactorial();
        break;
      default:
        this.checkExtrude(item);
        break;
    }
  }
}
