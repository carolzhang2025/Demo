document.addEventListener("DOMContentLoaded", () => {
  const headerWrapper = document.querySelector(".header-wrapper");
  const dropdownMegaItems = document.querySelectorAll(".dropdown-mega");

  // --- Custom Menu Button JS ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const offcanvasElement = document.getElementById("offcanvasNavbar");

  if (mobileMenuBtn && offcanvasElement) {
    // 當 offcanvas 被開啟時，為按鈕添加 active 類別 (變成 X)
    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      mobileMenuBtn.classList.add("active");
    });
    // 當 offcanvas 被關閉時，移除按鈕的 active 類別 (變回漢堡)
    offcanvasElement.addEventListener("hide.bs.offcanvas", function () {
      mobileMenuBtn.classList.remove("active");
    });
  }
  // --- 結束 Custom Menu Button JS ---

  // --- 動態計算 Header 高度 ---
  const updateHeaderHeight = () => {
    if (headerWrapper) {
      const height = headerWrapper.offsetHeight;
      // 將高度寫入 CSS 變數
      document.documentElement.style.setProperty("--sw-header-height", `${height}px`);
    }
  };
  // 初始化與 Resize 時執行
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  // ---------------------------------
  if (window.innerWidth >= 992) {
    dropdownMegaItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        headerWrapper.classList.add("menu-active");
      });
      item.addEventListener("mouseleave", () => {
        setTimeout(() => {
          const anyHovering = Array.from(dropdownMegaItems).some((i) => i.matches(":hover"));
          if (!anyHovering) {
            headerWrapper.classList.remove("menu-active");
          }
        }, 100);
      });
    });
  }

  const offcanvasElementResize = document.getElementById("offcanvasNavbar");
  if (offcanvasElementResize) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElementResize);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        if (offcanvasElementResize.classList.contains("show")) {
          offcanvas.hide();
        }
      }
    });
  }
});
