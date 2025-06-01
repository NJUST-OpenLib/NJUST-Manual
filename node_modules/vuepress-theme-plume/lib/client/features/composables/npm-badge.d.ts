import { Ref, ComputedRef } from 'vue';

type NpmBadgeType = 'source' | 'stars' | 'forks' | 'license' | 'version' | 'dt' | 'd18m' | 'dw' | 'dm' | 'dy';
type NpmBadgeTheme = 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
interface NpmBadgeBaseOptions {
    name?: string;
    repo?: string;
    branch?: string;
    dir?: string;
    color?: string;
    labelColor?: string;
    theme?: NpmBadgeTheme;
}
interface NpmBadgeOptions extends NpmBadgeBaseOptions {
    type: NpmBadgeType;
    label?: string;
}
interface NpmBadgeGroupOptions extends Omit<NpmBadgeBaseOptions, 'label'> {
    items?: string | NpmBadgeType | NpmBadgeType[];
}
interface NpmBadgeInfo {
    badgeUrl: string;
    link?: string;
    alt?: string;
}
declare function useNpmBadge(opt: Ref<NpmBadgeOptions>): ComputedRef<NpmBadgeInfo>;
declare function useNpmBadgeGroup(opt: Ref<NpmBadgeGroupOptions>): void;

export { type NpmBadgeBaseOptions, type NpmBadgeGroupOptions, type NpmBadgeInfo, type NpmBadgeOptions, type NpmBadgeTheme, type NpmBadgeType, useNpmBadge, useNpmBadgeGroup };
