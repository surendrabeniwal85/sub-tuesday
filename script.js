
function printTable() {
    const number = document.getElementById("number").value;
    const result = document.getElementById("result");

    if (
        number.trim() === "" ||
        !Number.isInteger(Number(number)) ||
        Number(number) < 2
    ) {
        result.innerHTML =
            "<p>Please enter an integer greater than or equal to 2.</p>";
        return;
    }

    let output = "";

    // Generate tables from 2 to the entered number
    for (let i = 2; i <= Number(number); i++) {
        output += `<div class="table-box">`;
        output += `<h3>Table of ${i}</h3>`;

        // Print multiples from 1 to 10
        for (let j = 1; j <= 10; j++) {
            output += `<p>${i} × ${j} = ${i * j}</p>`;
        }

        output += `</div>`;
    }

    result.innerHTML = output;
}


