# Translations

## Structure
- Locales live in `public/translations/{lang}/{ns}.yaml`.
- Settings live in `src/infra/translations`.

## Rules
- Translation keys must match the English value.
- Use the same key and value case (`Sing in: Sing in`)
- Use `kebab-case` only for very large strings.
- Keep YAML flat (no nested objects).
- All lines in the application must be translated
