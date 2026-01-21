// ※ここから先はAIさんとても助けていただいています。
/* ===== パスワード ===== */
const PASSWORD = "0025";
const ADMIN_PASSWORD = "admin";

const authBtn = document.getElementById("auth-btn");
const authInput = document.getElementById("password-input");
const authError = document.getElementById("auth-error");
const authScreen = document.getElementById("auth-screen");
const content = document.getElementById("protected-content");

content.style.display = "none";

authBtn.addEventListener("click", () => {
    if (authInput.value === PASSWORD) {
        authScreen.style.display = "none";
        content.style.display = "block";
    } else {
        authError.style.display = "block";
    }
});
