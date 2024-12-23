
const unitConversions = {
    length: {
        units: {
            meters: 1,
            kilometers: 0.001,
            feet: 3.28084,
            inches: 39.3701
        }
    },
    weight: {
        units: {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274
        }
    },
    temperature: {
        units: {
            celsius: "celsius",
            fahrenheit: "fahrenheit",
            kelvin: "kelvin"
        }
    },
    time: {
        units: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400
        }
    },
    currency: {
        units: {
            USD: 1,
            EUR: 0.85,
            GBP: 0.75,
            INR: 74,
            JPY: 110
        }
    }
};


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

if (category) {
    document.getElementById("pageTitle").textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Converter`;
    populateUnits(category);
}


function populateUnits(category) {
    const inputUnitSelect = document.getElementById("inputUnit");
    const outputUnitSelect = document.getElementById("outputUnit");

    const units = unitConversions[category].units;

    for (const unit in units) {
        inputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
}


function convertUnits() {
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const inputUnit = document.getElementById("inputUnit").value;
    const outputUnit = document.getElementById("outputUnit").value;

    if (isNaN(inputValue)) {
        alert("Please enter a valid number!");
        return;
    }

    const inputFactor = unitConversions[category].units[inputUnit];
    const outputFactor = unitConversions[category].units[outputUnit];
    const result = (category === "temperature") 
        ? convertTemperature(inputValue, inputUnit, outputUnit)
        : (inputValue * inputFactor) / outputFactor;

    document.getElementById("result").textContent = `Result: ${result.toFixed(2)} ${outputUnit}`;
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === "celsius" && toUnit === "fahrenheit") return (value * 9) / 5 + 32;
    if (fromUnit === "fahrenheit" && toUnit === "celsius") return ((value - 32) * 5) / 9;
    if (fromUnit === "celsius" && toUnit === "kelvin") return value + 273.15;
    if (fromUnit === "kelvin" && toUnit === "celsius") return value - 273.15;
    if (fromUnit === "fahrenheit" && toUnit === "kelvin") return ((value - 32) * 5) / 9 + 273.15;
    if (fromUnit === "kelvin" && toUnit === "fahrenheit") return ((value - 273.15) * 9) / 5 + 32;
    return value;
}


document.getElementById("convertBtn").addEventListener("click", convertUnits);
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "index.html";
});
