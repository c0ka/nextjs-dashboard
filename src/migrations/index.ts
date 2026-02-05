import * as migration_20260204_123231 from "./20260204_123231";
import * as migration_20260205_024046 from "./20260205_024046";
import * as migration_20260205_105000_seed_admin from "./20260205_105000_seed_admin";

export const migrations = [
  {
    up: migration_20260204_123231.up,
    down: migration_20260204_123231.down,
    name: "20260204_123231",
  },
  {
    up: migration_20260205_024046.up,
    down: migration_20260205_024046.down,
    name: "20260205_024046",
  },
  {
    up: migration_20260205_105000_seed_admin.up,
    down: migration_20260205_105000_seed_admin.down,
    name: "20260205_105000_seed_admin",
  },
];
