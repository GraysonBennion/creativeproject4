var app = new Vue({
    el: '#app',
    data: {
	items: [],
	text: '',
	priority: 'high',
	show: 'all',
	drag: {},
	orderChange:false,
	orderTarget:0
    },
    
    created: function() {
	this.getItems();
    },
    
    computed: {
	activeItems: function() {
	    return this.items.filter(function(item) {
		return !item.completed;
	    });
    },
	filteredItems: function() {
	    if (this.show === 'active')
		return this.items.filter(function(item) {
		    return !item.completed;
		});
	    if (this.show === 'completed')
		return this.items.filter(function(item) {
		    return item.completed;
		});
	    return this.items;
	},
    },
    methods: {
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
    }
});
