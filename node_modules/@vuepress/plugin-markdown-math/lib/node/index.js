import{loadMhchem as f,katex as k}from"@mdit/plugin-katex-slim";import{createMathjaxInstance as $,mathjax as g}from"@mdit/plugin-mathjax-slim";import{ensureEndingSlash as y,Logger as w,getModulePath as M,isModuleAvailable as d,addCustomElement as v}from"@vuepress/helper";import{path as C,getDirname as E,logger as p,colors as u}from"vuepress/utils";const F=import.meta.dirname||E(import.meta.url),h=y(C.resolve(F,"../client")),c="@vuepress/plugin-markdown-math";new w(c);const I=async(t,n,s)=>{let o="";return n==="katex"?o+=`import "${M("katex/dist/katex.min.css",import.meta)}";
import "${h}styles/katex.css";
${s.copy?`import { useKatexCopy } from "${h}composables/useKatexCopy.js";

export default {
  setup: () => {
    useKatexCopy();
  }
};
`:""}`:o+=`import './mathjax.css';
`,t.writeTemp("markdown-math/config.js",o)},L=`mjx-container {
  overflow: auto hidden;
}
`,P=async(t,n)=>{await t.writeTemp("markdown-math/mathjax.css",`${n.outputStyle()}
${L}`)},b=({type:t,...n}={})=>{const s=d("mathjax-full",import.meta),o=d("katex",import.meta),r=t==="katex"&&o?"katex":t==="mathjax"&&s||s?"mathjax":o?"katex":null;if(!r||t&&r!==t){const e={katex:"katex",mathjax:"mathjax-full"};return p.error(r?`type is "${t}", but "${e[t]}" is not installed`:"No math renderer found, please install mathjax-full or katex"),{name:c}}let i=r==="mathjax"?$({...n,transformer:e=>e.replace(/^<mjx-container/,"<mjx-container v-pre")}):null;return{name:c,extendsBundlerOptions:(e,a)=>{r==="mathjax"&&v(e,a,/^mjx-/)},extendsMarkdown:async e=>{r==="mathjax"?(e.use(g,i),e.use(a=>{const x=a.render.bind(a);a.render=(l,m)=>{const j=x(l,m);return i?.reset(),j}})):(n.mhchem&&await f(),e.use(k,{logger:(a,x,l,{filePathRelative:m})=>{a!=="newLineInDisplayMode"&&(a==="unicodeTextInMathMode"?p.warn(`Found unicode character ${l.text} inside tex${m?` in ${u.cyan(m)}`:""}. You should use ${u.magenta(`\\text{${l.text}}`)}`):p.warn(`${x}.${m?`
Found in ${u.cyan(m)}`:""}`))},...n,transformer:a=>a.replace(/^(<[a-z]+ )/g,"$1v-pre ")}))},onPrepared:async e=>{r==="mathjax"&&(await P(e,i),e.env.isBuild&&(i=null))},clientConfigFile:e=>I(e,r,n)}};export{b as markdownMathPlugin};
//# sourceMappingURL=index.js.map
