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
		var frag = rootObj.document.createDocumentFragment();
		var input = rootObj.document.createElement("input");
		var list = rootObj.document.createElement("ul");
		var item;
		
		input.addEventListener("keyup", this.updateDropdown.bind(this));
		frag.appendChild(input);
		
		selections.forEach( function (selection) {
			item = rootObj.document.createElement("li");
			item.innerText = selection;
			list.appendChild(item);
		});
		
		frag.appendChild(list);
		this.el.appendChild(frag);
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
			that.selectionsHash[key] = (key.search(RegExp(query)) === -1 ? false : true);
		});
	};
	
	Widget.prototype.setupOptions = function (options) {
		var title = rootObj.document.createElement("div");
		title.innerText = (options.title ? options.title : "Please Choose");
		this.el.appendChild(title);
	};
	
	Widget.prototype.updateDropdown = function (event) {
		var query = event.target.value;
		var list = this.el.querySelector("ul");
		var listClone = list.cloneNode(true);
		var that = this, i, children = listClone.children, len = children.length, item;
		
		this.setMatches(query);
		
		debugger
	  for (i = 0; i < len; i++) {
			item = children[i];
			//if item matches query
			that.selectionsHash[item.innerText] ? item.classList.remove("display-none") : item.classList.add("display-none");
		}
		
		this.el.replaceChild(listClone, list);
	};
	
})(this);