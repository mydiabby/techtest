import {Injectable} from "@angular/core";
import {Observable} from "rxjs";


@Injectable()
export class UsersFacade {

  constructor() {
  }


    /*To replace with :

    this.movementsService.getMovementsValidation(json)
      .subscribe({
        next: (m) => this.movementsStore.setMovementsValidationData(m),
        error: (e: { error: ValidationResponseDTO } | any) => {
          if (e.status === 400) {
            this.movementsStore.setJsonFormatError(true);
          } else {
            this.movementsStore.setMovementsValidationData(e.error)
          }
        }
      })*/
  }

