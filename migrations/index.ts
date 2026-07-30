import * as migration_20260729_175510_initial from './20260729_175510_initial';
import * as migration_20260729_203000_add_main_agenda from './20260729_203000_add_main_agenda';
import * as migration_20260729_210000_integrate_core_navigation from './20260729_210000_integrate_core_navigation';
import * as migration_20260729_212000_normalize_navigation_parents from './20260729_212000_normalize_navigation_parents';
import * as migration_20260730_010000_reset_admin_password from './20260730_010000_reset_admin_password';
import * as migration_20260730_030000_total_cms_sync from './20260730_030000_total_cms_sync';
import * as migration_20260730_040000_backfill_post_versions from './20260730_040000_backfill_post_versions';

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
  {
    up: migration_20260730_010000_reset_admin_password.up,
    down: migration_20260730_010000_reset_admin_password.down,
    name: '20260730_010000_reset_admin_password'
  },
  {
    up: migration_20260730_030000_total_cms_sync.up,
    down: migration_20260730_030000_total_cms_sync.down,
    name: '20260730_030000_total_cms_sync'
  },
  {
    up: migration_20260730_040000_backfill_post_versions.up,
    down: migration_20260730_040000_backfill_post_versions.down,
    name: '20260730_040000_backfill_post_versions'
  },
];
