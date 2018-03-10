var app = new Vue({
    el: '#app',
    data: {
	items: [],
	text: '',
	priority: 'high',
	show: 'all',
	drag: {}
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
	    axios.post("http://localhost:3000/api/items", {
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
	    axios.put("http://localhost:3000/api/items/" + item.id, {
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
	    axios.delete("http://localhost:3000/api/items/" + item.id).then(response => {
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
	    axios.put("http://localhost:3000/api/items/" + this.drag.id, {
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
	    axios.get("http://localhost:3000/api/items").then(response => {
		this.items = response.data;
		return true;
	    }).catch(err => {
	    });
	},
	increasePriority: function() {

	},
	decreasePriority: function() {

	},
	sortByPriority: function() {

	},
    }
});
