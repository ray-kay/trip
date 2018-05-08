import { TripModule } from './trip.module';

describe('TripModule', () => {
  let tripModule: TripModule;

  beforeEach(() => {
    tripModule = new TripModule();
  });

  it('should create an instance', () => {
    expect(tripModule).toBeTruthy();
  });
});
