import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { StateCreator } from 'zustand/vanilla';
import { StateStorage, persist, createJSONStorage } from 'zustand/middleware';

const storage = new MMKV({ id: 'persist' });

const persistStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export function createPersistedStorage<S>(
  name: string,
  initializer: StateCreator<S>
) {
  return create<S>()(
    persist(initializer, {
      name,
      storage: createJSONStorage(() => persistStorage),
    })
  );
}
