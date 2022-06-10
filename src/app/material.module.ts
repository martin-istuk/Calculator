import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';

const materialArray: Array<any> = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatRippleModule
]

@NgModule({
  imports: materialArray,
  exports: materialArray
})
export class MaterialModule {}
