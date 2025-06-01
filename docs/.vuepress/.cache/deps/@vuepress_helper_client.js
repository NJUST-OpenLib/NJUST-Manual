import {
  strFromU8,
  strToU8,
  unzlibSync,
  zlibSync
} from "./chunk-U6ZKZ7PY.js";
import {
  camelize,
  capitalize,
  computed,
  getCurrentInstance,
  getCurrentScope,
  h,
  onMounted,
  onScopeDispose,
  readonly,
  ref,
  shallowRef,
  toValue,
  unref,
  watch
} from "./chunk-LW4I4DCF.js";

// node_modules/@vuepress/helper/lib/client/components/LoadingIcon.js
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

// node_modules/@vuepress/helper/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize2 = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function identity(arg) {
  return arg;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}

// node_modules/@vuepress/helper/node_modules/@vueuse/core/index.mjs
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/@vuepress/helper/lib/client/utils/data.js
var encodeData = (data, level = 6) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level });
  const binary = strFromU8(zipped, true);
  return __VUEPRESS_SSR__ ? Buffer.from(binary, "binary").toString("base64") : btoa(binary);
};
var decodeData = (base64) => {
  const binary = __VUEPRESS_SSR__ ? Buffer.from(base64, "base64").toString("binary") : atob(base64);
  return strFromU8(unzlibSync(strToU8(binary, true)));
};

// node_modules/@vuepress/helper/lib/client/utils/env.js
var checkIsMobile = (ua) => /\b(?:Android|iPhone)/i.test(ua);
var checkIsChromeWebView = (ua) => / wv\).+(chrome)\/([\w.]+)/i.test(ua);
var checkIsSafariMobile = (ua) => /version\/([\w.]+) .*mobile\/\w+ (safari)/i.test(ua);
var checkIsSafari = (ua) => /version\/([\w.]+) .*(mobile ?safari|safari)/i.test(ua);
var checkIsiPhone = (ua) => /\((ip(?:hone|od)[\w ]*);/i.test(ua);
var checkIsiPad = (ua) => [
  /\((ipad);[-\w),; ]+apple/i,
  /applecoremedia\/[\w.]+ \((ipad)/i,
  /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
].some((item) => item.test(ua));
var checkIsWindows = (ua) => [
  /microsoft (windows) (vista|xp)/i,
  /(win(?=3|9|n)|win 9x )([nt\d.]+)/i,
  /(windows) nt 6\.2; (arm)/i,
  /(windows (?:phone(?: os)?|mobile))[/ ]?([\d.\w ]*)/i,
  /(windows)[/ ]?([ntce\d. ]+\w)(?!.+xbox)/i
].some((item) => item.test(ua));
var checkIsIOS = (ua) => [
  /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
  /cfnetwork\/.+darwin/i
].some((item) => item.test(ua));
var checkIsMacOS = (ua) => [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i].some((item) => item.test(ua));

// node_modules/@vuepress/helper/lib/client/utils/getDarkMode.js
var getDarkMode = () => document.documentElement.getAttribute("data-theme") === "dark";

// node_modules/@vuepress/helper/lib/client/utils/getHeaders.js
var DEFAULT_HEADER_SELECTOR = [...new Array(6)].map((_, i) => `[vp-content] h${i + 1}`).join(",");
var resolveHeaders = (headers, levels = 2) => {
  if (levels === false) {
    return [];
  }
  const [high, low] = typeof levels === "number" ? [levels, levels] : levels === "deep" ? [2, 6] : levels;
  const allowedHeaders = headers.filter((header) => header.level >= high && header.level <= low);
  const result = [];
  outer: for (let i = 0; i < allowedHeaders.length; i++) {
    const current = allowedHeaders[i];
    if (i === 0) {
      result.push(current);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = allowedHeaders[j];
        if (prev.level < current.level) {
          prev.children.push(current);
          continue outer;
        }
      }
      result.push(current);
    }
  }
  return result;
};
var serializeHeader = (h2, ignore = []) => {
  let text;
  if (ignore.length) {
    const clone = h2.cloneNode(true);
    clone.querySelectorAll(ignore.join(",")).forEach((el) => {
      el.remove();
    });
    text = clone.textContent || "";
  } else {
    text = h2.textContent || "";
  }
  return text.trim();
};
var getHeadersFromDom = (selector = DEFAULT_HEADER_SELECTOR, ignore = []) => Array.from(document.querySelectorAll(selector)).filter((el) => el.id && el.hasChildNodes()).map((el) => ({
  element: el,
  title: serializeHeader(el, ignore),
  link: `#${el.id}`,
  slug: el.id,
  level: Number(el.tagName[1]),
  children: []
}));
var getHeaders = ({ selector = DEFAULT_HEADER_SELECTOR, levels = 2, ignore = [] } = {}) => resolveHeaders(getHeadersFromDom(selector, ignore), levels);

// node_modules/@vuepress/helper/lib/client/utils/isFocusingTextControl.js
var isFocusingTextControl = (target) => {
  if (!(target instanceof Element)) {
    return false;
  }
  return document.activeElement === target && (["TEXTAREA", "SELECT", "INPUT"].includes(target.tagName) || target.hasAttribute("contenteditable"));
};

// node_modules/@vuepress/helper/lib/client/utils/isKeyMatched.js
import { isString } from "vuepress/shared";
var isKeyMatched = (event, hotKeys) => hotKeys.some((item) => {
  if (isString(item))
    return item === event.key;
  const { key, ctrl = false, shift = false, alt = false } = item;
  return key === event.key && ctrl === event.ctrlKey && shift === event.shiftKey && alt === event.altKey;
});

// node_modules/@vuepress/helper/lib/client/utils/hasGlobalComponent.js
var hasGlobalComponent = (name, app) => {
  var _a;
  const globalComponents = (_a = (app == null ? void 0 : app._instance) ?? getCurrentInstance()) == null ? void 0 : _a.appContext.components;
  if (!globalComponents)
    return false;
  return name in globalComponents || camelize(name) in globalComponents || capitalize(camelize(name)) in globalComponents;
};

// node_modules/@vuepress/helper/lib/client/utils/wait.js
var wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

// node_modules/@vuepress/helper/lib/client/composables/useDarkMode.js
var darkmode = null;
var _useDarkMode = () => {
  const isDarkMode = ref(false);
  onMounted(() => {
    isDarkMode.value = getDarkMode();
    useMutationObserver(document.documentElement, () => {
      isDarkMode.value = getDarkMode();
    }, {
      attributeFilter: ["data-theme"],
      attributes: true
    });
  });
  return readonly(isDarkMode);
};
var useDarkMode = () => darkmode ?? (darkmode = _useDarkMode());

// node_modules/@vuepress/helper/lib/client/composables/useHeaders.js
import { onContentUpdated } from "vuepress/client";
var useHeaders = (options = {}) => {
  const headersRef = ref([]);
  onContentUpdated((reason) => {
    headersRef.value = reason === "beforeUnmount" ? [] : getHeaders(toValue(options));
  });
  return headersRef;
};

// node_modules/@vuepress/helper/lib/client/composables/useLocaleConfig.js
import { useRouteLocale } from "vuepress/client";
var useLocaleConfig = (localesConfig) => {
  const routeLocale = useRouteLocale();
  return computed(() => toValue(localesConfig)[routeLocale.value] ?? {});
};

// node_modules/@vuepress/helper/lib/client/composables/useKeys.js
var useKeys = (hotKeys, action) => {
  const onKeydown = (event) => {
    const hotKeysValue = toValue(hotKeys);
    if (hotKeysValue == null ? void 0 : hotKeysValue.length) {
      if (
        // key matches
        isKeyMatched(event, hotKeysValue) && // event does not come from the search box itself or
        // user isn't focusing (and thus perhaps typing in) a text control
        !isFocusingTextControl(event.target)
      ) {
        event.preventDefault();
        void action();
      }
    }
  };
  useEventListener("keydown", onKeydown);
};

// node_modules/@vuepress/helper/lib/client/composables/useRoutePaths.js
import { useRoutes } from "vuepress/client";
var useRoutePaths = () => {
  const routes = useRoutes();
  return computed(() => Object.keys(routes.value));
};

// node_modules/@vuepress/helper/lib/shared/helper.js
import { isString as isString2 } from "vuepress/shared";
import { isFunction, isString as isString3, isPlainObject } from "vuepress/shared";
import { ensureEndingSlash, ensureLeadingSlash, removeEndingSlash, removeLeadingSlash } from "vuepress/shared";
var isDef2 = (val) => typeof val !== "undefined";
var isBoolean = (val) => typeof val === "boolean";
var isNumber = (val) => typeof val === "number";
var { isArray } = Array;
var isRegExp = (val) => val instanceof RegExp;
var startsWith = (str, prefix) => isString2(str) && str.startsWith(prefix);
var endsWith = (str, suffix) => isString2(str) && str.endsWith(suffix);
var { entries } = Object;
var { fromEntries } = Object;
var { keys: keys2 } = Object;
var { values } = Object;

// node_modules/@vuepress/helper/lib/shared/deepAssign.js
var deepAssign = (originObject, ...overrideObjects) => {
  if (overrideObjects.length === 0)
    return originObject;
  const assignObject = overrideObjects.shift();
  if (assignObject)
    entries(assignObject).forEach(([property, value]) => {
      if (property === "__proto__" || property === "constructor")
        return;
      if (isPlainObject(originObject[property]) && isPlainObject(value))
        deepAssign(originObject[property], value);
      else if (isArray(value))
        originObject[property] = [...value];
      else if (isPlainObject(value))
        originObject[property] = {
          ...value
        };
      else
        originObject[property] = assignObject[property];
    });
  return deepAssign(originObject, ...overrideObjects);
};

// node_modules/@vuepress/helper/lib/shared/date.js
var getDate = (input) => {
  if (input) {
    if (typeof input === "number")
      return new Date(input);
    const date = Date.parse(input.toString());
    if (!Number.isNaN(date))
      return new Date(date);
  }
  return null;
};
var dateSorter = (valueA, valueB) => {
  const dateA = getDate(typeof valueA === "number" ? new Date(valueA) : valueA);
  const dateB = getDate(typeof valueB === "number" ? new Date(valueB) : valueB);
  if (!dateA)
    return dateB ? 1 : 0;
  if (!dateB)
    return -1;
  return dateB.getTime() - dateA.getTime();
};

// node_modules/@vuepress/helper/lib/shared/link.js
import { isLinkExternal, isLinkWithProtocol } from "vuepress/shared";
import { isLinkExternal as isLinkExternal2, isLinkHttp, isLinkWithProtocol as isLinkWithProtocol2 } from "vuepress/shared";
var isLinkAbsolute = (test) => startsWith(test, "/") && test[1] !== "/";
var isLinkRelative = (link) => !isLinkExternal(link) && !isLinkWithProtocol(link);
export {
  LoadingIcon,
  checkIsChromeWebView,
  checkIsIOS,
  checkIsMacOS,
  checkIsMobile,
  checkIsSafari,
  checkIsSafariMobile,
  checkIsWindows,
  checkIsiPad,
  checkIsiPhone,
  dateSorter,
  decodeData,
  deepAssign,
  encodeData,
  endsWith,
  ensureEndingSlash,
  ensureLeadingSlash,
  entries,
  fromEntries,
  getDarkMode,
  getDate,
  getHeaders,
  getHeadersFromDom,
  hasGlobalComponent,
  isArray,
  isBoolean,
  isDef2 as isDef,
  isFocusingTextControl,
  isFunction,
  isKeyMatched,
  isLinkAbsolute,
  isLinkExternal2 as isLinkExternal,
  isLinkHttp,
  isLinkRelative,
  isLinkWithProtocol2 as isLinkWithProtocol,
  isNumber,
  isPlainObject,
  isRegExp,
  isString3 as isString,
  keys2 as keys,
  removeEndingSlash,
  removeLeadingSlash,
  resolveHeaders,
  startsWith,
  useDarkMode,
  useHeaders,
  useKeys,
  useLocaleConfig,
  useRoutePaths,
  values,
  wait
};
//# sourceMappingURL=@vuepress_helper_client.js.map
