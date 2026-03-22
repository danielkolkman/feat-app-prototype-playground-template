# React Native Design System Prototype

Built from Figma Design System tokens — node `9762-187`.

## 📁 Project Structure

```
rn-prototype/
├── App.tsx                        # Entry point
└── src/
    ├── tokens/
    │   └── index.ts               # ← All design tokens live here
    ├── components/
    │   ├── Button.tsx             # Button (5 variants × 3 sizes)
    │   ├── Typography.tsx         # Typography (16 variants)
    │   └── index.tsx              # Card, Badge, InputField, Avatar, Divider
    └── screens/
        └── HomeScreen.tsx         # Prototype showcase screen
```

## 🚀 Quick Start

```bash
# With Expo
npx create-expo-app@latest my-app --template blank-typescript
# Copy src/ and App.tsx into your project
npx expo start
```

## 🎨 Updating Tokens from Figma

All tokens are in `src/tokens/index.ts`. To sync with your Figma variables:

1. Open the Figma file: https://www.figma.com/design/NLYw92wgS9n4UlniqDC44A/Design-System
2. Go to **Edit → Variables** (or the Variables panel)
3. Map each Figma variable to the corresponding constant in `tokens/index.ts`

Key sections to update:
- `Palette.*` — color primitives
- `Colors.*` — semantic color aliases
- `FontSize.*` — type scale
- `Spacing.*` — spacing scale
- `Radius.*` — border radii
- `Shadow.*` — elevation / shadow tokens

## 🌿 Creating a Figma Branch

1. Open the file: https://www.figma.com/design/NLYw92wgS9n4UlniqDC44A/Design-System
2. Click the **▼ arrow** next to the file name at the top
3. Select **"Create branch…"**
4. Name the branch: `prototype/react-native-test`
5. Click **Create branch**

The branch will be a full copy of the main file. Work on your prototype frames there
without affecting the main design system.

## 🧩 Components

| Component    | Variants / Props                              |
|-------------|-----------------------------------------------|
| `Button`    | primary, secondary, ghost, outline, destructive × sm/md/lg |
| `Typography`| 16 variants: display, heading, body, label, caption, overline, code |
| `Card`      | default, outlined, elevated, filled           |
| `Badge`     | default, success, warning, error, info        |
| `InputField`| label, hint, error, left/right elements       |
| `Avatar`    | xs/sm/md/lg/xl, initials or image src         |
| `Divider`   | horizontal, vertical, with optional label     |

## 📦 Dependencies

All components use only React Native core APIs — no third-party UI library needed.

Optional for icons: `@expo/vector-icons` or `lucide-react-native`
