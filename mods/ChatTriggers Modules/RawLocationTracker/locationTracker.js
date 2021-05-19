class _LocationTracker {
    constructor() {
        this.currentLocation = undefined;
        this._gettingLocation = false;
        this.newLocationCallbacks = [];
        this._register();
        this.forceGetLocation();
    }

    /**
     * internal method to save the json location and call all callbacks
     * @param {JSON} jsonLoc the raw loc as json
     * @param {ChatEvent} event the chat event that was called from the output of rawloc command
     */
    _saveLocation(jsonLoc, event) {
        this.currentLocation = jsonLoc;
        this.newLocationCallbacks.forEach(a => a(jsonLoc));
    }

    /**
     * internal method to register all triggers
     */
    _register() {

        register('worldLoad', () => {
            this.forceGetLocation();
        });

        register('chat', (e) => {
            if (!this._gettingLocation) return;
            this._saveLocation(JSON.parse(ChatLib.getChatMessage(e, false)), e);
            this._gettingLocation = false;
            cancel(e)
        }).setChatCriteria('&f{"server":"').setContains();

    }

    /**
     * Forcefully get the location.
     */
    forceGetLocation() {
        if (this._gettingLocation) return;
        this._gettingLocation = true;
        ChatLib.command("locraw");
    }

    /**
     * 
     * @param {Function} callback add a callback to be called when the player's location is saved to the cache. passed argument in called is the JSON location
     */
    addLocationCallback(callback) {
        this.newLocationCallbacks.push(callback);
    }
}

const LocationTracker = new _LocationTracker();

export { LocationTracker as default }
