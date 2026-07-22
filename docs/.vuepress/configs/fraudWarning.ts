/**
 * 新生防诈骗首次访问警示弹窗配置
 *
 * 使用方法：
 * - 修改 enabled: false 即可完全关闭此功能
 * - 修改 expireDays 可调整再次显示的间隔天数
 * - 修改 storageKey 可自定义 localStorage 键名
 *
 * 修改提示内容请编辑 components/FraudWarningModal.vue
 */

export const fraudWarningConfig = {
  /** 是否启用防诈骗警示弹窗，设为 false 即可完全关闭 */
  enabled: true,

  /** localStorage 存储键名，用于记录用户确认状态 */
  storageKey: 'njust_fraud_warning_confirmed',

  /**
   * 有效期（天）
   * 用户确认后，在指定天数内再次访问不再显示弹窗
   * 设为 0 表示每次访问都显示（不推荐）
   */
  expireDays: 180,
}
