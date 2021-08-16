import { renderZjhDotIm } from "@bbbottle/zjh.im";

try {
  renderZjhDotIm(document.getElementById("gui"));
} catch (e) {
  window.location.reload();
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.userChoice.then((result) => {
    console.log("👍", "userChoice", result);
  });
});
