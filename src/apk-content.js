/**
 * Calculate the APK value
 * @param {number} price The price of the item
 * @param {number} alcoholPercentage The alcohol percentage of the item
 * @param {number} volume The volume of the item, in ml
 * @returns The APK value
 */
const calculateAPK = (price, alcoholPercentage, volume) => {
	const volumePercentage = alcoholPercentage / 100;

	return volume * volumePercentage / price
}



const makeAPK = () => {
	const parser = new DOMParser();

	fetch(window.location.toString()).then(r => r.text()).then(content => {
		const doc = parser.parseFromString(content, "text/html")

		const detailPageContainer = doc.querySelector("#mainContent > div:nth-child(3)")

		const productDetails = JSON.parse(detailPageContainer.dataset.props)

		const { priceInclVat, alcoholPercentage, volume } = productDetails.product

		const apk = calculateAPK(priceInclVat, alcoholPercentage, volume)

		const percentageDisplayEval = document.evaluate("//div[text() = 'Alkoholhalt ']", document, null, XPathResult.ANY_TYPE, null)
		const percentageDisplay = percentageDisplayEval.iterateNext()

		const apkDisplay = percentageDisplay.cloneNode(true)
		apkDisplay.innerHTML = apkDisplay.innerHTML.replace("Alkoholhalt", "APK-Värde")

		apkDisplay.innerHTML = apkDisplay.innerHTML.replace(`${alcoholPercentage.toString().replace('.', ',')} %`, apk.toFixed(3))
		
		percentageDisplay.parentElement.appendChild(apkDisplay)

	})
}

makeAPK()