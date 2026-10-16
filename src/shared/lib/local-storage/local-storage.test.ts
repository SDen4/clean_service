import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setLocalStorage, useLocalStorage } from '.';

/** Минимальный аналог renderHook — без @testing-library. */
function renderHook<T>(hook: () => T) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const result = { current: undefined as unknown as T };

  function Test() {
    result.current = hook();
    return null;
  }

  act(() => {
    root.render(createElement(Test));
  });

  return {
    result,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
}

describe('localStorage store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useLocalStorage', () => {
    it('возвращает сохранённое значение', () => {
      localStorage.setItem('key', 'value');
      const { result, unmount } = renderHook(() => useLocalStorage('key'));
      expect(result.current).toBe('value');
      unmount();
    });

    it('возвращает fallback, если ключа нет', () => {
      const { result, unmount } = renderHook(() =>
        useLocalStorage('key', 'fallback'),
      );
      expect(result.current).toBe('fallback');
      unmount();
    });

    it('по умолчанию fallback = пустая строка', () => {
      const { result, unmount } = renderHook(() => useLocalStorage('key'));
      expect(result.current).toBe('');
      unmount();
    });

    it('обновляется при событии storage из другого таба', () => {
      const { result, unmount } = renderHook(() => useLocalStorage('key'));
      expect(result.current).toBe('');

      act(() => {
        localStorage.setItem('key', 'from-tab');
        window.dispatchEvent(
          new StorageEvent('storage', { key: 'key', newValue: 'from-tab' }),
        );
      });

      expect(result.current).toBe('from-tab');
      unmount();
    });
  });

  describe('setLocalStorage', () => {
    it('пишет значение в localStorage', () => {
      setLocalStorage('key', 'value');
      expect(localStorage.getItem('key')).toBe('value');
    });

    it('уведомляет подписчика в текущем табе', () => {
      const { result, unmount } = renderHook(() => useLocalStorage('key'));
      expect(result.current).toBe('');

      act(() => {
        setLocalStorage('key', 'new-value');
      });

      expect(localStorage.getItem('key')).toBe('new-value');
      expect(result.current).toBe('new-value');
      unmount();
    });

    it('повторный вызов обновляет значение у подписчиков', () => {
      const { result, unmount } = renderHook(() => useLocalStorage('key'));

      act(() => setLocalStorage('key', 'first'));
      expect(result.current).toBe('first');

      act(() => setLocalStorage('key', 'second'));
      expect(result.current).toBe('second');

      unmount();
    });
  });

  describe('жизненный цикл подписки', () => {
    it('подписывается на storage при монтировании и отписывается при размонтировании', () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const removeSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useLocalStorage('key'));

      const storageAdd = addSpy.mock.calls.find(([type]) => type === 'storage');
      expect(storageAdd).toBeDefined();
      expect(typeof storageAdd![1]).toBe('function');

      unmount();

      const storageRemove = removeSpy.mock.calls.find(
        ([type]) => type === 'storage',
      );
      expect(storageRemove).toBeDefined();
      // отписываемся той же функцией, что и подписывались
      expect(storageRemove![1]).toBe(storageAdd![1]);
    });

    it('после размонтирования emit не приводит к ошибкам', () => {
      const { unmount } = renderHook(() => useLocalStorage('key'));
      unmount();

      expect(() => {
        act(() => setLocalStorage('key', 'after-unmount'));
      }).not.toThrow();

      expect(localStorage.getItem('key')).toBe('after-unmount');
    });
  });
});
