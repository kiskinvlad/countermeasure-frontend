import { ValidatorModule } from './validator.module';

describe('ValidatorModule', () => {
  let validatorModule: ValidatorModule;

  beforeEach(() => {
    validatorModule = new ValidatorModule();
  });

  it('should create an instance', () => {
    expect(validatorModule).toBeTruthy();
  });
});
