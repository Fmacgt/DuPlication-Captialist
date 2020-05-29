
class TextFormatter
{
    static formatTimeString(seconds) {
        let wholeSeconds = Math.ceil(seconds);
        let s = wholeSeconds % 60;
        wholeSeconds = (wholeSeconds - s) / 60;
        let m = wholeSeconds % 60;
        let h = (wholeSeconds - m) / 60;

        let secondString = s < 10 ? "0" + s : s.toString();
        let minuteString = m < 10 ? "0" + m : m.toString();
        let hourString = h < 10 ? "0" + h : h.toString();

        return hourString + ":" + minuteString + ":" + secondString;
    }

    static formatWholeMoneyString(amount)
    {
        let remainingPart = amount % 1000;
        let outputString = remainingPart;
        while (amount >= 1000) {
            // handle cases when the remaining part is not big enough to fill all 3 digits
            let fillerZeros = "";
            if (remainingPart < 10) {
                fillerZeros = "00";
            } else if (remainingPart < 100) {
                fillerZeros = "0";
            }

            outputString = "," + fillerZeros + outputString;

            amount = Math.floor(amount / 1000);
            remainingPart = amount % 1000;

            outputString = remainingPart + outputString;
        }

        return outputString;
    }
}
