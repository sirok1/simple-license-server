const randtoken = require('rand-token');
const Util = require('./util')
const fs = require('fs')
class Licensee {
    _filepath;
    _map;
    constructor(file_path = '', updateInterval = 30 * 60 * 1000) {
        if (!file_path) throw new Error('no path for map')
        this._filepath = Util.checkPath(file_path, 'file', 'licenseList')
        this._createMap()
        setInterval(() => this._disableExpired(), updateInterval)

    }

    _createMap() {
        try {
            let json = fs.readFileSync(this._filepath, 'utf-8')
            this._map = new Map(Object.entries(JSON.parse(json)))
        }
        catch (e) {
            console.error(e)
            console.warn('can\'t get saved map, creating new ...')
            this._map = new Map()
        }
    }

    _disableExpired() {
        for (let [key, value] of Object.entries(this._map)) {
            if (value.expireDate <= Date.now()) {
                value.expired = true
            }
        }
        this._save_to_file(Object.fromEntries(this._map))
    }

    _save_to_file(jsonObject) {
        try {
            let jsonString = JSON.stringify(jsonObject)
            fs.writeFileSync(this._filepath, jsonString)
        }
        catch (e) {
            console.error('can\'t save file ', e)
        }
    }

    checkToken(token) {
        let res = this._map.get(token)
        if (!res) return false;
        if (res.expireDate <= Date.now()) return false;
        return !res.expired;
    }

    updateMap(){
        this._createMap()
    }

    static generateToken() {
        return randtoken.generate(16)
    }

    static addToken(file_path, expireDate) {
        if (!file_path) throw new Error('no path for map')
        let absolute_path = Util.checkPath(file_path, 'file', 'licenseList')
        try {
            let json = fs.readFileSync(absolute_path, 'utf-8')
            let map = new Map(Object.entries(JSON.parse(json)))
            let expDate
            if (!expireDate) {
                expDate = Date.now() + 1209600000 //14 days
            }
            else {
                expDate = Date.now() + expireDate
            }
            let token = this.generateToken()
            map.set(`${token}`, {
                expired: false,
                expireDate: expDate
            })
            try {
                let jsonString = JSON.stringify(Object.fromEntries(map))
                fs.writeFileSync(absolute_path, jsonString)
                return token
            }
            catch (e) {
                console.error(e)
            }

        }
        catch (e) {
            console.error(e)
            console.error("\x1b[31m", 'can\'t get saved map')
        }
    }
}

module.exports = Licensee