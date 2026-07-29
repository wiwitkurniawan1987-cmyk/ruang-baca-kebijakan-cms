import * as migration_20260729_175510_initial from './20260729_175510_initial';
import * as migration_20260729_203000_add_main_agenda from './20260729_203000_add_main_agenda';

export const migrations = [
  {
    up: migration_20260729_175510_initial.up,
    down: migration_20260729_175510_initial.down,
    name: '20260729_175510_initial'
  },
  {
    up: migration_20260729_203000_add_main_agenda.up,
    down: migration_20260729_203000_add_main_agenda.down,
    name: '20260729_203000_add_main_agenda'
  },
];
