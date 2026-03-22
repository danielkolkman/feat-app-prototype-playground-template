/**
 * PlaygroundShell.tsx — DO NOT EDIT
 *
 * This is the playground viewer framework. It provides the topbar,
 * sidebar, tabs, dark mode, and phone canvas. To configure the playground
 * for your project, edit src/playground.config.ts instead.
 */

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Modal,
  SafeAreaView, StyleSheet, useWindowDimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Palette, Spacing, Radius, FontSize, FontWeight } from '../tokens/index';
import { COMPONENTS, FLOWS } from '../playground.config';
import { TokensTab } from './TokensViewer';
import { PlaygroundThemeContext, lightColors, darkColors } from './ThemeContext';
import { DefaultScreen } from './DefaultScreen';

// ─── Theme ────────────────────────────────────────────────────────────────────

const light = {
  bg:           Palette.neutral100,
  surface:      Palette.neutral0,
  sidebar:      Palette.neutral0,
  border:       Palette.neutral200,
  textPrimary:  Palette.neutral900,
  textSecondary:Palette.neutral500,
  navActive:    Palette.neutral100,
  topbar:       Palette.neutral0,
  tabActive:    Palette.neutral900,
  tabInactive:  Palette.neutral400,
  tabIndicator: Palette.neutral900,
};

const dark = {
  bg:           Palette.neutral900,
  surface:      Palette.neutral800,
  sidebar:      Palette.neutral800,
  border:       '#2D3748',
  textPrimary:  Palette.neutral0,
  textSecondary:Palette.neutral400,
  navActive:    Palette.neutral700,
  topbar:       Palette.neutral800,
  tabActive:    Palette.neutral0,
  tabInactive:  Palette.neutral500,
  tabIndicator: Palette.neutral0,
};

// ─── Empty state ─────────────────────────────────────────────────────────────

const Step = ({ n, text, t }: { n: number; text: string; t: typeof light }) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[3] }}>
    <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: t.navActive, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: FontSize.xs, fontWeight: FontWeight.bold as any, color: t.textPrimary }}>{n}</Text>
    </View>
    <Text style={{ fontSize: FontSize.sm, color: t.textSecondary, flex: 1, lineHeight: 20 }}>{text}</Text>
  </View>
);

const HowToOverlay = ({ tab, t, onClose }: { tab: 'components' | 'screens'; t: typeof light; onClose: () => void }) => {
  const isComponents = tab === 'components';
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={s2.backdrop} activeOpacity={1} onPress={onClose}>
        <View style={[s2.sheet, { backgroundColor: t.surface }]} onStartShouldSetResponder={() => true}>
          <View style={s2.sheetHeader}>
            <Text style={{ fontSize: FontSize.lg, fontWeight: FontWeight.semibold as any, color: t.textPrimary }}>
              {isComponents ? 'Adding components' : 'Adding flows'}
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Text style={{ fontSize: FontSize.lg, color: t.textSecondary }}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: Spacing[4] }}>
            {isComponents ? (
              <>
                <Step n={1} t={t} text="Add your tokens to src/tokens/index.ts" />
                <Step n={2} t={t} text="Drop your components into src/components/" />
                <Step n={3} t={t} text="Create a preview screen in src/screens/" />
                <Step n={4} t={t} text="Register it in src/playground.config.ts" />
              </>
            ) : (
              <>
                <Step n={1} t={t} text="Create a folder in src/flows/YourFlow/" />
                <Step n={2} t={t} text="Add screens and a stack navigator inside it" />
                <Step n={3} t={t} text="Register it in src/flows/index.ts" />
              </>
            )}
          </View>
          <Text style={{ fontSize: FontSize.xs, color: t.textSecondary, marginTop: Spacing[4] }}>
            See <Text style={{ fontFamily: 'monospace' }}>examples/</Text> for a full reference implementation
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'screens' | 'components' | 'tokens';
type Scale = 'fit' | 25 | 50 | 75 | 100;
const SCALE_OPTIONS: Scale[] = ['fit', 25, 50, 75, 100];
const PHONE_W = 390;
const PHONE_H = 844;

// ─── Shell ────────────────────────────────────────────────────────────────────

export const PlaygroundShell = () => {
  const [tab, setTab]                   = useState<Tab>('components');
  const [activeComponent, setActiveComponent] = useState(0);
  const [activeFlow, setActiveFlow]     = useState(0);
  const [darkMode, setDarkMode]         = useState(false);
  const [flowKey, setFlowKey]           = useState(0);
  const [showHowTo, setShowHowTo]       = useState(false);
  const [scale, setScale]               = useState<Scale>('fit');
  const { width: winW, height: winH }   = useWindowDimensions();
  const t = darkMode ? dark : light;

  const SIDEBAR  = 180;
  const TOPBAR   = 52;
  const SCALEBAR = 36;
  const PAD      = Spacing[8] * 2;
  const fitScale = Math.min(
    (winW - SIDEBAR - PAD) / PHONE_W,
    (winH - TOPBAR - SCALEBAR - PAD) / PHONE_H,
  );
  const resolvedScale = scale === 'fit' ? fitScale : scale / 100;
  const canvasW = Math.round(PHONE_W * resolvedScale);
  const canvasH = Math.round(PHONE_H * resolvedScale);

  const ActiveComponent = COMPONENTS[activeComponent]?.component;
  const ActiveFlow      = FLOWS[activeFlow]?.component;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: t.bg }]}>

      {/* ── Topbar ── */}
      <View style={[s.topbar, { backgroundColor: t.topbar, borderBottomColor: t.border }]}>
        <Text style={[s.topbarTitle, { color: t.textPrimary }]}>Playground</Text>

        <View style={s.tabs}>
          {(['screens', 'components', 'tokens'] as Tab[]).map(id => (
            <TouchableOpacity key={id} style={s.tabItem} onPress={() => { setTab(id); setShowHowTo(false); }}>
              <Text style={[s.tabLabel, { color: tab === id ? t.tabActive : t.tabInactive }]}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Text>
              {tab === id && <View style={[s.tabIndicator, { backgroundColor: t.tabIndicator }]} />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[s.toggle, { borderColor: t.border }]}
          onPress={() => setDarkMode(v => !v)}
          activeOpacity={0.7}
        >
          <Text style={s.toggleLabel}>
            {darkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Body ── */}
      <View style={s.body}>

        {tab === 'tokens' ? (
          <TokensTab t={t} />

        ) : tab === 'components' ? (
          <>
            {showHowTo && <HowToOverlay tab="components" t={t} onClose={() => setShowHowTo(false)} />}
            <View style={[s.sidebar, { backgroundColor: t.sidebar, borderRightColor: t.border }]}>
              {COMPONENTS.map((c, i) => (
                <TouchableOpacity
                  key={c.name}
                  style={[s.navItem, i === activeComponent && { backgroundColor: t.navActive }]}
                  onPress={() => setActiveComponent(i)}
                >
                  <Text style={[s.navLabel,
                    { color: i === activeComponent ? t.textPrimary : t.textSecondary },
                    i === activeComponent && s.navLabelActive,
                  ]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[s.howToBtn, { borderColor: t.border }]} onPress={() => setShowHowTo(true)}>
                <Text style={[s.howToBtnLabel, { color: t.textSecondary }]}>Get started?</Text>
              </TouchableOpacity>
            </View>
            <View style={s.content}>
              <ScrollView contentContainerStyle={s.componentScroll}>
                {ActiveComponent && (
                  <View style={[s.componentPreview, { backgroundColor: t.surface }]}>
                    <ActiveComponent />
                  </View>
                )}
              </ScrollView>
            </View>
          </>

        ) : (
          <>
            {showHowTo && <HowToOverlay tab="screens" t={t} onClose={() => setShowHowTo(false)} />}
            <View style={[s.sidebar, { backgroundColor: t.sidebar, borderRightColor: t.border }]}>
              {FLOWS.length === 0 ? (
                <View style={[s.navItem, { backgroundColor: t.navActive }]}>
                  <Text style={[s.navLabel, s.navLabelActive, { color: t.textPrimary }]}>
                    Starting Screen
                  </Text>
                </View>
              ) : FLOWS.map((f, i) => (
                <TouchableOpacity
                  key={f.name}
                  style={[s.navItem, i === activeFlow && { backgroundColor: t.navActive }]}
                  onPress={() => { setActiveFlow(i); setFlowKey(k => k + 1); }}
                >
                  <Text style={[s.navLabel,
                    { color: i === activeFlow ? t.textPrimary : t.textSecondary },
                    i === activeFlow && s.navLabelActive,
                  ]}>
                    {f.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[s.howToBtn, { borderColor: t.border }]} onPress={() => setShowHowTo(true)}>
                <Text style={[s.howToBtnLabel, { color: t.textSecondary }]}>Get started?</Text>
              </TouchableOpacity>
            </View>
            <View style={s.content}>
              {FLOWS.length === 0 ? (
                <PlaygroundThemeContext.Provider value={{ isDark: darkMode, colors: darkMode ? darkColors : lightColors }}>
                  <View style={[s.phoneWrapper, { flex: 1 }]}>
                    <View style={{ width: canvasW, height: canvasH, overflow: 'hidden', borderRadius: Radius['2xl'] }}>
                      <View style={[s.phoneCanvas, { backgroundColor: t.surface,
                        transform: [{ scale: resolvedScale }] as any,
                        // @ts-ignore
                        transformOrigin: 'top left',
                      }]}>
                        <DefaultScreen />
                      </View>
                    </View>
                  </View>
                </PlaygroundThemeContext.Provider>
              ) : (<>
              <View style={[s.scaleBar, { borderBottomColor: t.border }]}>
                {SCALE_OPTIONS.map(opt => {
                  const active = opt === scale;
                  return (
                    <TouchableOpacity
                      key={String(opt)}
                      style={[s.scaleBtn, active && { backgroundColor: t.navActive }]}
                      onPress={() => setScale(opt)}
                    >
                      <Text style={[s.scaleBtnLabel, { color: active ? t.textPrimary : t.textSecondary }]}>
                        {opt === 'fit' ? 'Fit' : `${opt}%`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {scale === 'fit' ? (
                <View style={[s.phoneWrapper, { flex: 1 }]}>
                  <View style={{ width: canvasW, height: canvasH, overflow: 'hidden', borderRadius: Radius['2xl'] }}>
                    <View style={[s.phoneCanvas, { backgroundColor: t.surface,
                      transform: [{ scale: resolvedScale }] as any,
                      // @ts-ignore
                      transformOrigin: 'top left',
                    }]}>
                      <PlaygroundThemeContext.Provider value={{ isDark: darkMode, colors: darkMode ? darkColors : lightColors }}>
                        <NavigationContainer key={flowKey} independent>
                          {ActiveFlow && <ActiveFlow />}
                        </NavigationContainer>
                      </PlaygroundThemeContext.Provider>
                    </View>
                  </View>
                </View>
              ) : (
                <ScrollView contentContainerStyle={s.phoneWrapper}>
                  <View style={{ width: canvasW, height: canvasH, overflow: 'hidden', borderRadius: Radius['2xl'] }}>
                    <View style={[s.phoneCanvas, { backgroundColor: t.surface,
                      transform: [{ scale: resolvedScale }] as any,
                      // @ts-ignore
                      transformOrigin: 'top left',
                    }]}>
                      <PlaygroundThemeContext.Provider value={{ isDark: darkMode, colors: darkMode ? darkColors : lightColors }}>
                        <NavigationContainer key={flowKey} independent>
                          {ActiveFlow && <ActiveFlow />}
                        </NavigationContainer>
                      </PlaygroundThemeContext.Provider>
                    </View>
                  </View>
                </ScrollView>
              )}
              </>)}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root:             { flex: 1, flexDirection: 'column' },
  topbar:           { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing[5], borderBottomWidth: 1 },
  topbarTitle:      { fontSize: FontSize.base, fontWeight: FontWeight.semibold as any, width: 160 },
  tabs:             { flexDirection: 'row', gap: Spacing[6] },
  tabItem:          { alignItems: 'center', paddingBottom: 2 },
  tabLabel:         { fontSize: FontSize.sm, fontWeight: FontWeight.medium as any },
  tabIndicator:     { position: 'absolute', bottom: -16, left: 0, right: 0, height: 2, borderRadius: 1 },
  toggle:           { paddingVertical: Spacing[1], paddingHorizontal: Spacing[3], borderRadius: Radius.full, borderWidth: 1 },
  toggleLabel:      { fontSize: FontSize.base },
  body:             { flex: 1, flexDirection: 'row' },
  sidebar:          { width: 180, borderRightWidth: 1, paddingTop: Spacing[4], paddingHorizontal: Spacing[3], gap: Spacing[1], paddingBottom: Spacing[4] },
  navItem:          { paddingVertical: Spacing[2], paddingHorizontal: Spacing[3], borderRadius: Radius.lg },
  navLabel:         { fontSize: FontSize.sm, fontWeight: FontWeight.medium as any },
  navLabelActive:   { fontWeight: FontWeight.semibold as any },
  content:          { flex: 1 },
  componentScroll:  { padding: Spacing[8], alignItems: 'center' },
  componentPreview: { borderRadius: Radius['2xl'], padding: Spacing[8], minWidth: 400 },
  scaleBar:         { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: Spacing[1], paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderBottomWidth: 1 },
  scaleBtn:         { paddingVertical: Spacing[1], paddingHorizontal: Spacing[2], borderRadius: Radius.md },
  scaleBtnLabel:    { fontSize: FontSize.xs, fontWeight: FontWeight.medium as any },
  phoneWrapper:     { alignItems: 'center', padding: Spacing[8] },
  phoneCanvas:      { width: PHONE_W, height: PHONE_H, overflow: 'hidden' },
  howToBtn:         { marginTop: 'auto', marginHorizontal: Spacing[3], paddingVertical: Spacing[2], paddingHorizontal: Spacing[3], borderRadius: Radius.lg, borderWidth: 1, alignItems: 'center' },
  howToBtnLabel:    { fontSize: FontSize.xs, fontWeight: FontWeight.medium as any },
});

const s2 = StyleSheet.create({
  backdrop:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  sheet:       { width: 400, borderRadius: Radius['2xl'], padding: Spacing[6], gap: Spacing[5] },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
