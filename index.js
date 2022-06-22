const fs = require ('fs');//fs stands for file sistem
const http = require ('http');
const url = require ('url');

///////////////////////////////////////////////////////////////////
//FILES 

//Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${new Date (Date.now())}`;
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File written');

//Non-blocking, asynchronous way: 
/*
fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{
    if(err) return console.log('ERROR💥')
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=>{
        fs.readFile('./txt/append.txt', 'utf-8', (err,data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err=>{
                console.log('Your file has been written 😎');
            })
        });
    });
});
console.log('Will read file!');*/

///////////////////////////////////////////////////////////////////
// SERVER

//Very simple API
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req,res)=> {
    const pathName = req.url;

//Overview page
    
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type' : 'txt/html'});
        res.end (tempOverview);

//Product page'
    } else if (pathName === '/product'){
        res.end(tempProduct);

//API
    } else if (pathName ==='/api') {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data);
        
//NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello world',
        });
        res.end('<h1>Page not found!</h1>');
    }

    //res.end('Hello from the server! 😀');
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening to requests on port 8000');
});

