/*
 * カードショップ雷雷：店舗の表示設定
 * このファイルだけ直せば、申込フォーム・お客様ページ・POSの明細書（印刷）すべてに反映されます。
 *
 * 古物営業法に基づき、ネットで取引を受け付けるページには次の3つの表示が必要です。
 *   licenseHolder     … 許可証に記載の「氏名または名称」（個人名・会社名）
 *   licenseCommission … 許可をした公安委員会（例：東京都公安委員会）
 *   licenseNumber     … 許可証の番号（例：第123456789012号）
 */
window.SHOP_CONFIG = {
  shopName: "カードショップ雷雷",
  licenseHolder: "",
  licenseCommission: "",
  licenseNumber: ""
};

(function () {
  function escapeText(value) {
    return String(value || "").replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
    });
  }

  function legalText() {
    var config = window.SHOP_CONFIG || {};
    var ready = config.licenseHolder && config.licenseCommission && config.licenseNumber;
    if (!ready) {
      if (window.console) console.warn("rairai-config.js：古物商の表示（licenseHolder / licenseCommission / licenseNumber）が未設定です。");
      // 未設定の間は店名だけ表示します（許可番号が決まったら上の3項目を入れてください）
      return {
        block: '<div><strong>' + escapeText(config.shopName) + '</strong></div>',
        inline: escapeText(config.shopName)
      };
    }
    var holder = config.licenseHolder === config.shopName
      ? escapeText(config.shopName)
      : escapeText(config.shopName) + '（' + escapeText(config.licenseHolder) + '）';
    var license = '古物商許可：' + escapeText(config.licenseCommission) + ' ' + escapeText(config.licenseNumber);
    return {
      block: '<div><strong>' + holder + '</strong></div><div>' + license + '</div>',
      inline: holder + '　' + license
    };
  }

  function render() {
    var text = legalText();
    document.querySelectorAll("[data-shop-legal]").forEach(function (element) { element.innerHTML = text.block; });
    document.querySelectorAll("[data-shop-legal-inline]").forEach(function (element) { element.innerHTML = text.inline; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
