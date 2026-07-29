import * as migration_20260729_175510_initial from './20260729_175510_initial';

export const migrations = [
  {
    up: migration_20260729_175510_initial.up,
    down: migration_20260729_175510_initial.down,
    name: '20260729_175510_initial'
  },
];
