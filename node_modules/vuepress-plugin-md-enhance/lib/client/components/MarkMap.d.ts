import * as vue from 'vue';
import { VNode } from 'vue';

declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
    /**
     * Chart id
     *
     * 图表 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markmap content
     *
     * Markmap
     */
    content: {
        type: StringConstructor;
        required: true;
    };
}>, () => VNode, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Chart id
     *
     * 图表 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markmap content
     *
     * Markmap
     */
    content: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

export { _default as default };
