export default class Device {
  public static isMobile() {
    return /iPad|iPhone|iPod|Android|Windows Phone/i.test(navigator.userAgent);
  }

  public static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  public static isAndroid() {
    return /Android/.test(navigator.userAgent);
  }
}
