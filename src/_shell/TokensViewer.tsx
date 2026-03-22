import React, { createContext, useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Palette, Colors, FontSize, FontWeight, FontFamily,
  LineHeight, LetterSpacing, Spacing, Radius, Shadow,
  Duration, IconSize, ZIndex,
} from '../tokens/index';

// ─── Theme context (avoids prop-drilling into every row) ──────────────────────

type ThemeTokens = {
  sidebar: string; border: string; textPrimary: string; textSecondary: string;
  navActive: string; surface: string; bg: string;
};

const ThemeCtx = createContext<ThemeTokens | null>(null);
const useTheme = () => useContext(ThemeCtx)!;

// ─── Category definitions ─────────────────────────────────────────────────────

const CATEGORIES = [
  'Colors', 'Palette', 'Spacing', 'Typography', 'Radius', 'Shadows', 'Z-Index', 'Duration',
] as const;

type Category = typeof CATEGORIES[number];

// ─── Row primitives ───────────────────────────────────────────────────────────

const Row = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => {
  const t = useTheme();
  return (
    <View style={[s.row, { borderBottomColor: t.border }]}>
      <View style={s.rowLeft}>{left}</View>
      <View style={s.rowRight}>{right}</View>
    </View>
  );
};

const Label = ({ name, sub }: { name: string; sub?: string }) => {
  const t = useTheme();
  return (
    <View>
      <Text style={[s.tokenName, { color: t.textPrimary }]}>{name}</Text>
      {sub ? <Text style={[s.tokenSub, { color: t.textSecondary }]}>{sub}</Text> : null}
    </View>
  );
};

const Value = ({ text }: { text: string }) => {
  const t = useTheme();
  return <Text style={[s.tokenValue, { color: t.textSecondary }]}>{text}</Text>;
};

const Divider = ({ label }: { label: string }) => (
  <Text style={s.groupLabel}>{label}</Text>
);

// ─── Color swatch ─────────────────────────────────────────────────────────────

const Swatch = ({ color, name, value }: { color: string; name: string; value: string }) => {
  const isLight = isLightColor(color);
  return (
    <View style={s.swatchRow}>
      <View style={[s.swatchBox, { backgroundColor: color }]}>
        <Text style={[s.swatchLabel, { color: isLight ? '#334155' : '#F8FAFC' }]}>{name}</Text>
        <Text style={[s.swatchValue, { color: isLight ? '#64748B' : '#CBD5E1' }]}>{value}</Text>
      </View>
    </View>
  );
};

function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ─── Spacing bar ──────────────────────────────────────────────────────────────

const SpacingBar = ({ name, value }: { name: string; value: number }) => (
  <Row
    left={<Label name={`Spacing[${name}]`} sub={`${value}px`} />}
    right={
      <View style={{ justifyContent: 'center' }}>
        <View style={{ width: Math.min(value, 200), height: 16, backgroundColor: '#6366F1', borderRadius: 3 }} />
      </View>
    }
  />
);

// ─── Category renderers ───────────────────────────────────────────────────────

const ColorsView = () => {
  const groups: { label: string; entries: [string, string][] }[] = [
    { label: 'Brand', entries: [['brandPrimary', Colors.brandPrimary], ['brandSecondary', Colors.brandSecondary]] },
    { label: 'Background', entries: [['bgBase', Colors.bgBase], ['bgSubtle', Colors.bgSubtle], ['bgMuted', Colors.bgMuted], ['bgInverse', Colors.bgInverse]] },
    { label: 'Surface', entries: [['surfaceDefault', Colors.surfaceDefault], ['surfaceRaised', Colors.surfaceRaised], ['surfaceOverlay', Colors.surfaceOverlay]] },
    { label: 'Text', entries: [['textPrimary', Colors.textPrimary], ['textSecondary', Colors.textSecondary], ['textDisabled', Colors.textDisabled], ['textInverse', Colors.textInverse], ['textLink', Colors.textLink]] },
    { label: 'Border', entries: [['borderDefault', Colors.borderDefault], ['borderStrong', Colors.borderStrong], ['borderFocus', Colors.borderFocus]] },
    { label: 'Status', entries: [['statusSuccess', Colors.statusSuccess], ['statusWarning', Colors.statusWarning], ['statusError', Colors.statusError], ['statusInfo', Colors.statusInfo]] },
  ];
  return (
    <View style={s.content}>
      {groups.map(g => (
        <View key={g.label}>
          <Divider label={g.label} />
          <View style={s.swatchGrid}>
            {g.entries.map(([name, value]) => (
              <Swatch key={name} color={value} name={name} value={value} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const PaletteView = () => {
  const groups: { label: string; entries: [string, string][] }[] = [
    { label: 'Primary', entries: Object.entries(Palette).filter(([k]) => k.startsWith('primary')) as [string, string][] },
    { label: 'Neutral', entries: Object.entries(Palette).filter(([k]) => k.startsWith('neutral')) as [string, string][] },
    { label: 'Success', entries: Object.entries(Palette).filter(([k]) => k.startsWith('success')) as [string, string][] },
    { label: 'Warning', entries: Object.entries(Palette).filter(([k]) => k.startsWith('warning')) as [string, string][] },
    { label: 'Error', entries: Object.entries(Palette).filter(([k]) => k.startsWith('error')) as [string, string][] },
    { label: 'Info', entries: Object.entries(Palette).filter(([k]) => k.startsWith('info')) as [string, string][] },
  ];
  return (
    <View style={s.content}>
      {groups.map(g => (
        <View key={g.label}>
          <Divider label={g.label} />
          <View style={s.swatchGrid}>
            {g.entries.map(([name, value]) => (
              <Swatch key={name} color={value} name={name} value={value} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const SpacingView = () => (
  <View style={s.content}>
    {Object.entries(Spacing).map(([k, v]) => (
      <SpacingBar key={k} name={k} value={v as number} />
    ))}
  </View>
);

const TypographyView = () => {
  const t = useTheme();
  return (
    <View style={s.content}>
      <Divider label="Font Family" />
      {Object.entries(FontFamily).map(([k, v]) => (
        <Row key={k} left={<Label name={`FontFamily.${k}`} />} right={<Value text={v} />} />
      ))}
      <Divider label="Font Size" />
      {Object.entries(FontSize).map(([k, v]) => (
        <Row
          key={k}
          left={<Label name={`FontSize.${k}`} sub={`${v}px`} />}
          right={<Text style={{ fontSize: v as number, color: t.textPrimary, lineHeight: (v as number) * 1.4 }}>Aa</Text>}
        />
      ))}
      <Divider label="Font Weight" />
      {Object.entries(FontWeight).map(([k, v]) => (
        <Row
          key={k}
          left={<Label name={`FontWeight.${k}`} sub={v} />}
          right={<Text style={{ fontSize: 16, fontWeight: v as any, color: t.textPrimary }}>The quick brown fox</Text>}
        />
      ))}
      <Divider label="Line Height" />
      {Object.entries(LineHeight).map(([k, v]) => (
        <Row key={k} left={<Label name={`LineHeight.${k}`} />} right={<Value text={String(v)} />} />
      ))}
      <Divider label="Letter Spacing" />
      {Object.entries(LetterSpacing).map(([k, v]) => (
        <Row key={k} left={<Label name={`LetterSpacing.${k}`} sub={`${v}px`} />} right={<Value text={String(v)} />} />
      ))}
    </View>
  );
};

const RadiusView = () => (
  <View style={s.content}>
    {Object.entries(Radius).map(([k, v]) => (
      <Row
        key={k}
        left={<Label name={`Radius.${k}`} sub={`${v}px`} />}
        right={
          <View style={{ width: 48, height: 48, backgroundColor: '#6366F1', borderRadius: v as number }} />
        }
      />
    ))}
  </View>
);

const ShadowsView = () => (
  <View style={s.content}>
    {Object.entries(Shadow).map(([k, v]) => (
      <Row
        key={k}
        left={<Label name={`Shadow.${k}`} />}
        right={
          <View style={[{ width: 80, height: 48, backgroundColor: '#FFFFFF', borderRadius: 8 }, v as any]} />
        }
      />
    ))}
  </View>
);

const ZIndexView = () => (
  <View style={s.content}>
    {Object.entries(ZIndex).map(([k, v]) => (
      <Row key={k} left={<Label name={`ZIndex.${k}`} />} right={<Value text={String(v)} />} />
    ))}
  </View>
);

const DurationView = () => (
  <View style={s.content}>
    {Object.entries(Duration).map(([k, v]) => (
      <Row key={k} left={<Label name={`Duration.${k}`} sub={`${v}ms`} />} right={<Value text={`${v}ms`} />} />
    ))}
  </View>
);

const RENDERERS: Record<Category, React.FC> = {
  Colors: ColorsView,
  Palette: PaletteView,
  Spacing: SpacingView,
  Typography: TypographyView,
  Radius: RadiusView,
  Shadows: ShadowsView,
  'Z-Index': ZIndexView,
  Duration: DurationView,
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const TokensTab = ({ t }: { t: ThemeTokens }) => {
  const [active, setActive] = useState<Category>('Colors');
  const Renderer = RENDERERS[active];

  return (
    <ThemeCtx.Provider value={t}>
      {/* Sidebar */}
      <View style={[s.sidebar, { backgroundColor: t.sidebar, borderRightColor: t.border }]}>
        <View style={[s.fileRef, { borderBottomColor: t.border }]}>
          <Text style={[s.fileRefLabel, { color: t.textSecondary }]}>Source</Text>
          <Text style={[s.fileRefPath, { color: t.textPrimary }]}>src/tokens/index.ts</Text>
        </View>

        {CATEGORIES.map(cat => (
          <Text
            key={cat}
            onPress={() => setActive(cat)}
            style={[
              s.navLabel,
              { color: cat === active ? t.textPrimary : t.textSecondary },
              cat === active && s.navLabelActive,
              cat === active && { backgroundColor: t.navActive },
            ]}
          >
            {cat}
          </Text>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[s.scroll, { backgroundColor: t.bg }]}>
          <View style={[s.panel, { backgroundColor: t.surface }]}>
            <Renderer />
          </View>
        </ScrollView>
      </View>
    </ThemeCtx.Provider>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  sidebar: {
    width: 180,
    borderRightWidth: 1,
    paddingTop: Spacing[4],
    paddingHorizontal: Spacing[3],
    gap: Spacing[1],
  },
  fileRef: {
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[3],
    marginBottom: Spacing[2],
    borderBottomWidth: 1,
    gap: Spacing[0.5],
  },
  fileRefLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium as any,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  fileRefPath: {
    fontSize: FontSize.xs,
    fontFamily: 'monospace',
  },
  navLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium as any,
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  navLabelActive: {
    fontWeight: FontWeight.semibold as any,
  },
  scroll: {
    padding: Spacing[8],
    alignItems: 'center',
    flexGrow: 1,
  },
  panel: {
    borderRadius: Radius['2xl'],
    padding: Spacing[6],
    width: '100%',
    maxWidth: 640,
  },
  content: {
    gap: Spacing[2],
  },
  groupLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold as any,
    color: '#94A3B8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: Spacing[5],
    marginBottom: Spacing[1],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[2],
    borderBottomWidth: 1,
    gap: Spacing[4],
  },
  rowLeft: {
    width: 200,
  },
  rowRight: {
    flex: 1,
  },
  tokenName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium as any,
    fontFamily: 'monospace',
  },
  tokenSub: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  tokenValue: {
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginBottom: Spacing[2],
  },
  swatchRow: {
    width: 140,
  },
  swatchBox: {
    height: 72,
    borderRadius: Radius.lg,
    padding: Spacing[2],
    justifyContent: 'flex-end',
  },
  swatchLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold as any,
  },
  swatchValue: {
    fontSize: 9,
    marginTop: 1,
    fontFamily: 'monospace',
  },
});
