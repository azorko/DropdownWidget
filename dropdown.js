(function(rootObj) {
	
	var Dropdown = rootObj.Dropdown = rootObj.Dropdown || {};
	
	var Widget = Dropdown.Widget = function (el, selections, options) {
		this.el = el;
		selections = selections.sort();
		this.selectionsHash = createSelectionsHash(selections);
		this.setupOptions(options);
		this.createSelectElement(selections);
	};
	
	Widget.prototype.createSelectElement = function (selections) {
		this.el.classList.add("container-no-display");
		var container = rootObj.document.createElement("div");
		container.classList.add("container");
		var input = rootObj.document.createElement("input");
		var list = rootObj.document.createElement("ul");
		list.addEventListener("click", this.updateSelection.bind(this));
		var item;
		
		input.addEventListener("keyup", this.updateDropdown.bind(this));
		container.appendChild(input);
		
		selections.forEach( function (selection) {
			item = rootObj.document.createElement("li");
			item.innerText = selection;
			list.appendChild(item);
		});
		
		container.appendChild(list);
		this.el.appendChild(container);
	};
	
	function createSelectionsHash(selections) {
		var selectionsHash = {};
		
		selections.forEach ( function (selection) {
			selectionsHash[selection] = true;
		});
		return selectionsHash;	
	};
	
	//could possibly only iterate through currently true keys if the new query contains the previous query
	//sets selectionsHash[key] = true if matches query, and false otherwise
	Widget.prototype.setMatches = function (query) {
		var that = this;
		Object.keys(this.selectionsHash).forEach( function (key) {
			that.selectionsHash[key] = (key.search(RegExp(query, "i")) === -1 ? false : true);
		});
	};
	
	Widget.prototype.setupOptions = function (options) {
		var title = rootObj.document.createElement("div");
		title.classList.add("title");
		title.innerText = (options.title ? options.title : "Please Choose");
		title.addEventListener("click", this.toggleContainer.bind(this));
		this.el.appendChild(title);
	};
	
	//if list was visible, make it invisible, and other way around
	Widget.prototype.toggleContainer = function () {
		this.el.classList.toggle("container-no-display");
	};
	
	Widget.prototype.updateDropdown = function (event) {
		var query = event.target.value;
		var list = this.el.querySelector("ul");
		var listClone = list.cloneNode(true);
		var that = this, i, children = listClone.children, len = children.length, item;
		
		this.setMatches(query);
		
	  for (i = 0; i < len; i++) {
			item = children[i];
			//if item matches query
			that.selectionsHash[item.innerText] ? item.classList.remove("display-none") : item.classList.add("display-none");
		}
		
		this.el.querySelector(".container").replaceChild(listClone, list);
	};
	
	Widget.prototype.updateSelection = function (event) {
		this.el.querySelector(".title").innerText = event.target.innerText;
	};
	
})(this);