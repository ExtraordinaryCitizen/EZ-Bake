function confirmValue(element_id) {
    let element = document.getElementById(element_id);
    let min = Number(element.getAttribute("min"))
    let max = Number(element.getAttribute("max"))
    let val = element.value
    
    if (min > val || val > max) {
        alert(`Entered value must be between ${min} and ${max}`)
    }
}