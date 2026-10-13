
const form = document.getElementById("tableForm");
const startInput = document.getElementById("startNumber");
const endInput = document.getElementById("endNumber");
const limitInput = document.getElementById("limit");
const result = document.getElementById("result");
const statusText = document.getElementById("status");
const copyBtn = document.getElementById("copyBtn");
const printBtn = document.getElementById("printBtn");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

let plainTextResult = "";
let toastTimeout;

const colors = [
    "#6558e8",
    "#e65f8e",
    "#159b85",
    "#e99a32",
    "#3985db",
    "#9858e9",
    "#d94f43",
    "#399e62"
];

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function generateTables(event) {
    if (event) {
        event.preventDefault();
    }

    const start = Number(startInput.value);
    const end = Number(endInput.value);
    const limit = Number(limitInput.value);

    if (
        startInput.value.trim() === "" ||
        endInput.value.trim() === "" ||
        limitInput.value.trim() === "" ||
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        !Number.isInteger(limit) ||
        start < 0 || end < 0 ||
        start > 100 || end > 100 ||
        limit < 1 || limit > 100
    ) {
        showToast("Enter valid whole numbers within the allowed range.");
        return;
    }

    if (start > end) {
        showToast("Start table must be less than or equal to end table.");
        return;
    }

    // Prevent the page from generating too many cards.
    if (end - start + 1 > 50) {
        showToast("Please select a maximum of 50 tables at a time.");
        return;
    }

    let html = "";
    let textOutput = "";

    for (let i = start; i <= end; i++) {
        const color = colors[(i - start) % colors.length];

        html += `
            <article class="table-card"
                style="--card-color: ${color}">
                <div class="card-heading">
                    <h3>Table of ${i}</h3>
                </div>
                <div class="equations">
        `;

        textOutput += `TABLE OF ${i}\n`;
        textOutput += "------------------\n";

        for (let j = 1; j <= limit; j++) {
            const answer = i * j;

            html += `
                <div class="equation">
                    <span>${i} × ${j}</span>
                    <span class="answer">${answer}</span>
                </div>
            `;

            textOutput += `${i} x ${j} = ${answer}\n`;
        }

        html += `
                </div>
            </article>
        `;

        textOutput += "\n";
    }

    result.innerHTML = html;
    plainTextResult = textOutput.trim();

    statusText.textContent =
        `Showing ${end - start + 1} tables, from ${start} to ${end}, ` +
        `with ${limit} multiples each.`;

    showToast("Your multiplication tables are ready!");
}

form.addEventListener("submit", generateTables);

// Quick-select buttons update the end number.
document.querySelectorAll(".quick-btn").forEach(button => {
    button.addEventListener("click", () => {
        startInput.value = 1;
        endInput.value = button.dataset.end;
        generateTables();
    });
});

// Copy all generated tables as plain text.
copyBtn.addEventListener("click", async () => {
    if (!plainTextResult) {
        showToast("Generate tables before copying.");
        return;
    }

    try {
        await navigator.clipboard.writeText(plainTextResult);
        showToast("Tables copied to clipboard!");
    } catch (error) {
        // Fallback for browsers that block clipboard access.
        const textarea = document.createElement("textarea");
        textarea.value = plainTextResult;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");
        textarea.remove();

        showToast(
            copied
                ? "Tables copied to clipboard!"
                : "Copy was blocked by your browser."
        );
    }
});

// Open the browser's print dialog.
printBtn.addEventListener("click", () => {
    if (!plainTextResult) {
        showToast("Generate tables before printing.");
        return;
    }

    window.print();
});

// Toggle dark and light themes.
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
});

// Generate the default tables when the page opens.
generateTables();



