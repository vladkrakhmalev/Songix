# Code Style

## Function
- Use function declarations instead of arrow functions for React components, in-component helpers, and other pure utilities. Components should be exported as `export function ComponentName(...) {}` unless wrapped by another function like `memo`.
- Prefer handler helpers inside components to be `function handle...` declarations unless they are intentionally wrapped (for example, in `useCallback`).
- Arrow functions stay appropriate for inline anonymous callbacks (for example, the `map`/`filter` helpers or special anonymous functions in tests or functions passed as arguments to other functions, such as the `useEffect` hooks, etc.) when a named declaration would add noise.
- If a function performs only one action, then you should not create an assistant for it, but call it directly (for example, this is acceptable: `onClick={event =>event.stopPropagation()}` this is also acceptable: `onClose={() => setIsOpen(false)}`).
- If 2 or more actions are performed inside the function, then it is worth putting it in a separate handle function (for example, it is unacceptable: `onCancel={() => dispatch(toggleEditMode())}`)