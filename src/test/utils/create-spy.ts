export function createEventEmitterSpy() {
  const eventEmitter: any = { emit: () => { } };
  jest.spyOn(eventEmitter, 'emit');
  return eventEmitter;
}
