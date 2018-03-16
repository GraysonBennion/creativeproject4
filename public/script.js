var app = new Vue({
    el: '#app',
    data: {
    	card1: '',
    	card2: '',
    	card3: '',
    	defaultimg: '/pikachu.png',
    	currentimg: '',
    	current: ["pikachu.png"],
    	input: '',
    	selected: "card1",
    	url: '',
	},
    
    created: function() {
		this.startState();
    },

    methods: {
   	startState: function() {
   		axios.get("/api/cards").then(response => {
   			this.card1 = response.data[0];
   			this.card2 = response.data[1];
   			this.card3 = response.data[2];
   			return true;
	    }).catch(err => {
	    });
   	},

   	updatePics: function() {
 		var list = document.getElementById('cards');
 		list.innerHTML = '';
 		for(var i=0;i<current.length;i++){
 			var newdiv = document.createElement("button");
 			newdiv.setAttribute("onclick", "app.selectImage(\"" + current[i] + "\")");
 			var newimage = document.createElement("img");
 			newimage.src= current[i];
 			newdiv.appendChild(newimage);
 			list.appendChild(newdiv);
 		}
 	},

   	search: function() {
   		axios.get("https://api.pokemontcg.io/v1/cards?name=" + this.input).then(
   			response => {
   				current = [];
   				for(var i=0;i<response.data.cards.length;i++){
   					current.push(response.data.cards[i].imageUrl);
   				}
   				this.updatePics();
   			});
   		  	
   	},

   	selectImage: function(url) {
   		axios.put(("api/" + this.selected), {
   			path: url,
   		}).then(response => {
   			return true;
   		}).catch(err => {

   		});
   		this.startState();
   	},

   	select: function(cardnumber) {
   		var currentcard = document.getElementById(this.selected);
   		currentcard.setAttribute("class", "card");
   		this.selected = "card" + cardnumber;
   		currentcard = document.getElementById(this.selected);
   		currentcard.setAttribute("class", "card selected");
   	},

   	/*
	addItem: function() {
	    axios.post("/api/items", {
		text: this.text,
		completed: false,
		priority: this.priority
	    }).then(response => {
		this.text = "";
		this.priority = "high";
		this.getItems();
		return true;
	    }).catch(err => {
	    });
	},
	completeItem: function(item) {
	    axios.put("/api/items/" + item.id, {
		text: item.text,
		completed: !item.completed,
		orderChange: false,
		priority: item.priority
	    }).then(response => {
		return true;
	    }).catch(err => {
	    });
	},
	deleteItem: function(item) {
	    axios.delete("/api/items/" + item.id).then(response => {
		this.getItems();
		return true;
	    }).catch(err => {
	    });
	},
	showAll: function() {
	    this.show = 'all';
	},
	showActive: function() {
	    this.show = 'active';
	},
	showCompleted: function() {
	    this.show = 'completed';
	},
	deleteCompleted: function() {
	    this.items.forEach(item => {
		if (item.completed)
		    this.deleteItem(item)
	    });
	},
	dragItem: function(item) {
	    this.drag = item;
	},
	dropItem: function(item) {
	    axios.put("/api/items/" + this.drag.id, {
		text: this.drag.text,
		completed: this.drag.completed,
		orderChange: true,
		orderTarget: item.id,
		priority: this.drag.priority
	    }).then(response => {
		this.getItems();
		return true;
	    }).catch(err => {
	    });
	},
	getItems: function() {
	    axios.get("/api/items").then(response => {
		this.items = response.data;
		return true;
	    }).catch(err => {
	    });
	},
	increasePriority: function(item) {
	    if(item.priority === "high"){}
	    else{
		var newpriority;
		if(item.priority ==="low")
		    newpriority = "medium";
		if(item.priority ==="medium")
		    newpriority = "high";
		axios.put("/api/items/" + item.id, {
		    text: item.text,
		    completed: item.completed,
		    orderChange: false,
		    priority: newpriority
		}).then(response => {
		    return true;
		}).catch(err => {
		});
		this.getItems();
	    }
	},
	decreasePriority: function(item) {
	    if(item.priority === "low"){}
	    else{
		var newpriority;
		if(item.priority ==="high")
		    newpriority = "medium";
		if(item.priority ==="medium")
		    newpriority = "low";
		axios.put("/api/items/" + item.id, {
		    text: item.text,
		    completed: item.completed,
		    orderChange: false,
		    priority: newpriority
		}).then(response => {
		    return true;
		}).catch(err => {
		});
		this.getItems();
	    }
	},
	sortByPriority: function() {
	    this.items.sort(function(a, b) {
		var one = 0;
		var two = 0;
		a = a.priority;
		b = b.priority;
		if(a === "high")
		    one = 3;
		if(a === "medium")
		    one = 2;
		if(a === "low")
		    one = 1;
		if(b === "high")
		    two = 3;
		if(b === "medium")
		    two = 2;
		if(b === "low")
		    two = 1;
		return (two - one);
	    });
	},
	*/
    }
});
