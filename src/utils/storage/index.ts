import { Account } from "~/types";
import persistance from "./persistance";

type Storage<T> = {
  read: () => T | null;
  write: (t: T) => void;
  clear: () => void;
};

type AppStorage = {
  access_token: Storage<string>;
  profile: Storage<Account>;
};

const keys = {
  access_token: "access_token",
  profile: "profile",
};

const storage: AppStorage = {
  access_token: {
    read: () => persistance.get(keys.access_token),
    write: (value: string) => persistance.set(keys.access_token, value),
    clear: () => persistance.clear(keys.access_token),
  },
  profile: {
    read: () => {
      const profile_storage = persistance.get(keys.profile);
      if (profile_storage) {
        var profile = JSON.parse(profile_storage) as Account;
        return profile;
      }

      return null;
    },
    write: (value: Account) =>
      persistance.set(keys.profile, JSON.stringify(value)),
    clear: () => persistance.clear(keys.profile),
  },
};

export default storage;
