const jsmodbus = require('jsmodbus')
const net = require('net')
const EventEmitter = require('events')

class TcpModbus extends EventEmitter {
	constructor(host, port) {
		super()

		this.host = host
		this.port = port
		this.socket = new net.Socket()
		this.client = new jsmodbus.client.TCP(this.socket)

		this.socket.on('connect', () => {
			this.emit('connect')
		})

		this.socket.on('error', err => {
			this.emit('error', err)
		})

		this._bindClientMethod('readCoils')
		this._bindClientMethod('writeMultipleCoils')
		this._bindClientMethod('readDiscreteInputs')
		this._bindClientMethod('readInputRegisters')
		this._bindClientMethod('readHoldingRegisters')
		this._bindClientMethod('writeMultipleRegisters')

		//this.readInputRegisters = this.client.readInputRegisters.bind(this.client)
	}

	connect() {
		this.socket.connect({
			host: this.host,
			port: Number(this.port),
		})
	}

	_bindClientMethod(methodName) {
		this[methodName] = this.client[methodName].bind(this.client)
	}
}

module.exports = TcpModbus
