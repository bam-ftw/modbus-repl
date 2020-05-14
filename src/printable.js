const {
	regToChars,
	regToStr10,
	regToStr16,
	regToHex,
	paddString,
} = require('./helpers')

class Printable {
	printPretty() {}
	printJson() {}
}

class PrintableRegisters extends Printable {
	/**
	 *
	 * @param {Array<Number>} regs
	 * @param {Number} addr
	 * @param {Number} cnt
	 */
	constructor(regs, addr, cnt) {
		super()
		this.regs = regs
		this.addr = addr
		this.cnt = cnt
	}

	printJson() {
		console.log(this.regs)
	}

	printPretty() {
		const addresses = new Array(this.cnt)
			.fill(0)
			.map((el, idx) => this.addr + idx)
			.map(el => paddString(el, 5, '0'))
		const values = this.regs.map(regToStr10)
		const hexes = this.regs.map(regToStr16).map(regToHex)
		const chars = this.regs.map(regToChars)

		for (let q = 0; q < this.cnt; ++q) {
			const addr = paddString(addresses[q], 5, ' ')
			const val = paddString(values[q], 5, ' ')
			const hex = hexes[q]
			const char = chars[q]
			console.log(`  ${addr} : ${val} | ${hex} | ${char}`)
		}
	}
}

class PrintableCoils extends Printable {
	/**
	 *
	 * @param {Array<Number>} coils
	 * @param {Number} addr
	 * @param {Number} cnt
	 */
	constructor(coils, addr, cnt) {
		super()
		this.coils = coils
		this.addr = addr
		this.cnt = cnt
	}

	printJson() {
		console.log(this.coils.slice(0, this.cnt))
	}

	printPretty() {
		const addresses = new Array(this.cnt)
			.fill(0)
			.map((el, idx) => this.addr + idx)
			.map(el => paddString(el, 5, '0'))

		const values = this.coils
			.map(el => el ? '1' : '0')
			.map(el => paddString(el, 5, ' '))

		for (let q = 0; q < this.cnt; ++q) {
			const addr = paddString(addresses[q], 5, ' ')
			const val = paddString(values[q], 5, ' ')
			console.log(`  ${addr} : ${val}`)
		}
	}
}

module.exports = {
	Printable,
	PrintableCoils,
	PrintableRegisters,
}
