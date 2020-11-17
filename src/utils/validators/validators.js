export const requiredField = (value) => {
    if (value) {
        return undefined;
    }
    return "Field is required!";

}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length < maxLength) {
        return undefined;
    }
    return `Max field length is ${maxLength} symbols`
}
