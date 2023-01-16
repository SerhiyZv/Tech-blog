const form = document.querySelector("form");
const inputFields = document.querySelectorAll("input");
const textAreas = document.querySelectorAll("textarea");
const submitButton = document.querySelector(".submit-button");

const validate = () => {
    let inputArray = [];

    // Check if form has text
    textAreas.length > 0 ? 
        // Marge text and regular inputs into one array
        inputArray = [...inputFields, ...textAreas]:
        inputArray = [...inputFields];

    // Filter out inputs that have content
    const filteredArray = inputArray.filter(field => field.value.trim().length > 0)

    // Check if the number of fields with content in the filtered array matches the total number of fields, and enable the submit button
    filteredArray.length === inputArray.length ? 
        submitButton.removeAttribute("disabled") :
        // In other cases, keep it disabled
        submitButton.setAttribute("disabled", "");
}

form.addEventListener("input", validate);