"use strict";
const process = require('node:process')
const path = require('path')
const config = require('./config.json')
const {Server, Licensee} = require('./src')

console.log("\x1b[0m", '\n' +
    '_____/\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\_________________/\\\\\\\\\\\\\\\\\\\\\\___        \n' +
    ' ___/\\\\\\/////////\\\\\\_\\/\\\\\\_______________/\\\\\\/////////\\\\\\_       \n' +
    '  __\\//\\\\\\______\\///__\\/\\\\\\______________\\//\\\\\\______\\///__      \n' +
    '   ___\\////\\\\\\_________\\/\\\\\\_______________\\////\\\\\\_________     \n' +
    '    ______\\////\\\\\\______\\/\\\\\\__________________\\////\\\\\\______    \n' +
    '     _________\\////\\\\\\___\\/\\\\\\_____________________\\////\\\\\\___   \n' +
    '      __/\\\\\\______\\//\\\\\\__\\/\\\\\\______________/\\\\\\______\\//\\\\\\__  \n' +
    '       _\\///\\\\\\\\\\\\\\\\\\\\\\/___\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\///\\\\\\\\\\\\\\\\\\\\\\/___ \n' +
    '        ___\\///////////_____\\///////////////____\\///////////_____\n')
console.log("\x1b[90m", 'simple-license-server © sirok1')

if (process.argv[2]) {
    let arg = process.argv[2]
    switch (arg) {
        case "-h" :
        case "--help":
            console.log("\x1b[0m", 'usage: node . [--help | -h] [--new-license | -nl <number in how many days to expire in days>]' +
            '\n               [--start | -s]')
            break;
        case "-s":
        case "--start":
            console.log("\x1b[33m",'starting server....')
            let server = new Server(config.ip, config.port)
            server.start(path.join(__dirname, config.licenseListPath), config.updateInterval)
            break;
        case "-nl":
        case "--new-license":
            if (!process.argv[3]){
                console.log("\x1b[0m", 'usage: node . [--help | -h] [--new-license | -nl <number in how many days to expire in days>]' +
                    '\n               [--start | -s]')
                process.exit(0)
            }
            if (!Number(process.argv[3])) {
                console.log("\x1b[0m", 'usage: node . [--help | -h] [--new-license | -nl <number in how many days to expire in days>]' +
                    '\n               [--start | -s]')
                process.exit(0)
            }
            let token = Licensee.addToken(path.join(__dirname, config.licenseListPath), Number(process.argv[3]) * 24 * 60 *60 *1000)
            console.log("\x1b[32m", 'new token: ', token)
            console.log("\x1b[0m")
            process.exit(0)
            break;

    }

}
else {
    console.log("\x1b[0m", 'usage: node . [--help | -h] [--new-license | -nl <number in how many days to expire in days>]' +
        '\n               [--start | -s]')
}