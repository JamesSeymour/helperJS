HelperJS = function(sIdentifier) {
	this.bIsOverlayOpen = false;

	var self = this;
	$("#" + sIdentifier).bind('click', function() {
		self.addOverlay();
	});

	$(window).resize(function() {
 		if(self.bIsOverlayOpen)
 		{
 			self.removeOverlay();
 			self.addOverlay();
 		}
	});
};

HelperJS.prototype.addOverlay = function() {
	var eHelpElement = $(document).find('[helper-bind]');
	this.bIsOverlayOpen = true;

	this.eLeftElement = this._createLeftElement(eHelpElement);
	this.eTopElement = this._createTopElement(eHelpElement);
	this.eRightElement = this._createRightElement(eHelpElement);
	this.eBottomElement = this._createBottomElement(eHelpElement);

	this.eHelpDescription = this._createDescription(eHelpElement, eHelpElement.attr("helper-description"))

	this.eLine = this._createLine(eHelpElement[0].offsetLeft + eHelpElement.width(), eHelpElement[0].offsetTop + (eHelpElement.height() / 2), this.eHelpDescription[0].offsetLeft + (this.eHelpDescription.width() / 2) ,this.eHelpDescription[0].offsetTop);
};

HelperJS.prototype.removeOverlay = function() {
	this.bIsOverlayOpen = false;
	this.eLeftElement.remove();
	this.eTopElement.remove();
	this.eRightElement.remove();
	this.eBottomElement.remove();
	this.eHelpDescription.remove();
	this.eLine.remove();
};

HelperJS.prototype._createLeftElement = function(eHelpElement) {
	var nDistanceFromLeft = eHelpElement[0].offsetLeft;
	var nWindowHeight = $(window).height();

	return this._createOverlayElement(nWindowHeight, nDistanceFromLeft, 0, 0);
};

HelperJS.prototype._createTopElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement[0].offsetTop;
	var nDistanceFromLeft = eHelpElement[0].offsetLeft;

	return this._createOverlayElement(nDistanceFromTop, eHelpElement.width(), 0, nDistanceFromLeft);
};

HelperJS.prototype._createRightElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement[0].offsetTop;
	var nDistanceFromLeft = eHelpElement[0].offsetLeft;
	var nWindowWidth = $(window).width();
	var nWindowHeight = $(window).height();

	var nRightElementWidth = nWindowWidth - (nDistanceFromLeft + eHelpElement.width())
	var nLeftOffset = nDistanceFromLeft + eHelpElement.width();

	return this._createOverlayElement(nWindowHeight, nRightElementWidth, 0, nLeftOffset);
};

HelperJS.prototype._createBottomElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement[0].offsetTop;
	var nDistanceFromLeft = eHelpElement[0].offsetLeft;
	var nWindowHeight = $(window).height();

	var nDistanceFromBottom = nDistanceFromTop + eHelpElement.height();
	var nTopElementHight = nWindowHeight - nDistanceFromBottom;

	return this._createOverlayElement(nTopElementHight, eHelpElement.width(), nDistanceFromBottom, nDistanceFromLeft);
};

HelperJS.prototype._createOverlayElement = function(nHeight, nWidth, nTop, nLeft) {
	var eElement = $("<div></div>");
	eElement.css("height", nHeight + "px");
	eElement.css("width", nWidth + "px");
	eElement.offset({ top: nTop, left: nLeft });

	eElement = this._addOverlayStyling(eElement);

	$("body").append(eElement);

	var self = this;
	eElement.bind('click', function() {
		self.removeOverlay();
	});

	return eElement;
};

HelperJS.prototype._createDescription = function(eParentElement, sDescription) {
	var nDistanceFromTop = eParentElement[0].offsetTop;
	var nDistanceFromLeft = eParentElement[0].offsetLeft + eParentElement.width();

	var eElement = $("<div>" + sDescription + "</div>");

	eElement.offset({ top: nDistanceFromTop + 75, left: nDistanceFromLeft + 100 });
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999999");
	eElement.css("border", "1px solid #FFF");
	eElement.css("border-bottom-style", "none");
	eElement.css("border-left-style", "none");
	eElement.css("border-right-style", "none");
	eElement.css("color", "#FFF");
	eElement.css("padding-top", "5px");

	$("body").append(eElement);
	return eElement;
};

HelperJS.prototype._addOverlayStyling = function(eElement) {
	eElement.css("opacity", "0.8");
	eElement.css("background-color", "#444");
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999998");
	return eElement;
};

HelperJS.prototype._addLineStyling = function(eElement) {
	eElement.css("border", "1px solid #FFF");
	eElement.css("border-bottom-style", "none");
	eElement.css("border-left-style", "none");
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999998");
	return eElement;
};

HelperJS.prototype._createLine = function(x1,y1, x2,y2){
	var nHeight = y2 - y1;
	var nWidth = x2 - x1;

	var eElement = $("<div></div>");
	eElement.css("height", nHeight + "px");
	eElement.css("width", nWidth + "px");
	eElement.offset({ top: y1, left: x1 });

	eElement = this._addLineStyling(eElement);

	$("body").append(eElement);

	var self = this;
	eElement.bind('click', function() {
		self.removeOverlay();
	});

	return eElement;
}
