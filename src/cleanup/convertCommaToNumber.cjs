import utf8 from "utf8"

function convertCommaToNumber(price) {
    try {
        let utfString = utf8.decode(price.toString().trim())
        let num = parseFloat(utfString.replace(/,/g, ''))
        return num;
    }
    catch {
        return parseFloat(price.toString().trim().replace(/,/g, '').substring(1))
    }
}

export default convertCommaToNumber