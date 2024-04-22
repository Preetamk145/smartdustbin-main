const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http'); 

var value1;
var value2;

class recieve{
    static data1w;
    static data2w;
    static data3w;
    static data4w;
    static data1d;
    static data2d;
    static data3d;
    static data4d;

    async setdata1(wet,dry)
    {
        data1w=wet;
        data1d=dry;
    }
    async setdata2(wet,dry)
    {
        data2w=wet;
        data2d=dry;
    }
    async setdata3(wet,dry)
    {
        data3w=wet;
        data3d=dry;
    }
    async setdata4(wet,dry)
    {
        data4w=wet;
        data4d=dry;
    }

    async getdata1()
    {
        return [data1w,data1d];
    }
    async getdata2()
    {
        return [data2w,data2d];
    }
    async getdata3()
    {
        return [data3w,data3d];
    }
    async getdata4()
    {
        return [data4w,data4d];
    }

}

const app = express();
app.use(bodyParser.json());
app.use(cors()); //  Allow requests from all origins

const server = http.createServer(app); // Create an HTTP server for Socket.IO
const io = require('socket.io')(server, { cors: {origin: "*"} });


// Route to handle incoming data
app.post('/data1', (req, res) => {
 try {
        const data = req.body;
        // await recieve.setdata1(data.w,data.d);
        value1=data.w;
        value2=data.d;
        console.log('Data 1:', data);
        res.status(200).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send();
    }
});

app.get('/get-values', (req, res) => {
    res.json({ value1, value2 });
});

app.post('/data2',async (req, res) => {
 try {
        const jsonData = req.body;
        const data = JSON.parse(jsonData);
        await recieve.setdata2(data.w,data.d);
        console.log('Data 1:', recieve.data1w);
        res.status(200).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send();
    }
});

app.post('/data3',async (req, res) => {
 try {
        const jsonData = req.body;
        const data = JSON.parse(jsonData);
        await recieve.setdata3(data.w,data.d);
        console.log('Data 1:', recieve.data1w);
        res.status(200).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send();
    }
});

app.post('/data4', async(req, res) => {
 try {
        const jsonData = req.body;
        const data = JSON.parse(jsonData);
        await recieve.setdata4(data.w,data.d);
        console.log('Data 1:', recieve.data1w);
        res.status(200).send();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send();
    }
});


var ip = require("ip");
console.dir ( ip.address() );
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server listening on port 3000 `);
});

module.exports =recieve;