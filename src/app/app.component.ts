import { Component } from '@angular/core';

import * as ts from "typescript";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Calculator';

  power: boolean = false;

  memory: string = "";
  lastResult: string = "";
  newExpr: string = "_";
  operatorCount: number = 0;
  operators: Array<string> = [ "+", "-", "*", "/"];

  turnOn() {
    this.power = true;
    this.lastResult = "";
    this.newExpr = "_";
    this.operatorCount = 0;
  }

  turnOff() {
    this.power = false;
    this.memory = "";
    this.lastResult = "";
    this.newExpr = "_";
    this.operatorCount = 0;
  }

  insertChar(char: string) {
    if ( this.operators.includes(char) ) {
      this.operatorCount++;
    }
    this.newExpr = this.newExpr.slice(0, -1);
    this.newExpr += char;
    this.newExpr += "_";
  }

  countOperators() {
    this.operatorCount = 0;
    for(let i=0; i<this.newExpr.length; i++) {
      if (
        this.newExpr[i] == "+" ||
        this.newExpr[i] == "-" ||
        this.newExpr[i] == "*" ||
        this.newExpr[i] == "/"
      ) { this.operatorCount++ }
    }
  }

  solveExpr() {
    this.countOperators();
    if ( this.operatorCount > 1 ) {
      if (
        this.operatorCount == 2 &&
        this.newExpr.includes("--")
      ) {
        this.newExpr = this.newExpr.replace("--", "+");
        this.lastResult = eval( this.newExpr.slice(0, -1) );
        this.newExpr = "_";
      } else {
        this.lastResult = "Error!";
        this.newExpr = "Multiple operators!";
      }
    } else {
      if (
        this.operators.includes(
          this.newExpr.slice(0 , 1)
        )
      ) {
        this.lastResult = "Error!";
        this.newExpr = "Opening operator!";
      } else {
        if (
          this.operators.includes(
            this.newExpr.slice(
              +this.newExpr.length-2,
              +this.newExpr.length-1
            )
          )
        ) {
          this.lastResult = "Error!";
          this.newExpr = "Closing operator!";
        } else {
          this.lastResult = eval( this.newExpr.slice(0, -1) );
          this.newExpr = "_";
        }
      }
    }
    this.operatorCount = 0;
  }

  solveSqrt() {
    if ( this.operatorCount == 0 ) {
      this.lastResult = "" + Math.sqrt(eval( this.newExpr.slice(0, -1) ) );
      this.newExpr = "_";
    } else {
      this.lastResult = "Error!";
      this.newExpr = "Contains operator!";
    }
    this.operatorCount = 0;
  }

  solveSignChange() {
    if ( this.operatorCount == 0 ) {
      this.lastResult = "-" + this.newExpr.slice(0, -1);
      this.newExpr = "_";
    } else {
      this.lastResult = "Error!";
      this.newExpr = "Contains operator!";
    }
    this.operatorCount = 0;
  }

  addToMemory() {
    if ( this.lastResult != "Error!" ) {
      if ( this.memory == "" ) {
        this.memory = "M=" + eval( this.lastResult );
      } else {
        let memValue: number = Number(
          this.memory.slice(2, this.memory.length)
        );
        let resValue: number = Number(
          this.lastResult
        );
        this.memory = "M=" + (memValue + resValue);
      }
    }
  }

  deductFromMemory() {
    if ( this.lastResult != "Error!" ) {
      if ( this.memory == "" ) {
        this.memory = "M=" + eval( this.lastResult );
      } else {
        let memValue: number = Number(
          this.memory.slice(2, this.memory.length)
        );
        let resValue: number = Number(
          this.lastResult
        );
        this.memory = "M=" + (memValue - resValue);
      }
    }
  }

  clearMemory() {
    this.memory = "";
  }

  addMemoryToExpr() {
    if ( this.memory == "" ) {
      return;
    } else {
      let memValue: number = Number(
        this.memory.slice(2, this.memory.length)
      );
      this.newExpr = this.newExpr.slice(0, -1);
      this.newExpr += memValue;
      this.newExpr += "_";
    }
  }

}
