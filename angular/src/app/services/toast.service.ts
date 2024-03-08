import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(
    severity: string,
    summary: string,
    message: string,
    key: string,
    life: number,
  ) {
    this.messageService.add({ key, severity, summary, detail: message, life });
  }
}
