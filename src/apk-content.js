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

		const detailPageContainer = doc.querySelector("[data-react-component=ProductDetailPageContainer]")

		const productDetails = JSON.parse(detailPageContainer.dataset.props)

		const { priceInclVat, alcoholPercentage, volume } = productDetails.product

		const apk = calculateAPK(priceInclVat, alcoholPercentage, volume)

		const smallDetailDisplayEval = document.evaluate("/html/body/div[1]/div[2]/main/div[1]/div[1]/div/div[1]/div[3]/div[1]/div/div[1]/div[4]/div/p[2]", document, null, XPathResult.ANY_TYPE, null)

		const smallDetailDisplayNode = smallDetailDisplayEval.iterateNext()

		// const dotDisplayEval = document.evaluate("/html/body/div[1]/div[2]/main/div[1]/div[1]/div/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]/div[1]/p[2]", document, null, XPathResult.ANY_TYPE, null)
		// const textDisplayEval = document.evaluate("/html/body/div[1]/div[2]/main/div[1]/div[1]/div/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]/div[1]/p[3]", document, null, XPathResult.ANY_TYPE, null)

		// const dotDisplayNode = dotDisplayEval.iterateNext()
		// const textDisplayNode = textDisplayEval.iterateNext()

		// const dotDisplayClone = dotDisplayNode.cloneNode(true)

		// const apkDisplay = textDisplayNode.cloneNode(true)

		const apkDisplay = smallDetailDisplayNode.cloneNode(true)

		apkDisplay.innerHTML = `${apk.toFixed(3)} APK`

		// textDisplayNode.parentElement.appendChild(dotDisplayClone)
		smallDetailDisplayNode.parentElement.appendChild(apkDisplay)

	})

}

makeAPK()