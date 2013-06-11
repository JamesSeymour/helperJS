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
};

HelperJS.prototype.removeOverlay = function() {
	this.bIsOverlayOpen = false;
	this.eLeftElement.remove();
	this.eTopElement.remove();
	this.eRightElement.remove();
	this.eBottomElement.remove();
};

HelperJS.prototype._createLeftElement = function(eHelpElement) {
	var nDistanceFromLeft = eHelpElement.position().left;
	var nWindowHeight = $(window).height();

	return this._createOverlayElement(nWindowHeight, nDistanceFromLeft, 0, 0);
};

HelperJS.prototype._createTopElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement.position().top;
	var nDistanceFromLeft = eHelpElement.position().left;

	return this._createOverlayElement(nDistanceFromTop, eHelpElement.width(), 0, nDistanceFromLeft);
};

HelperJS.prototype._createRightElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement.position().top;
	var nDistanceFromLeft = eHelpElement.position().left;
	var nWindowWidth = $(window).width();
	var nWindowHeight = $(window).height();

	var nRightElementWidth = nWindowWidth - (nDistanceFromLeft + eHelpElement.width())
	var nLeftOffset = nDistanceFromLeft + eHelpElement.width();

	return this._createOverlayElement(nWindowHeight, nRightElementWidth, 0, nLeftOffset);
};

HelperJS.prototype._createBottomElement = function(eHelpElement) {
	var nDistanceFromTop = eHelpElement.position().top;
	var nDistanceFromLeft = eHelpElement.position().left;
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

HelperJS.prototype._addOverlayStyling = function(eElement) {
	eElement.css("opacity", "0.8");
	eElement.css("background-color", "#CCC");
	eElement.css("position", "fixed");
	eElement.css("z-index", "9999999");
	return eElement;
}
