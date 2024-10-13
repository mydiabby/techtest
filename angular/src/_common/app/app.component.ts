import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {idGeneratorProvider} from "../crypto/id-generator.provider";
import {userStorageProvider} from "../storage/user-storage.provider";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [idGeneratorProvider, userStorageProvider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-app';
}
