# State

## Selectors
- The file with segment selectors is called `{segmentName}.selectors.ts` and is located next to the slice.
- We do not use `useAppSelector` in selector files; selectors work with `rootState'.
- We always use the `createSelector` and build selectors from the base segment selector.
- We are reusing already declared higher-level selectors instead of direct access to fields.