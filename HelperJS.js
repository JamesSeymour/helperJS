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

	var eHelperElementDescription = $(eHelpElement).find('[helper-description]');
	this.eHelpDescription = this._createDescription(eHelpElement, eHelperElementDescription.attr("helper-description"))
};

HelperJS.prototype.removeOverlay = function() {
	this.bIsOverlayOpen = false;
	this.eLeftElement.remove();
	this.eTopElement.remove();
	this.eRightElement.remove();
	this.eBottomElement.remove();
	this.eHelpDescription.remove();
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

	eElement.offset({ top: nDistanceFromTop + 50, left: nDistanceFromLeft + 50 });
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999999");
	eElement.css("background-color", "#FFF");
	eElement.css("padding", "15px");
	eElement.css("border", "1px solid #BBB");
	eElement.css("border-radius", "10px");

	$("body").append(eElement);
	return eElement;
};

HelperJS.prototype._addOverlayStyling = function(eElement) {
	eElement.css("opacity", "0.8");
	eElement.css("background-color", "#CCC");
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999999");
	return eElement;
}
