# High Cost Area Purchase Program — Property Templates

Two reusable templates for marketing a specific listing under the High Cost Area Purchase Program. Both are driven by an identical `CONFIG` block, so you fill in the same fields once for each.

## Files

- **`high-cost-flyer-template.html`** — print/PDF flyer (US Letter). Matches the TMO-style layout but in your RealStack branding. Open it, click **Print / Save as PDF**.
- **`high-cost-property-page-template.html`** — shareable web page for the same property. Send the link or host it. Has live Apply / Schedule buttons.

## How to update (per property)

1. Duplicate the file you want, e.g. `high-cost-flyer-123-main-st.html`.
2. Scroll to the bottom and edit the `CONFIG = { ... }` block. Fields:
   - `creditAmount` — headline agency-credit figure (e.g. `"$24,619"`)
   - `photoUrl` — property photo URL (leave `""` for a placeholder box)
   - `address`, `cityStateZip`, `listPrice`
   - `monthlyIncomeLimit` — the 120% AMI income cap for this tract
   - `loName`, `loTitle`, `loPhone`, `loEmail`, `loNMLS`, `headshotUrl`
   - `disclaimer` — fine print; update the example assumptions to match the rate lock
   - (web page only) `applyUrl`, `calendarUrl`
3. For the **web page**, also edit the `<title>` and the two `<meta>` tags near the top for clean link previews.
4. Save and open in a browser. The page fills in automatically.

## Your headshot

Both templates and the website expect your photo at the **project root** as `headshot.jpg`:

```
New Chris Granger LO Website/headshot.jpg
```

Save it there once and everything picks it up automatically — the flyer, the property page (`../headshot.jpg`), the homepage About section and the program page (`/headshot.jpg`). To use a different photo for a single flyer, set `headshotUrl` in that file's CONFIG to any URL.

## Notes

- Credit amounts vary by census tract, loan amount, LTV, and credit profile — always confirm the real figure before publishing.
- The program info page lives at `/learn/high-cost-area-purchase-program.html` on the site.
