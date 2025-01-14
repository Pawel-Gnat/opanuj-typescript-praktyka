import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> = {
  [K in keyof T as K extends `${infer Base}V2Enabled` ? `${Base}Enabled` : never]: T[K];
};

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const flagsV2: ModernFeatureFlags = Object.fromEntries(
    Object.entries(flags)
      .filter(([key]) => key.endsWith('V2Enabled'))
      .map(([key, value]) => [key.replace('V2Enabled', 'Enabled'), value]),
  ) as ModernFeatureFlags;

  return flagsV2;
}
