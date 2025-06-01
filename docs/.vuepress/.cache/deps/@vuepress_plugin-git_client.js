import {
  useToggle
} from "./chunk-IPDLDM6K.js";
import "./chunk-U6ZKZ7PY.js";
import {
  computed,
  defineComponent,
  h,
  toValue
} from "./chunk-LW4I4DCF.js";

// node_modules/@vuepress/plugin-git/lib/client/composables/useChangelog.js
import { usePageData, usePageFrontmatter, usePageLang } from "vuepress/client";

// node_modules/@vuepress/plugin-git/lib/client/options.js
var gitOptions = typeof __GIT_OPTIONS__ === "undefined" ? {} : __GIT_OPTIONS__;

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/components/LoadingIcon.js
var getLength = (size) => typeof size === "number" ? `${size}px` : size;
var LoadingIcon = ({ size = 48, stroke = 4, wrapper = true, height = 2 * size }) => {
  const icon = h("span", {
    style: `--loading-icon: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' viewBox='25 25 50 50'%3E%3CanimateTransform attributeName='transform' type='rotate' dur='2s' keyTimes='0;1' repeatCount='indefinite' values='0;360'%3E%3C/animateTransform%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='currentColor' stroke-width='${stroke}' stroke-linecap='round'%3E%3Canimate attributeName='stroke-dasharray' dur='1.5s' keyTimes='0;0.5;1' repeatCount='indefinite' values='1,200;90,200;1,200'%3E%3C/animate%3E%3Canimate attributeName='stroke-dashoffset' dur='1.5s' keyTimes='0;0.5;1' repeatCount='indefinite' values='0;-35px;-125px'%3E%3C/animate%3E%3C/circle%3E%3C/svg%3E");
--icon-size: ${getLength(size)};
display: inline-block;
width: var(--icon-size);
height: var(--icon-size);
background-color: currentcolor;
-webkit-mask-image: var(--loading-icon);
mask-image: var(--loading-icon);
`
  });
  return wrapper ? h("div", {
    style: `display: flex;
align-items: center;
justify-content: center;
height: ${getLength(height)}`
  }, icon) : icon;
};
LoadingIcon.displayName = "LoadingIcon";

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/utils/getHeaders.js
var DEFAULT_HEADER_SELECTOR = [...new Array(6)].map((_, i) => `[vp-content] h${i + 1}`).join(",");

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/utils/isKeyMatched.js
import { isString } from "vuepress/shared";

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/composables/useHeaders.js
import { onContentUpdated } from "vuepress/client";

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/composables/useLocaleConfig.js
import { useRouteLocale } from "vuepress/client";
var useLocaleConfig = (localesConfig) => {
  const routeLocale = useRouteLocale();
  return computed(() => toValue(localesConfig)[routeLocale.value] ?? {});
};

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/client/composables/useRoutePaths.js
import { useRoutes } from "vuepress/client";

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/shared/helper.js
import { isString as isString2 } from "vuepress/shared";
import { isFunction, isString as isString3, isPlainObject } from "vuepress/shared";
import { ensureEndingSlash, ensureLeadingSlash, removeEndingSlash, removeLeadingSlash } from "vuepress/shared";
var { isArray } = Array;
var { entries } = Object;
var { fromEntries } = Object;
var { keys } = Object;
var { values } = Object;

// node_modules/@vuepress/plugin-git/node_modules/@vuepress/helper/lib/shared/link.js
import { isLinkExternal, isLinkWithProtocol } from "vuepress/shared";
import { isLinkExternal as isLinkExternal2, isLinkHttp, isLinkWithProtocol as isLinkWithProtocol2 } from "vuepress/shared";

// node_modules/@vuepress/plugin-git/lib/client/utils/resolveRepoLink.js
var resolveRepoLink = (link, provider) => {
  if (!link || isLinkHttp(link))
    return link;
  if (provider === "github")
    return `https://github.com/${link}`;
  if (provider === "gitee")
    return `https://gitee.com/${link}`;
  return link;
};

// node_modules/@vuepress/plugin-git/lib/client/composables/useChangelog.js
var RE_ISSUE = /#(\d+)/g;
var useChangelog = typeof __GIT_CHANGELOG__ === "boolean" && __GIT_CHANGELOG__ ? (enabled = true) => {
  const frontmatter = usePageFrontmatter();
  const lang = usePageLang();
  const page = usePageData();
  const { pattern = {}, provider } = gitOptions;
  const repo = resolveRepoLink(gitOptions.repo, provider);
  return computed(() => {
    var _a;
    if (frontmatter.value.changelog === false || !toValue(enabled))
      return [];
    const formatter = new Intl.DateTimeFormat(lang.value, {
      dateStyle: "short"
    });
    return (((_a = page.value.git) == null ? void 0 : _a.changelog) ?? []).map((item) => {
      const res = {
        date: formatter.format(item.time),
        ...item
      };
      if (pattern.issue && repo) {
        res.message = res.message.replace(RE_ISSUE, (matched, issue) => {
          const url = pattern.issue.replace(":issue", issue).replace(":repo", repo);
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`;
        });
      }
      if (pattern.commit && repo) {
        res.commitUrl = pattern.commit.replace(":hash", res.hash).replace(":repo", repo);
      }
      if (pattern.tag && repo && res.tag)
        res.tagUrl = pattern.tag.replace(":tag", res.tag).replace(":repo", repo);
      return res;
    });
  });
} : () => computed(() => []);

// node_modules/@vuepress/plugin-git/lib/client/composables/useContributors.js
import { usePageData as usePageData2, usePageFrontmatter as usePageFrontmatter2 } from "vuepress/client";
var useContributors = typeof __GIT_CONTRIBUTORS__ === "boolean" && __GIT_CONTRIBUTORS__ ? (enabled = true) => {
  const frontmatter = usePageFrontmatter2();
  const page = usePageData2();
  return computed(() => {
    var _a;
    if (frontmatter.value.contributors === false || !toValue(enabled))
      return [];
    return ((_a = page.value.git) == null ? void 0 : _a.contributors) ?? [];
  });
} : () => computed(() => []);

// node_modules/@vuepress/plugin-git/lib/client/composables/useGitLocales.js
var locales = typeof __GIT_LOCALES__ === "undefined" ? {} : __GIT_LOCALES__;
var useGitLocaleConfig = () => useLocaleConfig(locales);

// node_modules/@vuepress/plugin-git/lib/client/composables/useLastUpdated.js
import { usePageData as usePageData3, usePageLang as usePageLang2 } from "vuepress/client";
var useLastUpdated = (enabled = true) => {
  const lang = usePageLang2();
  const locale = useGitLocaleConfig();
  const page = usePageData3();
  return computed(() => {
    var _a, _b, _c;
    if (!toValue(enabled))
      return null;
    const timeStamp = (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ((_a = page.value.git) == null ? void 0 : _a.updatedTime) ?? ((_c = (_b = page.value.git) == null ? void 0 : _b.changelog) == null ? void 0 : _c[0].time)
    );
    if (!timeStamp)
      return null;
    const date = new Date(timeStamp);
    const text = new Intl.DateTimeFormat(lang.value, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(timeStamp);
    return {
      date,
      text,
      iso: date.toISOString(),
      locale: locale.value.latestUpdateAt
    };
  });
};

// node_modules/@vuepress/plugin-git/lib/client/components/VPHeader.js
var VPHeader = ({ level = 2, text, anchor }) => h(`h${level || 2}`, { id: anchor, tabindex: "-1" }, h("a", { href: `#${anchor}`, class: "header-anchor" }, h("span", text)));

// node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js
import "E:/my-project/node_modules/@vuepress/plugin-git/lib/client/styles/contributors.css";
var GitContributor = ({ name, url, avatar }) => h(url ? "a" : "span", {
  href: url,
  target: "_blank",
  rel: "noreferrer",
  class: "vp-contributor"
}, [
  avatar ? h("img", { src: avatar, alt: name, class: "vp-contributor-avatar" }) : null,
  h("span", { class: "vp-contributor-name" }, name)
]);
var GitContributors = defineComponent({
  name: "GitContributors",
  props: {
    /** Contributor title */
    title: String,
    /** header level of contributor title */
    headerLevel: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const contributors = useContributors();
    const locale = useGitLocaleConfig();
    return () => contributors.value.length ? [
      h(VPHeader, {
        level: props.headerLevel,
        anchor: "doc-contributors",
        text: props.title || locale.value.contributors
      }),
      h("div", { class: "vp-contributors" }, contributors.value.map((item) => h(GitContributor, item)))
    ] : null;
  }
});

// node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js
import "E:/my-project/node_modules/@vuepress/plugin-git/lib/client/styles/vars.css";
import "E:/my-project/node_modules/@vuepress/plugin-git/lib/client/styles/changelog.css";
var GitChangelog = defineComponent({
  name: "GitChangelog",
  props: {
    /** Title of changelog */
    title: String,
    /** header level of changelog */
    headerLevel: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const changelog = useChangelog();
    const locale = useGitLocaleConfig();
    const lastUpdated = useLastUpdated();
    const [active, toggleActive] = useToggle();
    const ChangelogHeader = () => h("div", { class: "vp-changelog-header", onClick: () => toggleActive() }, [
      h("div", { class: "vp-latest-updated" }, [
        h("span", { class: "vp-changelog-icon" }),
        h("span", { "data-allow-mismatch": "" }, lastUpdated.value.text)
      ]),
      h("div", [
        h("span", { class: "vp-changelog-menu-icon" }),
        h("span", locale.value.viewChangelog)
      ])
    ]);
    const ReleaseTag = ({ item }) => h("li", { class: "vp-changelog-item-tag" }, h("div", [
      h("a", { class: "vp-changelog-tag" }, h("code", item.tag)),
      h("span", { "class": "vp-changelog-date", "data-allow-mismatch": "" }, [
        locale.value.timeOn,
        " ",
        h("time", { datetime: new Date(item.time).toISOString() }, item.date)
      ])
    ]));
    const Commit = ({ item }) => h("li", { class: "vp-changelog-item-commit" }, [
      h(item.commitUrl ? "a" : "span", {
        class: "vp-changelog-hash",
        href: item.commitUrl,
        target: "_blank",
        rel: "noreferrer"
      }, [h("code", item.hash.slice(0, 5))]),
      h("span", { class: "vp-changelog-divider" }, "-"),
      h("span", { class: "vp-changelog-message", innerHTML: item.message }),
      h("span", { "class": "vp-changelog-date", "data-allow-mismatch": "" }, [
        locale.value.timeOn || "on",
        " ",
        h("time", { datetime: new Date(item.time).toISOString() }, item.date)
      ])
    ]);
    return () => changelog.value.length ? [
      h(VPHeader, {
        level: props.headerLevel,
        anchor: "doc-changelog",
        text: props.title || locale.value.changelog
      }),
      h("div", { class: ["vp-changelog-wrapper", { active: active.value }] }, [
        h(ChangelogHeader),
        h("ul", { class: "vp-changelog-list" }, [
          changelog.value.map((item) => item.tag ? h(ReleaseTag, { item, key: item.tag }) : h(Commit, { item, key: item.hash }))
        ])
      ])
    ] : null;
  }
});
export {
  GitChangelog,
  GitContributor,
  GitContributors,
  VPHeader,
  locales,
  useChangelog,
  useContributors,
  useGitLocaleConfig,
  useLastUpdated
};
//# sourceMappingURL=@vuepress_plugin-git_client.js.map
