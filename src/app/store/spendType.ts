export default {
  isPublic: true, // デフォルト値：Private
  isShowFooter: true,
  publicTapNum: 0,
  privateTapNum: 1,

  /**
   * 支出タイプを「Public」にする
   */
  setPublicSpendType() {
    this.isPublic = true;
  },
  /**
   * 支出タイプを「Private」にする
   */
  setPrivateSpendType() {
    this.isPublic = false;
  },
  /**
   * Footerを表示する
   */
  setShowFooter() {
    this.isShowFooter = true;
  },
  /**
   * Footerを非表示にする
   */
  setHiddenFooter() {
    this.isShowFooter = false;
  }
};
