
var inherently_supported_comics = [
	"http://www.qwantz.com/", "http://nedroid.com/", "http://doctorcatmd.com/", "http://www.nuklearpower.com/2001/03/02/episode-001-were-going-where/", "http://www.spaceavalanche.com/2009/02/02/irish-sea/",
	"http://thedevilspanties.com/", "http://www.irregularwebcomic.net/", "http://www.gpf-comics.com/", "http://drmcninja.com/archives/comic/0p1", "http://buttersafe.com/", "http://www.meekcomic.com/",
	"http://www.explosm.net/comics", "http://midnitesurprise.com/", "http://anderslovesmaria.reneengstrom.com/", "http://sofarapart.com/", "http://www.bobwhitecomics.com/", "http://thebrainseed.com/brightleaf/",
	"http://thebrainseed.com/odyssey/", "http://catandgirl.com/", "http://www.catrackham.com/", "http://chainsawsuit.com/", "http://jessfink.com/Chester5000XYV/", "http://dcisgoingtohell.com/", "http://thechipperwhale.com/",
	"http://kinokofry.com/", "http://www.lovemenicecomic.com/", "http://www.pvponline.com/", "http://realcanesugar.cc/", "https://quincyquarks.wordpress.com/", "http://templaraz.com/", "http://www.abominable.cc/",
	"http://www.dharbin.com/", "http://www.intrepidgirlbot.com/2009/03/06/pretty-people-processor/", "http://www.agreeablecomics.com/loneliestastronauts/", "http://threepanelsoul.com/",
	"http://www.tinykittenteeth.com/2009/01/26/gene-kelly/", "http://wondermark.com/", "http://www.sintitulocomic.com/", "http://kafkaskoffee.com/", "http://amultiverse.com/", "http://mgleim.com/apology/",
	"http://www.bladediary.com/", "http://amultiverse.com/", "http://nonadventures.com/", "http://www.dumbingofage.com/", "http://hijinksensue.com/", "http://www.johnhartstudios.com/wizardofid/"
];

// Saves options to localStorage.
function save_options() {
	var checkbox = document.getElementById("find_multiple_targets");
	var find_multiple_targets = checkbox.checked;
	localStorage["find_multiple_targets"] = find_multiple_targets;

	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}


// Restores checkbox state to saved value from localStorage.
function restore_options() {
	var find_multiple_targets = localStorage["find_multiple_targets"];

	var checkbox = document.getElementById("find_multiple_targets");
	checkbox.checked = find_multiple_targets;
}

function list_manually_supported_comics() {
	var container = document.getElementById("manual_support_list");

	var html = '<div class="border_rounded">';

	html += '<h1>' + Object.keys(manual_site_overrides).length + ' manually-supported comics</h1>';
	html += '<ul>';
	for (var override_website in manual_site_overrides) {
		var link_finder = manual_site_overrides[override_website];
		var object_type = link_finder._className;
		html += '<li><a href="http://' + override_website + '">' + override_website + '</a> - ' + object_type + '</li>';
	}
	html += "</ul>";
	html += "</div>";

	container.innerHTML = html;
}

function list_inherently_supported_comics() {
	var container = document.getElementById("inherent_support_list");

	var html = '<div class="border_rounded2">';

	html += '<h1>' + inherently_supported_comics.length + ' (known) inherently-supported comics</h1>';
	html += '<ul>';
	for (var i in inherently_supported_comics) {
		var comic_website = inherently_supported_comics[i];
		html += '<li><a href="' + comic_website + '">' + comic_website + '</a></li>';
	}
	html += "</ul>";
	html += "</div>";

	container.innerHTML = html;
}


function get_regression_test_sample() {
	var link_finder_type_representatives = {};
	for (var override_website in manual_site_overrides) {
		var link_finder = manual_site_overrides[override_website];
		var object_type = link_finder._className;
		if (object_type in link_finder_type_representatives) continue;
		link_finder_type_representatives[object_type] = override_website;
	}
	return link_finder_type_representatives;
}

// Gathers one of each type of link finder
function list_regression_test_comics() {

	var link_finder_type_representatives = get_regression_test_sample();

	var container = document.getElementById("regression_test_list");
	var html = "";
	html += "<ul>";
	for (var object_type in link_finder_type_representatives) {
		var override_website = link_finder_type_representatives[object_type];
		html += "<li><a href=\"http://" + override_website + "\">" + override_website + "</a> - " + object_type + "</li>";
	}
	html += "</ul>";
	container.innerHTML = html;
}

function init() {
	restore_options();
	list_manually_supported_comics();
	list_inherently_supported_comics();
	list_regression_test_comics();
}


function open_regression_tabs() {
	var link_finder_type_representatives = get_regression_test_sample();
	for (var object_type in link_finder_type_representatives) {
		var override_website = link_finder_type_representatives[object_type];
		chrome.tabs.create({'url': "http://" + override_website}, function(tab) {
			// Tab opened.
		});
	}
}

function visit_random_comic() {

	var random_list = inherently_supported_comics.slice();
	for (var override_website in manual_site_overrides)
		random_list.push( "http://" + override_website );

	var comic_url = random_list[Math.floor(Math.random() * random_list.length)];
	chrome.tabs.create({'url': comic_url}, function(tab) {
		// Tab opened.
	});
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#rand').addEventListener('click', visit_random_comic);
	document.querySelector('#reg').addEventListener('click', open_regression_tabs);
	document.querySelector('#save').addEventListener('click', save_options);
	init();
});
