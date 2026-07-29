import * as migration_20260729_175510_initial from './20260729_175510_initial';
import * as migration_20260729_203000_add_main_agenda from './20260729_203000_add_main_agenda';
import * as migration_20260729_210000_integrate_core_navigation from './20260729_210000_integrate_core_navigation';
import * as migration_20260729_212000_normalize_navigation_parents from './20260729_212000_normalize_navigation_parents';

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
  {
    up: migration_20260729_210000_integrate_core_navigation.up,
    down: migration_20260729_210000_integrate_core_navigation.down,
    name: '20260729_210000_integrate_core_navigation'
  },
  {
    up: migration_20260729_212000_normalize_navigation_parents.up,
    down: migration_20260729_212000_normalize_navigation_parents.down,
    name: '20260729_212000_normalize_navigation_parents'
  },
];
