# simple-license-server
<pre style="overflow: visible">

_____/\\\\\\\\\\\____/\\\_________________/\\\\\\\\\\\___        
___/\\\/////////\\\_\/\\\_______________/\\\/////////\\\_       
__\//\\\______\///__\/\\\______________\//\\\______\///__      
___\////\\\_________\/\\\_______________\////\\\_________     
______\////\\\______\/\\\__________________\////\\\______    
_________\////\\\___\/\\\_____________________\////\\\___   
__/\\\______\//\\\__\/\\\______________/\\\______\//\\\__  
_\///\\\\\\\\\\\/___\/\\\\\\\\\\\\\\\_\///\\\\\\\\\\\/___
___\///////////_____\///////////////____\///////////_____

simple-license-server
</pre>

A simple server for checking issued licenses with tokens

## Table of contents:
- [Quick start](#quick-start)
- [Usage](#usage)
- [Configuration file](#configuration-file)
- [Examples of Rest Requests](#examples-of-rest-requests)
- - [get](#get)
- - - [ping](#ping)
- - [post](#post)
- - - [checkKey](#checkkey)
- [Generating a new token](#generating-a-new-token)
- [Use with the pm2](#generating-a-new-token)
- - [Install pm2:](#install-pm2)
- - [Server startup via pm2:](#server-startup-via-pm2)
- - [available commands to configure:](#available-commands-to-configure)
- [License](#license)
## Quick Start
First, install the dependencies
```
npm i
```
Then write
```
node . -s
```
## Usage
```
 usage: node . [--help | -h] [--new-license | -nl <number in how many days to expire in days>]
               [--start | -s]

```
## Configuration file
```json
{
  "ip": "The IP address where you want to deploy the server",
  "port": "port on which to deploy the server must be a number",
  "licenseListPath": "Path to token/license file, path must be relative, e.g. \"./licenseList.json\", only .json files are supported",
  "updateInterval": "The time to check if the licenses/tokens have expired should be a number in milliseconds, for example 1800000 (30 minutes)"
}
```
## Examples of Rest Requests
This example will use the [axios](https://axios-http.com/) module
### get:
#### ping
```js
    axios.get('http://ip_on_where_the_server_is:port/ping')
        .then(res => console.log(res.data))
//Expected output: OK
```
### post:
#### checkKey
```js
    axios.post('http://ip_on_where_the_server_is:port/checkKey', {token: "токен сегенерированным сервером"})
        .then(res => console.log(res.data))
//Expected output: 
// { 
// "checkStatus": true 
// }
```
## Generating a new token
Example with token expiration in 10 days
```
node . -nl 10
```
The new token will be added to the license list file and will be displayed in the console

Expected output:
```
new token:  3afeuc5kkY99MAxd
```

## Use with the pm2 
### Install pm2:
```
npm i pm2@latest -g
```
### Server startup via pm2:
```pm2 start node . --name SLS --watch --time -e ../logs/err.log -o ../logs/out.log -l ../logs/full.log -- -s```
Description of the parameters used here:
- `--name` - set the name of the application in the list of processes
- `--watch` - with this parameter, the application will be restarted when files are changed, so that when we add a new token, the application will be restarted immediately with it
- `--time` - logs will be with time
- `-e, -o, -l` - set the location of the application logs, the logs will be located in /logs
- `-- -s` - pass the -s parameter to the server startup script

### available commands to configure:
- Let's add an autostart of processes after reboot `pm2 startup`
- Save our list of processes `pm2 save`
- Open monitoring panel: `pm2 monit`
- Open process list: `pm2 list`
- Open logs: `pm2 logs`.

Official Pm2 documentation https://pm2.keymetrics.io/docs/usage/quick-start/

## License
[MIT License Copyright (c) 2023 sirok1](./LICENSE)
