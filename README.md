# RN Design Playground

A browser-based playground for previewing React Native components and prototyping app flows — no device or simulator needed.

![Tabs: Screens | Components | Tokens](https://placehold.co/800x400?text=Playground+Preview)

---

## What is this?

This playground lets you:

- **Browse components** — see every UI component in isolation with all its variants
- **Preview design tokens** — explore your color palette, spacing scale, typography, and more
- **Prototype flows** — build multi-screen app journeys with real navigation, previewed in a phone-sized canvas

Everything runs in your web browser. No iPhone, no Android emulator required.

---

## Prerequisites

You need two tools installed before you start. If you already have them, skip ahead.

### 1. Homebrew (Mac only)
Homebrew is a package manager for macOS. Open **Terminal** and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. This takes a few minutes.

### 2. Node.js
Node.js is the runtime that powers the playground server. Once Homebrew is installed, run:

```bash
brew install node
```

Verify it worked:

```bash
node --version   # should print something like v25.x.x
npm --version    # should print something like 11.x.x
```

---

## Installation

### Step 1 — Clone the repo

```bash
git clone git@github.com:danielkolkman/feat-app-prototype-playground-template.git
cd feat-app-prototype-playground-template
```

> If you don't have SSH set up with GitHub, use the HTTPS URL instead:
> `git clone https://github.com/danielkolkman/feat-app-prototype-playground-template.git`

### Step 2 — Install dependencies

```bash
npm install
```

This downloads all the packages the project needs. It will take a minute or two.

### Step 3 — Start the playground

```bash
npm run web
```

Once you see `Waiting on http://localhost:8081`, open your browser and go to:

```
http://localhost:8081
```

You should see the playground with three tabs: **Screens**, **Components**, and **Tokens**.

---

## Using the Playground

### Components tab
Browse all UI components. Click a component name in the left sidebar to preview it with all its variants.

### Tokens tab
Explore the design tokens behind the components — colors, spacing, typography, border radius, shadows, and more. The source file is shown at the top of the sidebar.

### Screens tab
Preview app flows in a phone-sized canvas (390×844). Use the scale controls (Fit / 25% / 50% / 75% / 100%) in the top-right to zoom in or out.

---

## Customising for a new project

This playground is designed to be forked and reused. Here's what to change:

### 1. Replace the tokens
Edit `src/tokens/index.ts` with your project's design values. This single file controls all colors, spacing, typography, radius, and shadows used across every component.

### 2. Replace the components
Drop your React Native components into `src/components/`. Then create a preview screen for each one in `src/screens/`.

### 3. Register everything
Open `src/playground.config.ts` — this is the **only file you need to edit** to wire up your components and flows:

```ts
// src/playground.config.ts

import { MyButtonScreen } from './screens/MyButtonScreen';
import { FLOWS } from './flows';

export const COMPONENTS = [
  { name: 'Button', component: MyButtonScreen },
  // add more here...
];

export { FLOWS };
```

### 4. Add a flow
Create a folder in `src/flows/` with your screens and a navigator:

```
src/flows/
  MyFlow/
    index.tsx        ← navigator (copy from OnboardingFlow as template)
    ScreenOne.tsx
    ScreenTwo.tsx
```

Then register it in `src/flows/index.ts`:

```ts
import { MyFlow } from './MyFlow';

export const FLOWS = [
  { name: 'My Flow', component: MyFlow },
];
```

---

## Project structure

```
App.tsx                        ← entry point (don't edit)
src/
  playground.config.ts         ← ✏️  edit this to register components & flows
  _shell/                      ← playground framework (don't edit)
    PlaygroundShell.tsx
    TokensViewer.tsx
  tokens/
    index.ts                   ← ✏️  your design tokens
  components/                  ← ✏️  your React Native components
  screens/                     ← ✏️  component preview screens
  flows/                       ← ✏️  app flows for the Screens tab
    index.ts                   ← ✏️  register flows here
    OnboardingFlow/            ← example flow
```

---

## Troubleshooting

**`npm: command not found`**
Node.js isn't installed or isn't on your PATH. Follow the Prerequisites section again and restart Terminal.

**Port 8081 is already in use**
Another process is using that port. Run `npx expo start --web --port 8082` to use a different one.

**Blank screen in the browser**
Wait a few seconds — Metro bundler needs time to compile on first load. If it stays blank, check the Terminal for error messages.

**`node_modules` is missing**
Run `npm install` in the project folder.

---

## Tech stack

| Tool | Purpose |
|---|---|
| React Native | Component primitives (View, Text, etc.) |
| Expo | Web bundling and dev server |
| React Navigation | In-flow screen navigation |
| TypeScript | Type safety |
| Metro | JavaScript bundler |

All components use only React Native core APIs — no third-party UI library. They work on iOS and Android as-is.
