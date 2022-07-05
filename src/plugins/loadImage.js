export default {
  install(app) {
    // 비동기 처리
    app.config.globalProperties.$loadImage = (src) => {
      return new Promise((resolve) => {
        const img = document.createElement("img");
        img.src = src;
        img.addEventListener("load", () => {
          // 완료 처리
          resolve();
        });
      });
    };
  },
};
