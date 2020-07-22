
export const timeToString = (time, includeCents) => {

    let remainingTime = time
    includeCents = includeCents || false

    let displayText = ""

    let hours = Math.trunc(remainingTime/3600)
    let hoursString =  hours < 10 ? "0"+hours : hours
    remainingTime = remainingTime - hours*3600
    if (hours > 0) {
        displayText += hoursString+":"
    }

    let minutes = Math.trunc(remainingTime/60)
    let minString =  minutes < 10 ? "0"+minutes : minutes
    remainingTime = remainingTime - minutes*60
    displayText += minString+":"

    let seconds = Math.trunc(remainingTime)
    let secString =  seconds < 10 ? "0"+seconds : seconds
    remainingTime = remainingTime - seconds
    displayText += secString

    if (includeCents) {
        let cents = Math.trunc(remainingTime*100)
        let centsString =  cents < 10 ? "0"+cents : cents
        displayText += '"'+centsString
    }

    return displayText
}