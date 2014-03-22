      // Called when a message is passed.  We assume that the content script
      // wants to show the page action.
      function onRequest(request, sender, sendResponse) {

	var recognition_type = request["recognition_type"];
	var navigation_options = request["navigation_options"];

	var icon_filename_pieces = new Array();
	if (recognition_type == "manual")
		icon_filename_pieces.push("manual");
	else if (recognition_type == "guess")
		icon_filename_pieces.push("guess");

	if (navigation_options["next"].length)
		icon_filename_pieces.push("next");
	if (navigation_options["prev"].length)
		icon_filename_pieces.push("prev");

	icon_filename_pieces.sort();
	var icon_filename = icon_filename_pieces.join("_");

	chrome.pageAction.setIcon({"path": "icons/" + icon_filename + ".png", "tabId": sender.tab.id})

        // Show the page action for the tab that the sender (content script) was on.
        chrome.pageAction.show(sender.tab.id);

        // Return nothing to let the connection be cleaned up.
        sendResponse({});
      };

      // Listen for the content script to send a message to the background page.
      chrome.extension.onRequest.addListener(onRequest);
