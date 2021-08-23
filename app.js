const fs = require('fs')
const readline = require('readline')
const ProgressBar = require('progress')
const filePath = 'free_company_dataset.csv'

const rS = fs.createReadStream(filePath)
const wS = fs.createWriteStream('./list.txt')

const sizeFile = fs.statSync(filePath).size
var bar = new ProgressBar(':bar :percent :eta', {total: 50})

var arrCountrys = {}
var arrCountry = []
var country = ''
var sizeLines = 0

const rl = readline.createInterface({
    input: rS
})

function check (country){
    if(country == 'country' || country == '""' || country == null){
        return false
    }else{
        return true
    }
}

rl.on('line', (line) =>{
    sizeLines = sizeLines + line.length

    if (sizeLines/sizeFile * 100 >= 2){
        bar.tick(); 
        sizeLines = 0}
    county = line.split(',',1)[0]

    if(check(country)){

        if(arrCountrys[county]==undefined){
            arrCountrys[county] = 1
        }else{
            arrCountrys[county]++
        }
    }
})

rl.on('close', ()=>{
    bar.tick()
    arrCountry = Object.keys(arrCountrys)
    arrCountry.forEach(el =>{
        wS.write(el + ' : ' + arrCountrys[el]+ '\n')
    })
})