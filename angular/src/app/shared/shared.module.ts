import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, ToastModule],
  exports: [CommonModule, RouterModule, ToastModule],
})
export class SharedModule {}
