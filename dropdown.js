(function(rootObj) {
	debugger
	
	var Dropdown = rootObj.Dropdown = rootObj.Dropdown || {};
	
	var Widget = Dropdown.Widget = function (el, selections, options) {
		this.el = el;
		selections = selections.sort();
		this.selectionsHash = createSelectionsHash(selections);
		this.setupOptions(options);
		this.createSelectElement(selections);
		// this.prevQuery = "";
		
		// this.el.addEventListener("keyup", updateDropdown.bind(this));
	};
	
	Widget.prototype.createSelectElement (selections) {
		var input = rootObj.document.createElement("input");
		input.addEventListener("keyup", updateDropdown.bind(this));
		var list = rootObj.document.createElement("ul");
		var item;
		selections.forEach( function (selection) {
			item = rootObj.document.createElement("li");
			list.appendChild(item);
		});
		this.el.appendChild(list);
	};
	
	function createSelectionsHash(selections) {
		var selectionsHash = {};
		
		selections.forEach ( function (selection) {
			selectionsHash[selection] = true;
		});
		return selectionsHash
	};
	
	//could possibly only iterate through currently true keys if the new query contains the previous query
	//sets selectionsHash[key] = true if matches query, and false otherwise
	Widget.prototype.setMatches (query) { 
		Object.keys(this.selectionsHash).forEach( function (key) {
			this.selectionsHash[key] = (key.search(RegExp(query)) === -1 ? false : true);
		});
	};
	
	Widget.prototype.setupOptions = function (options) {
		var title = rootObj.document.createElement("div");
		title.innerText = (options.title ? options.title : "Please Choose");
		this.el.appendChild(title);
	};
	
	Widget.prototype.updateDropdown = function (event) {
		var query = event.target.innerText;
		var oldSelect = this.el.querySelector("select");
		var selectClone = oldSelect.cloneNode(true);
		
		this.setMatches(query);
		
		this.selectClone.children.forEach ( function (option) {
			//if option matches query
			this.selectionsHash[option.innerText] ? option.classList.remove("display-none") : option.classList.add("display-none");
		});
		
		this.el.replaceChild(selectClone, oldSelect);
	};
	
})(this);