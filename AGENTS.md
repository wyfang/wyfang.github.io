# Repository instructions

## Dynamic avatar package updates

The homepage avatar is built from a generated package whose stable source structure is:

- `avatar.js`: the reusable procedural SVG animation module.
- `index.html`: a standalone playground/demo that must not be copied into the website.

When the user supplies a newer version of this package:

1. Replace `scripts/avatar.js` with the package's new `avatar.js` as a whole. Treat that file as generated/vendor code and do not hand-edit it for website behavior.
2. Preserve `scripts/avatar-random.js`. It owns all website-specific behavior: random animation selection, no immediate repeats, 8–14 second switching, background-tab pause/resume, reduced-motion fallback, accessibility text, and transparent eye cutouts.
3. Preserve the progressive fallback inside `#animated-avatar` in `index.html`. `img/face.svg` must remain available when modules fail, JavaScript is disabled, or reduced motion is requested.
4. Preserve the `.wifi-avatar-*` rules in `index.css`, including the 88 px size, pointer, hover treatment, theme inversion, and reduced-motion behavior.
5. The eye regions must be true transparent holes in the animated head, not separately colored paths. The integration creates an SVG luminance mask and moves the package's two live eye paths into it so blinking and expression changes continue to update the cutout.
6. After replacing the package, verify that it still exports `availableAnimations` and `createAvatar`, and that the generated SVG retains this structure: top-level `defs`, a motion `g`, a head `path`, and an adjacent eye `g` containing exactly two eye `path` elements. If the structure changes, adapt `cutOutAvatarEyes()` rather than patching generated `avatar.js`.
7. Test through a local HTTP server, not by opening `index.html` with `file://`, because browser ES modules require an HTTP origin. Verify random switching, transparent eyes, dark/light themes, hover behavior, background pause/resume, and the reduced-motion static fallback.
8. Keep avatar changes local unless the user explicitly requests a commit, GitHub push, or production deployment.
