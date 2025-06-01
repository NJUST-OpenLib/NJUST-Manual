import * as vue from 'vue';
import { MaybeRef } from 'vue';

interface GithubRepoInfo {
    name: string;
    fullName: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    watchers: number;
    language: string;
    languageColor: string;
    visibility: 'Private' | 'Public';
    template: boolean;
    ownerType: 'User' | 'Organization';
    license: {
        name: string;
        url: string;
    } | null;
}
declare function useGithubRepo(repo: MaybeRef<string>): {
    data: vue.Ref<{
        name: string;
        fullName: string;
        description: string;
        url: string;
        stars: number;
        forks: number;
        watchers: number;
        language: string;
        languageColor: string;
        visibility: "Private" | "Public";
        template: boolean;
        ownerType: "User" | "Organization";
        license: {
            name: string;
            url: string;
        } | null;
    } | null, GithubRepoInfo | {
        name: string;
        fullName: string;
        description: string;
        url: string;
        stars: number;
        forks: number;
        watchers: number;
        language: string;
        languageColor: string;
        visibility: "Private" | "Public";
        template: boolean;
        ownerType: "User" | "Organization";
        license: {
            name: string;
            url: string;
        } | null;
    } | null>;
    loaded: vue.Ref<boolean, boolean>;
};

export { type GithubRepoInfo, useGithubRepo };
