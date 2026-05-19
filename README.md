# Analytics Lab

Standalone sandbox for **Bidgely Analytics** dashboard UI. Pixel-close to preprod using static fixture data — no Looker, no AWB extension shell.

## Run

```bash
cd analytics-lab
npm install
cp .env.example .env   # add your Mapbox public token
npm run dev
```

Open **http://localhost:3001** (defaults to `/dashboards/account`).

### Mapbox (Location tab)

Set `VITE_MAPBOX_ACCESS_TOKEN` in `.env` (public `pk.` token). Restart Vite after changing env vars. The Location tab opens in **map view** with zip-level fixture polygons for Home, EV Maps, Income, and Grid Map subtabs.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Bundler | Vite 5 | Fast local dev |
| UI | React 18 | Modern; promote to main as React 17 components |
| Components | MUI 5 | Close to production styling |
| Charts | Highcharts | Same as AWB frontend |
| Router | React Router 6 | URL tabs like `/dashboards/:tab/:subtab?` |

## Routes (mirror main app)

| Tab | URL |
|-----|-----|
| Location | `/dashboards/location` |
| Account | `/dashboards/account` |
| Lifestyle Profile | `/dashboards/account/lifestyle-profile` |
| Premise | `/dashboards/premise` |
| Appliance Targeting | `/dashboards/appliance-targeting` |
| Load Research | `/dashboards/load-research` |
| Consumption Bucket | `/dashboards/load-research/consumption-bucket` |
| EV Analytics | `/dashboards/ev-analytics` |
| Grid Asset | `/dashboards/grid-assets` |
| Custom | `/dashboards/custom` |
| Demand curve comparison (list) | `/comparisons` |
| Demand curve comparison (detail) | `/comparisons/:dccId` |

Open DCC from the analytics **features (hamburger) menu** → “Demand curve comparison”, or go directly to `/comparisons`. Comparisons persist in `sessionStorage` (`analytics-lab-dcc-domains-v2`) for the browser session (fixture seed on first load).

## Architecture

```
src/
  chrome/awb/dcc/       # Vendored production DCC UI (@dcc) — pixel parity with preprod
  lab-host/             # @ alias: context mocks, Looker stubs, labDccStore adapter
  dcc/DccLabProviders.jsx
  fixtures/             # Dashboard chart/KPI fixtures
  components/chrome/    # Lab shell (header, tabs, filters)
  views/                # Per-tab dashboard layouts
  layouts/
  context/              # Filter state (UI wired; data filtering TBD)
```

**DCC data boundary:** UI hooks call `comparison-service` → `demand-curve-api.js` → `lab-host/adapters/labDccStore.js` (domain-shaped fixtures, no AWB API). Compare uses pre-seeded hourly series in the store unless Looker is wired later.

Vite aliases: `@` → `lab-host`, `@dcc` → `chrome/awb/dcc`, `@/assets` → `src/assets` (order matters).

## Filters

Filter bar updates React context (`fuelType`, `dateRangeLabel`, chips). Chart data is not filtered yet — hook fixtures through context when ready.

## Promoting to main AWB frontend

1. Copy `src/components/charts/*` and relevant `src/views/*` into the main app.
2. Adapt imports: MUI 5 → match main (may use `@material-ui/core` v4 in places).
3. Replace fixture imports with Looker query adapters behind the same props shape.
4. React Router 6 routes → v5 `Route`/`Switch` if needed.

Keep Lab separate indefinitely; do not merge until a screen is signed off.

## Reference

Fixture values were ported from `AWB-frontend-AWB-FE-PREPROD/src/components/local-dev-dashboard-fixtures.js`.
