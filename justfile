_default:
  @just --choose

# sync all data from production cosmic project to dev
reset-project:
  @node scripts/reset-dev-project.mjs
