# Design QA — Singapore popout call button

## Reference

- Source: Uiverse `itchy-wolverine-84` component supplied by the user.
- Compared state: hovered button with two revealed drawers and expanded corner arcs.
- Reference capture: `work/uiverse-reference-hover.png`.

## Implementation

- Surface: desktop primary navigation at 1440px and 1081px.
- Implementation capture: `work/sg-call-hover-v2.png`.
- Narrow desktop capture: `work/sg-call-hover-1081.png`.

## Findings

- P0: none.
- P1: none.
- P2: none. The initial upward reveal clipped against the viewport; both drawers were repositioned below the button and rechecked.
- P3: the corner expansion is intentionally subtler than the reference to suit the compact navigation bar.

## Interaction and accessibility

- Hover reveals `Start your` and `SG journey` without layout shift.
- Keyboard focus reveals the same state and retains a visible focus ring.
- The link navigates to `/contact`.
- At 1081px there is no horizontal overflow.
- The animated desktop treatment is hidden with the existing mobile navigation.
- Reduced-motion users receive a stable, non-popout state.

final result: passed
