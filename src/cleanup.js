import utf8 from "utf8"

function convertCommaToNumber(price) {
    try {
        let utfString = utf8.decode(price.toString().trim())
        utfString = utfString.trim()
        let num = parseFloat(utfString.replace(/,/g, ''))
        return num;
    }
    catch {
        return parseFloat(price.toString().trim().replace(/,/g, '').substring(1))
    }
}
// console.log(convertCommaToNumber(7215))

export default convertCommaToNumber


function removeRs(price){
    let ret = price.replace('Rs.', '')
    return convertCommaToNumber(ret)
}

console.log(removeRs("Rs.Â 3,665"))