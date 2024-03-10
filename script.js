const inputBill = document.querySelector(".input-bill");
const optionButtons = document.querySelectorAll(".option-btn");
const inputPeopleNumber = document.querySelector(".input-people-number");
const inputCustomTip = document.querySelector(".input-custom-tip")
const errorInfo = document.querySelector(".error");
const tipPerPerson = document.querySelector(".tip-amount-value");
const tipTotalPerPerson = document.querySelector(".tip-total-value");
const resetButton = document.querySelector(".reset-btn");

function areValuesValid(){
    tipPerPerson.classList.add("opacity-transition");
    tipTotalPerPerson.classList.add("opacity-transition");

    if(inputPeopleNumber.value === "0"){
        errorInfo.style.opacity = "1";
        errorInfo.innerHTML = `Can't be zero`
        return;
    }

    return (inputBill.value !== "" && inputPeopleNumber.value !== "") ? true : false;
}

function showResults(tip, tipTotal) {
    tipPerPerson.style.opacity = "1";
    tipTotalPerPerson.style.opacity = "1";
    tipPerPerson.innerHTML = `$${tip}`;
    tipTotalPerPerson.innerHTML = `$${tipTotal}`;
};

function calculateTip(selectedPercentage){
    let selectedPercentageString = String(selectedPercentage);
    let trimmedPercentage = selectedPercentageString.slice(0, -1) / 100;
    let finalPercentage = parseFloat(trimmedPercentage);

    let resultTipPerPerson = (inputBill.value * finalPercentage) / inputPeopleNumber.value;
    let resultTipTotalPerPerson = (inputBill.value * finalPercentage / inputPeopleNumber.value) + (inputBill.value / inputPeopleNumber.value);

    showResults(resultTipPerPerson, resultTipTotalPerPerson);
};

function calculateCustomTip(percentage){
    let finalPercentage = percentage / 100;
    let resultTipPerPerson = (inputBill.value * finalPercentage) / inputPeopleNumber.value;
    let resultTipTotalPerPerson = (inputBill.value * finalPercentage / inputPeopleNumber.value) + (inputBill.value / inputPeopleNumber.value);

    showResults(resultTipPerPerson, resultTipTotalPerPerson);
};


function resetValues(){
    inputBill.value = "";
    inputPeopleNumber.value = "";
    inputCustomTip.value = "";
    tipPerPerson.textContent = "";
    tipTotalPerPerson.textContent = "";
};

optionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        let result = areValuesValid();

        if(result){
            resetButton.classList.remove("disabled")
            calculateTip(button.textContent);
        }
        else if(!result){
            resetButton.classList.add("disabled")
            return;
        }
    });
});

resetButton.addEventListener("click", resetValues);

inputCustomTip.addEventListener('input', function(e){

    let userTipValue = e.target.value;
    let result = areValuesValid();

    if(result){
        resetButton.classList.remove("default-btn")
        calculateCustomTip(userTipValue)
    }
    else if(!result){
        resetButton.classList.add("default-btn")
        return;
    }
});
