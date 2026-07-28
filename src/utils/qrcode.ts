/**
 * @file utils/qrcode.ts
 * @description 二维码生成工具（用于生成手机扫码预览 DataURL）
 */

import QRCode from 'qrcode';

export class QRCodeUtil {
  /**
   * 将 URL 生成为 Base64 DataURL 图片
   */
  public static async generateDataUrl(url: string): Promise<string> {
    try {
      return await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'M',
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        width: 250,
      });
    } catch (e) {
      console.error('生成二维码失败:', e);
      return '';
    }
  }
}
