

const userAdLibs = {}

function swampIzzon(username) {
	userAdLibs[username] = true
}

function swampIzzoff(username) {
	userAdLibs[username] = false
}

function swampIzwhat(username) {
	if (userAdLibs[username] === null) {
		userAdLibs[username] = false
	}
	return userAdLibs[username]
}

function findAdLib(sickBar) {
	// Split the string by commas and trim whitespace
	let parts = sickBar.split(',').map(part => part.trim());
	// Get the last part and log it
	return parts[parts.length - 1];
}

module.exports = {swampIzzon, swampIzzoff, swampIzwhat, findAdLib}