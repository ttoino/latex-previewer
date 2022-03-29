const placeholder = "\\frac{a}{b} \\cdot c = x^2";

const input = document.querySelector("textarea");
const inline = document.querySelector("#inline input");
const type = document.querySelector("#type select");
const output = document.querySelector("output");
const md = document.querySelector("code");
const imgDark = document.querySelector("img.dark");
const imgLight = document.querySelector("img.light");
const baseURL = "https://render.githubusercontent.com/render/math";

input.placeholder = placeholder;

function latexChanged(event) {
    const params = new URLSearchParams({
        math: `{${inline.checked ? "" : "\\displaystyle"} ${
            input.value || placeholder
        }}`,
    });
    imgLight.src = `${baseURL}?${params}`;

    const paramsDark = new URLSearchParams({
        math: `{\\color{white} ${inline.checked ? "" : "\\displaystyle"} ${
            input.value || placeholder
        }}`,
    });
    imgDark.src = `${baseURL}?${paramsDark}`;

    md.innerHTML = `![](${baseURL}?${params}#gh-light-mode-only)<br>![](${baseURL}?${paramsDark}#gh-dark-mode-only)`;
}

function outputTypeChanged(event) {
    output.setAttribute("output-type", this.value);
}

input.addEventListener("input", latexChanged);
inline.addEventListener("input", latexChanged);
latexChanged.call(input);
type.addEventListener("input", outputTypeChanged);
outputTypeChanged.call(type);
