# Crystal & Stone Virtual Store

This is a minimal, activatable interface to display a virtual store for stones and crystals.

- Press `S` to open/close the store overlay, or click the "Open Store" button.
- Add items to the cart, adjust quantities, and view totals.

## Run locally

No build step is required. Serve the folder and open it in a browser.

Using Python:

```bash
python3 -m http.server 5173 -d /workspace
```

Then open `http://localhost:5173/` in your browser.

Alternatively, open `index.html` directly in a browser.

## Files

- `index.html`: Markup and store overlay container
- `styles.css`: Styling for overlay, grid, and cart
- `app.js`: Store logic, filtering, cart, and activation
