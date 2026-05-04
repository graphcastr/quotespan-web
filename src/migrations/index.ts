import * as migration_20260504_193410_init from './20260504_193410_init';

export const migrations = [
  {
    up: migration_20260504_193410_init.up,
    down: migration_20260504_193410_init.down,
    name: '20260504_193410_init'
  },
];
