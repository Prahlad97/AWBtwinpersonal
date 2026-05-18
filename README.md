# Analytics Lab

Standalone sandbox for **Bidgely Analytics** dashboard UI. Pixel-close to preprod using static fixture data — no Looker, no AWB extension shell.

## Run

```bash
cd analytics-lab
npm install
npm run dev
```

Open **http://localhost:3001** (defaults to `/dashboards/account`).

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

## Architecture

```
src/
  fixtures/          # Static JSON-like exports (KPI + chart data)
  components/
    chrome/          # Header, KPIs, tabs, filters
    charts/          # Donut, Bar, Stacked, Combo
  views/             # Per-tab dashboard layouts
  layouts/           # Analytics shell
  context/           # Filter state (UI wired; data filtering TBD)
  config/tabs.js     # Tab + subtab definitions
```

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
