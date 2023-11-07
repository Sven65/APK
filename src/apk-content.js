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

const createElementFromHTML = (htmlString) => {
	const div = document.createElement('div')
	div.innerHTML = htmlString.trim();
  
	return div.firstChild
  }

const hasSizeSelector = () => {
	const sizeSelector = document.querySelector('.css-vmong3.e5tdxoe0')
	
	return !!sizeSelector
}

const getSizeDetails = () => {
	const wineSelector = document.querySelector('.css-vmong3.e5tdxoe0')
	const singleSize = document.querySelector('#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div.css-1f5wlkv.e18roaja0 > div.css-1yfm6cm.e18roaja0 > p:nth-child(3)')


	if (!!wineSelector) {
		return wineSelector.options[0].innerHTML
	}

	return singleSize.innerHTML
}

const getCostContainerPath = () => {
	return hasSizeSelector()
		? '#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div.css-1df247k.e18roaja0 > p'
		: '#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div.css-1df247k.e18roaja0 > p'
}


const getPercentageContainerPath = () => {
	return hasSizeSelector()
		? '#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div.css-1f5wlkv.e18roaja0 > div.css-1yfm6cm.e18roaja0 > p'
		: '#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div.css-1f5wlkv.e18roaja0 > div.css-1yfm6cm.e18roaja0 > p:nth-child(5)'
}

const getDetails = () => {
	const percentageContainer = document.querySelector(getPercentageContainerPath())
	const costContainer = document.querySelector(getCostContainerPath())

	const size = getSizeDetails()

	return {
		percentage: percentageContainer.innerHTML,
		cost: costContainer.innerHTML,
		size,
	}

	return deets
}

const normalizeUnits = (details) => {
	const sizeRegex = /(\d+) ml/g

	const matchedSize = details.size.match(sizeRegex)[0]

	const normalizedAlcoholPercentage = parseFloat(details.percentage.replace(/\s?%\svol./g, '').replace(/,/, '.'))
	const normalizedCost = parseFloat(details.cost.replace(/:/, '.'))
	const normalizedSize = parseInt(matchedSize.replace('ml', '').replace(/\s/g, ''))

	return {
		percentage: normalizedAlcoholPercentage,
		cost: normalizedCost,
		size: normalizedSize
	}
}

const insertAPKNode = (apk) => {
	const parentNode = document.querySelector('#__next > main > div.css-1c21j0p.e18roaja0 > div > div.css-h0miy6.e18roaja0 > div.css-tx0xzd.e17wolzc0 > div.css-1hho7ub.erf25qm0 > div > div.css-dahppd.e18roaja0 > div:nth-child(8)')

	const insertNode = `
		<div class="css-1v0ksmu e18roaja0">
			<p class="css-zehasz e1hb4h4s0">APK</p>
			<p class="css-zehasz e1hb4h4s0">${apk.toFixed(3)}</p>
		</div>
	`

	const elementAfter = parentNode.children[1]

	parentNode.insertBefore(createElementFromHTML(insertNode), elementAfter)

}

const makeAPK = () => {
	const details = normalizeUnits(getDetails())

	const apk = calculateAPK(details.cost, details.percentage, details.size)

	insertAPKNode(apk)
}

makeAPK()