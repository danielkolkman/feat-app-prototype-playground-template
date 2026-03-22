import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Palette, Spacing, Radius, FontSize, FontWeight } from './src/tokens';

import { ButtonScreen } from './src/screens/ButtonScreen';
import { BadgeScreen } from './src/screens/BadgeScreen';
import { TypographyScreen } from './src/screens/TypographyScreen';
import { CardScreen } from './src/screens/CardScreen';
import { InputScreen } from './src/screens/InputScreen';
import { AvatarScreen } from './src/screens/AvatarScreen';
import { FLOWS } from './src/flows';
import { TokensTab } from './src/screens/TokensScreen';

const COMPONENTS = [
  { name: 'Button',     component: ButtonScreen },
  { name: 'Badge',      component: BadgeScreen },
  { name: 'Typography', component: TypographyScreen },
  { name: 'Card',       component: CardScreen },
  { name: 'Input',      component: InputScreen },
  { name: 'Avatar',     component: AvatarScreen },
];

// Phone canvas dimensions
const PHONE_W = 390;
const PHONE_H = 844;

const light = {
  bg:            Palette.neutral100,
  surface:       Palette.neutral0,
  sidebar:       Palette.neutral0,
  border:        Palette.neutral200,
  textPrimary:   Palette.neutral900,
  textSecondary: Palette.neutral500,
  navActive:     Palette.neutral100,
  topbar:        Palette.neutral0,
  toggle:        Palette.neutral200,
  toggleThumb:   Palette.neutral0,
  toggleLabel:   Palette.neutral500,
  tabActive:     Palette.neutral900,
  tabInactive:   Palette.neutral400,
  tabIndicator:  Palette.neutral900,
};

const dark = {
  bg:            Palette.neutral900,
  surface:       Palette.neutral800,
  sidebar:       Palette.neutral800,
  border:        '#2D3748',
  textPrimary:   Palette.neutral0,
  textSecondary: Palette.neutral400,
  navActive:     Palette.neutral700,
  topbar:        Palette.neutral800,
  toggle:        Palette.neutral700,
  toggleThumb:   Palette.neutral400,
  toggleLabel:   Palette.neutral400,
  tabActive:     Palette.neutral0,
  tabInactive:   Palette.neutral500,
  tabIndicator:  Palette.neutral0,
};

type Tab = 'components' | 'screens' | 'tokens';
type Scale = 'fit' | 25 | 50 | 75 | 100;
const SCALE_OPTIONS: Scale[] = ['fit', 25, 50, 75, 100];

export default function App() {
  const [tab, setTab] = useState<Tab>('components');
  const [activeComponent, setActiveComponent] = useState(0);
  const [activeFlow, setActiveFlow] = useState(0);
  const [dark_mode, setDarkMode] = useState(false);
  const [flowKey, setFlowKey] = useState(0);
  const [scale, setScale] = useState<Scale>('fit');
  const { width: winW, height: winH } = useWindowDimensions();
  const t = dark_mode ? dark : light;

  const SIDEBAR   = 180;
  const TOPBAR    = 52;
  const SCALEBAR  = 36;
  const PAD       = Spacing[8] * 2;
  const fitScale  = Math.min(
    (winW - SIDEBAR - PAD) / PHONE_W,
    (winH - TOPBAR - SCALEBAR - PAD) / PHONE_H,
  );
  const resolvedScale = scale === 'fit' ? fitScale : scale / 100;
  const canvasW = Math.round(PHONE_W * resolvedScale);
  const canvasH = Math.round(PHONE_H * resolvedScale);

  const ActiveComponent = COMPONENTS[activeComponent].component;
  const ActiveFlow = FLOWS[activeFlow].component;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: t.bg }]}>
      {/* Top Nav */}
      <View style={[styles.topbar, { backgroundColor: t.topbar, borderBottomColor: t.border }]}>
        <Text style={[styles.topbarTitle, { color: t.textPrimary }]}>Component Viewer</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['screens', 'components', 'tokens'] as Tab[]).map(id => (
            <TouchableOpacity key={id} style={styles.tabItem} onPress={() => setTab(id)}>
              <Text style={[styles.tabLabel, { color: tab === id ? t.tabActive : t.tabInactive }]}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Text>
              {tab === id && <View style={[styles.tabIndicator, { backgroundColor: t.tabIndicator }]} />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.toggle, { borderColor: t.border }]}
          onPress={() => setDarkMode(v => !v)}
          activeOpacity={0.7}
        >
          <Text style={[styles.toggleLabel, { color: t.textSecondary }]}>
            {dark_mode ? '☀️' : '🌙'}
          </Text>
          <View style={[styles.toggleTrack, { backgroundColor: dark_mode ? t.tabActive : t.border }]}>
            <View style={[styles.toggleThumb, { alignSelf: dark_mode ? 'flex-end' : 'flex-start', backgroundColor: dark_mode ? t.topbar : t.textSecondary }]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {tab === 'tokens' ? (
          <TokensTab t={t} />
        ) : tab === 'components' ? (
          <>
            {/* Component Sidebar */}
            <View style={[styles.sidebar, { backgroundColor: t.sidebar, borderRightColor: t.border }]}>
              {COMPONENTS.map((c, i) => (
                <TouchableOpacity
                  key={c.name}
                  style={[styles.navItem, i === activeComponent && { backgroundColor: t.navActive }]}
                  onPress={() => setActiveComponent(i)}
                >
                  <Text style={[
                    styles.navLabel,
                    { color: i === activeComponent ? t.textPrimary : t.textSecondary },
                    i === activeComponent && styles.navLabelActive,
                  ]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Component Preview */}
            <View style={styles.content}>
              <ScrollView contentContainerStyle={styles.componentScroll}>
                <View style={[styles.componentPreview, { backgroundColor: t.surface }]}>
                  <ActiveComponent />
                </View>
              </ScrollView>
            </View>
          </>
        ) : (
          <>
            {/* Flow Sidebar */}
            <View style={[styles.sidebar, { backgroundColor: t.sidebar, borderRightColor: t.border }]}>
              {FLOWS.map((f, i) => (
                <TouchableOpacity
                  key={f.name}
                  style={[styles.navItem, i === activeFlow && { backgroundColor: t.navActive }]}
                  onPress={() => { setActiveFlow(i); setFlowKey(k => k + 1); }}
                >
                  <Text style={[
                    styles.navLabel,
                    { color: i === activeFlow ? t.textPrimary : t.textSecondary },
                    i === activeFlow && styles.navLabelActive,
                  ]}>
                    {f.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Flow Preview — phone canvas */}
            <View style={styles.content}>
              {/* Scale toolbar */}
              <View style={[styles.scaleBar, { borderBottomColor: t.border }]}>
                {SCALE_OPTIONS.map(s => {
                  const active = s === scale;
                  return (
                    <TouchableOpacity
                      key={String(s)}
                      style={[styles.scaleBtn, active && { backgroundColor: t.navActive }]}
                      onPress={() => setScale(s)}
                    >
                      <Text style={[styles.scaleBtnLabel, { color: active ? t.textPrimary : t.textSecondary }]}>
                        {s === 'fit' ? 'Fit' : `${s}%`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {scale === 'fit' ? (
                <View style={[styles.phoneWrapper, { flex: 1 }]}>
                  {/* Clip to scaled size, inner canvas always full phone dimensions */}
                  <View style={{ width: canvasW, height: canvasH, overflow: 'hidden', borderRadius: Radius['2xl'] }}>
                    <View style={[styles.phoneCanvas, { backgroundColor: t.surface, transform: [{ scale: resolvedScale }] as any, // @ts-ignore
                      transformOrigin: 'top left' }]}>
                      <NavigationContainer key={flowKey} independent>
                        <ActiveFlow />
                      </NavigationContainer>
                    </View>
                  </View>
                </View>
              ) : (
                <ScrollView contentContainerStyle={styles.phoneWrapper}>
                  <View style={{ width: canvasW, height: canvasH, overflow: 'hidden', borderRadius: Radius['2xl'] }}>
                    <View style={[styles.phoneCanvas, { backgroundColor: t.surface, transform: [{ scale: resolvedScale }] as any, // @ts-ignore
                      transformOrigin: 'top left' }]}>
                      <NavigationContainer key={flowKey} independent>
                        <ActiveFlow />
                      </NavigationContainer>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  topbar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[5],
    borderBottomWidth: 1,
  },
  topbarTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold as any,
    width: 160,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing[6],
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: 2,
  },
  tabLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium as any,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -16,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
    borderRadius: Radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  toggleTrack: {
    width: 28,
    height: 16,
    borderRadius: Radius.full,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  toggleLabel: {
    fontSize: FontSize.sm,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 180,
    borderRightWidth: 1,
    paddingTop: Spacing[4],
    paddingHorizontal: Spacing[3],
    gap: Spacing[1],
  },
  navItem: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.lg,
  },
  navLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium as any,
  },
  navLabelActive: {
    fontWeight: FontWeight.semibold as any,
  },
  content: {
    flex: 1,
  },
  componentScroll: {
    padding: Spacing[8],
    alignItems: 'center',
  },
  componentPreview: {
    borderRadius: Radius['2xl'],
    padding: Spacing[8],
    minWidth: 400,
  },
  scaleBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing[1],
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderBottomWidth: 1,
  },
  scaleBtn: {
    paddingVertical: Spacing[1],
    paddingHorizontal: Spacing[2],
    borderRadius: Radius.md,
  },
  scaleBtnLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium as any,
  },
  phoneWrapper: {
    alignItems: 'center',
    padding: Spacing[8],
  },
  phoneCanvas: {
    width: PHONE_W,
    height: PHONE_H,
    overflow: 'hidden',
  },
});
