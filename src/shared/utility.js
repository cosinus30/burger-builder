export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLenght) {
        isValid = value.length >= rules.minLenght && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLenght && isValid
    }

    return isValid;

}