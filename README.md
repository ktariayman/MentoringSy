# 🚀 Contributing Guide

This doc captures the key expectations we’ve learned from real code reviews —  
so we stay consistent, avoid repeating mistakes, and make future onboarding easier.  
(New hires can also look here to understand our typical code review notes.)

## 📝 Notes

```markdown
1. Use `AxiosService` in node_app and `apiRequest` in React to keep headers, user_id, and error handling consistent.
2. Always add `authMiddleware` + `permissionsMiddleware` on secure routes.
3. Keep preprocess logic (like `transformVolume`, `preprocessPosition`) in shared methods for the entity.
4. Validate required fields on the UI — block requests to the backend until everything is valid.
5. Use enums for dropdowns/multiSelects if that’s specified by the `c2c-engine` for that field.
6. If the same logic repeats across UI components, consider extracting it into a custom hook for reuse.
7. Always show toasts on create/update/delete so users know what happened.
8. Sync Zustand stores after POST/PUT/DELETE to keep the UI aligned with backend data.
9. Double-check dark mode when adding new views/components.
10. Avoid TypeScript `any` / `unknown` unless truly needed; use specific types wherever possible.
```
