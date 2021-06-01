var instance_skel = require('../../instance_skel');
var udp           = require('../../udp');
var debug;
var log;

var keycodes = [
	{ id: '0', label: '[NONE]' },
	{ id: '8', label: 'BACKSPACE' },
	{ id: '9', label: 'TAB' },
	{ id: '12', label: 'CLEAR' },
	{ id: '13', label: 'ENTER' },
	{ id: '16', label: 'SHIFT' },
	{ id: '17', label: 'CTRL' },
	{ id: '18', label: 'ALT' },
	{ id: '19', label: 'PAUSE' },
	{ id: '20', label: 'CAPS LOCK' },
	{ id: '27', label: 'ESCAPE' },
	{ id: '32', label: 'SPACEBAR' },
	{ id: '33', label: 'PAGE UP' },
	{ id: '34', label: 'PAGE DOWN' },
	{ id: '35', label: 'END' },
	{ id: '36', label: 'HOME' },
	{ id: '37', label: 'LEFT ARROW' },
	{ id: '38', label: 'UP ARROW' },
	{ id: '39', label: 'RIGHT ARROW' },
	{ id: '40', label: 'DOWN ARROW' },
	{ id: '41', label: 'SELECT' },
	{ id: '42', label: 'PRINT' },
	{ id: '43', label: 'EXECUTE' },
	{ id: '44', label: 'PRINT SCREEN' },
	{ id: '45', label: 'INS' },
	{ id: '46', label: 'DEL' },
	{ id: '47', label: 'HELP' },
	{ id: '48', label: '0' },
	{ id: '49', label: '1' },
	{ id: '50', label: '2' },
	{ id: '51', label: '3' },
	{ id: '52', label: '4' },
	{ id: '53', label: '5' },
	{ id: '54', label: '6' },
	{ id: '55', label: '7' },
	{ id: '56', label: '8' },
	{ id: '57', label: '9' },
	{ id: '65', label: 'A' },
	{ id: '66', label: 'B' },
	{ id: '67', label: 'C' },
	{ id: '68', label: 'D' },
	{ id: '69', label: 'E' },
	{ id: '70', label: 'F' },
	{ id: '71', label: 'G' },
	{ id: '72', label: 'H' },
	{ id: '73', label: 'I' },
	{ id: '74', label: 'J' },
	{ id: '75', label: 'K' },
	{ id: '76', label: 'L' },
	{ id: '77', label: 'M' },
	{ id: '78', label: 'N' },
	{ id: '79', label: 'O' },
	{ id: '80', label: 'P' },
	{ id: '81', label: 'Q' },
	{ id: '82', label: 'R' },
	{ id: '83', label: 'S' },
	{ id: '84', label: 'T' },
	{ id: '85', label: 'U' },
	{ id: '86', label: 'V' },
	{ id: '87', label: 'W' },
	{ id: '88', label: 'X' },
	{ id: '89', label: 'Y' },
	{ id: '90', label: 'Z' },
	{ id: '91', label: 'LEFT WINDOW' },
	{ id: '92', label: 'RIGHT WINDOW' },
	{ id: '96', label: 'KEYPAD 0' },
	{ id: '97', label: 'KEYPAD 1' },
	{ id: '98', label: 'KEYPAD 2' },
	{ id: '99', label: 'KEYPAD 3' },
	{ id: '100', label: 'KEYPAD 4' },
	{ id: '101', label: 'KEYPAD 5' },
	{ id: '102', label: 'KEYPAD 6' },
	{ id: '103', label: 'KEYPAD 7' },
	{ id: '104', label: 'KEYPAD 8' },
	{ id: '105', label: 'KEYPAD 9' },
	{ id: '106', label: 'MULTIPLY' },
	{ id: '107', label: 'ADD' },
	{ id: '108', label: 'SEPERATOR' },
	{ id: '109', label: 'SUBTRACT' },
	{ id: '110', label: 'DECIMAL' },
	{ id: '112', label: 'F1' },
	{ id: '113', label: 'F2' },
	{ id: '114', label: 'F3' },
	{ id: '115', label: 'F4' },
	{ id: '116', label: 'F5' },
	{ id: '117', label: 'F6' },
	{ id: '118', label: 'F7' },
	{ id: '119', label: 'F8' },
	{ id: '120', label: 'F9' },
	{ id: '121', label: 'F10' },
	{ id: '122', label: 'F11' },
	{ id: '123', label: 'F12' },
	{ id: '124', label: 'F13' },
	{ id: '125', label: 'F14' },
	{ id: '126', label: 'F15' },
	{ id: '127', label: 'F16' },
	{ id: '128', label: 'F17' },
	{ id: '129', label: 'F18' },
	{ id: '130', label: 'F19' },
	{ id: '131', label: 'F20' },
	{ id: '132', label: 'F21' },
	{ id: '133', label: 'F22' },
	{ id: '134', label: 'F23' },
	{ id: '135', label: 'F24' },
	{ id: '144', label: 'NUM LOCK' },
	{ id: '145', label: 'SCROLL LOCK' },
	{ id: '160', label: 'LEFT SHIFT' },
	{ id: '161', label: 'RIGHT SHIFT' },
	{ id: '162', label: 'LEFT CONTROL' },
	{ id: '163', label: 'RIGHT CONTROL' },
	{ id: '164', label: 'LEFT MENU' },
	{ id: '165', label: 'RIGHT MENU' },
]

var powerpointmacros = [
	{ id: '0', label: 'Launch From Beginning' },
	{ id: '1', label: 'Launch From Current Slide' },
	{ id: '2', label: 'Next Slide' },
	{ id: '3', label: 'Previous Slide' },
	{ id: '4', label: 'First Slide' },
	{ id: '5', label: 'Last Slide' },
	{ id: '6', label: 'GOTO Slide Number' },
	{ id: '7', label: 'Next Hotspot' },
	{ id: '8', label: 'Previous Hotspot' },
	{ id: '9', label: 'Click Hotspot' },
	{ id: '10', label: 'Play|Pause Media' },
	{ id: '11', label: 'Stop Media' },
	{ id: '12', label: 'Next Bookmark' },
	{ id: '13', label: 'Previous Bookmark' },
	{ id: '14', label: 'Mute Audio' },
	{ id: '15', label: 'End Show' },
]

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.status(self.STATUS_UNKNOWN);

	if (self.config.host !== undefined) {
		self.udp = new udp(self.config.host, self.config.port);

		self.udp.on('status_change', function (status, message) {
			self.status(status, message);
		});
	}
};

instance.prototype.updateConfig = function(config) {
	var self = this;
	self.config = config;

	if (self.udp !== undefined) {
		self.udp.destroy();
		delete self.udp;
	}

	if (self.config.host !== undefined) {
		self.udp = new udp(self.config.host, self.config.port);

		self.udp.on('status_change', function (status, message) {
			self.status(status, message);
		});
	}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port',
			width: 6,
			default: 7000,
			regex: self.REGEX_PORT
		},
		{
			type: 'text',
			id: 'info',
			label: 'Information',
			width: 12,
			value: 'AV-Key is a versatile windowless utility that enables you to remotely control applications that do not offer any native way to control them remotely. Thankfully though, most do allow the triggering of actions via keyboard short keys, this is where AV-KEY steps in, acting as a bridge. AV-KEY listens for commands received via Ethernet and converts them into keystrokes. Now when any program on the receiving computer has keyboard focus, the keystrokes emulated by AV-KEY are received just as if it was typed directly on the keyboard.</br></br><a href="https://www.ifelseware.com/AV-Key" target="_new">Learn more and download a free copy.</a>.'
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	if (self.udp !== undefined) {
		self.udp.destroy();
	}
	debug("destroy", self.id);
};

instance.prototype.actions = function(system) {
	var self = this;

	self.system.emit('instance_actions', self.id, {
		'codedown': {
			label: 'Key Down (Virtual Key Code)',
			options: [
				{
					type: 'dropdown',
					id: 'codedown',
					label: 'Select key code',
					default: 2,
					choices: keycodes
				}
			]
		},
		'codeup': {
			label: 'Key Up (Virtual Key Code)',
			options: [
				{
					type: 'dropdown',
					id: 'codeup',
					label: 'Select key code',
					default: 2,
					choices: keycodes
				}
			]
		},
		'textblock': {
			label: 'Send Text String',
			options: [
				{
					type: 'textinput',
					label: 'Type sentence',
					id: 'block',
				}
			]
		},
		'combo': {
			label: 'Send Combination of key codes',
			options: [
				{
					type: 'dropdown',
					id: 'combofirst',
					label: 'First key code',
					default: 1,
					choices: keycodes,
					minChoicesForSearch: 113
				},
				{
					type: 'dropdown',
					id: 'combosecond',
					label: 'Second key code',
					default: 1,
					choices: keycodes,
					minChoicesForSearch: 113
				},
				{
					type: 'dropdown',
					id: 'combothird',
					label: 'Third key code',
					default: 1,
					choices: keycodes,
					minChoicesForSearch: 113
				},
				{
					type: 'dropdown',
					id: 'comboforth',
					label: 'Forth key code',
					default: 1,
					choices: keycodes,
					minChoicesForSearch: 113
				}
			]
		},
		'powerpoint': {
			label: 'PowerPoint Cue',
			options: [
				{
					type: 'dropdown',
					label: 'Select Command',
					id: 'macro',
					default: 1,
					choices: powerpointmacros,
					minChoicesForSearch: 16
				},
				{
					type: 'textinput',
					id: 'slidenumber',
					label: 'Slide number (GOTO slide only)',
					default: "",
					regex: self.REGEX_NUMBER
				}
			]
		},

	});
};

instance.prototype.action = function(action) {
	var self = this;
	var id = action.action;
	var cmd;
	var opt = action.options;

	// avplayback default port 7000
	switch (action.action) {
		case 'codedown':
			cmd = 'AVK|CodeDown|' + opt.codedown;
			break;

		case 'codeup':
			cmd = 'AVK|CodeUp|' + opt.codeup;
			break;

		case 'textblock':
			cmd = 'AVK|TextBlock|' + opt.block;
			break;

		case 'combo':
			cmd = 'AVK|Combo|' + opt.combofirst + ',' + opt.combosecond + ',' + opt.combothird;
			break;

		case 'powerpoint':
			cmd = 'AVK|PowerPoint|' + opt.macro + ',' + opt.slidenumber;
			break;
	}

	if (cmd !== undefined) {
		if (self.udp !== undefined) {
			debug('sending ',cmd,"to",self.udp.host);
			self.udp.send(cmd);
		}
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
