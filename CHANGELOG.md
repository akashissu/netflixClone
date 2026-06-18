# Changelog

## [PAP-436] - 2026-06-18

### Fixed
- Documented the build-failure remediation that restored missing shared exports required by app routes and UI components.
- Captured the original failing import surface from `@/lib/utils`, including sample data collections and formatting helpers.
- Added release-readiness notes and local run/build instructions for automated PR handoff.

### Impact
- Production builds are documented as unblocked for the shared utility export regression addressed in `feat(pap-436): fix build failures and restore shared data exports`.
