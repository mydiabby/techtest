import { TestBed } from '@angular/core/testing';

import { environment } from '../environments/environment';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the config', () => {
    expect(service.getConfig()).toEqual(environment);
  })
});
