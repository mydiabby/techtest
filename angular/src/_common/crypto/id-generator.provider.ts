import {v4} from 'uuid';

export const ID_GENERATOR_TOKEN = 'ID_GENERATOR'

export const idGeneratorProvider = {
  provide: ID_GENERATOR_TOKEN,
  useValue: () => v4(),
}
