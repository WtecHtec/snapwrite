/**
 * @file utils/spring.ts
 * @description Apple 物理动画弹簧配置（参照 Apple WWDC 设计规范: Damping 1.0/0.8, Response 0.3-0.4）
 */

export const AppleSpringPresets = {
  // 默认 UI 元素动画（无回弹，平滑过沉）
  defaultUI: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 200,
    mass: 1,
  },

  // 弹窗与手势拖拽动画（轻微物理弹性，增强运动感）
  sheetModal: {
    type: 'spring' as const,
    damping: 18,
    stiffness: 220,
    mass: 0.8,
  },

  // 即时响应微反馈 (Button Active Press)
  buttonPress: {
    scale: 0.97,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 400,
    },
  },
};
