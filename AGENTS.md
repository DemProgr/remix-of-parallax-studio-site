# Architecture

- Keep the SHARK landing page on the root route with section-anchor navigation; the site is a single landing experience.
- Keep workout recommendation logic in a standalone module with concrete tests so the questionnaire is independently verifiable.
- Send contact actions to the club's Instagram rather than pretending to submit a lead without a connected service.
- Scope landing-page scroll motion to a dedicated hook using IntersectionObserver and requestAnimationFrame; respect reduced-motion preferences and clean up all listeners.