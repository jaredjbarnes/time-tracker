import { ObservableValue } from '@neo/commons/utils/hex/observable_value';

describe('Observable Value', () => {
  test('Default', () => {
    const o = new ObservableValue(1);
    let nextValue = 0;

    o.onChange(value => {
      nextValue = value;
    });

    o.setValue(1);
    expect(nextValue).toBe(1);
  });

  test('Error', () => {
    const o = new ObservableValue(1);
    const error = new Error();
    let nextError: Error | null = null;

    o.onError(value => {
      nextError = value;
    });

    o.setError(error);
    expect(nextError).toBe(error);
  });

  test('Dispose', () => {
    const o = new ObservableValue(0);
    expect(o.getValue()).toBe(0);
    o.dispose();
  });

  test('getObserver', () => {
    const o = new ObservableValue(0);
    const observer = o.getObserver();

    observer.next(1);
    expect(o.getValue()).toBe(1);
    observer.error(new Error('BAD'));
    expect(o.getError().message).toBe('BAD');
  });

  test('using transformValue will setValue to be what is returned from callback', () => {
    const o = new ObservableValue('hello');

    o.transformValue(o => {
      return o + ' world';
    });

    expect(o.getValue()).toBe('hello world');
  });
});
