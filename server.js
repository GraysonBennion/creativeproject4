const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

var card1 = 'pikachu.png';
var card2 = 'pikachu.png';
var card3 = 'pikachu.png';


app.get('/api/cards', (req, res) => {
    var array = []
    array.push(card1);
    array.push(card2);
    array.push(card3);
    res.send(array);
});

app.put('/api/card1', (req,res) => {
	card1 = req.body.path;
	res.send(card1);
});

app.put('/api/card2', (req,res) => {
	card2 = req.body.path;
	res.send(card2);
});

app.put('/api/card3', (req,res) => {
	card3 = req.body.path;
	res.send(card3);
});
/*
app.post('/api/items', (req, res) => {
    id = id + 1;
    let item = {id:id, text:req.body.text, priority: req.body.priority, completed: req.body.completed};
    items.push(item);
    res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = items.map(item => { return item.id; }).indexOf(id);
    if (removeIndex === -1) {
	res.status(404).send("Sorry, that item doesn't exist");
	return;
    }
    items.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.put('/api/items/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let itemsMap = items.map(item => { return item.id; });
    let index = itemsMap.indexOf(id);
    let item = items[index];
    item.completed = req.body.completed;
    item.text = req.body.text;
    item.priority = req.body.priority;
    // handle drag and drop re-ordering
    if (req.body.orderChange) {
	let indexTarget = itemsMap.indexOf(req.body.orderTarget);
	items.splice(index,1);
	items.splice(indexTarget,0,item);
    }
    res.send(item);
});
*/

app.listen(3000, () => console.log('Server listening on port 3000!'))
