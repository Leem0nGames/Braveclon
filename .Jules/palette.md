## 2025-05-14 - [Semantic Battle Interactions]
**Learning:** Web-based RPGs often use `div` elements for game world interactions, which breaks keyboard navigation and screen reader support. Using semantic `button` elements and ARIA labels for unit status (HP/BB) significantly improves accessibility without compromising the visual design.
**Action:** Always prefer semantic buttons for unit interaction slots and include dynamic ARIA labels that reflect the current state (HP, BB readiness).
