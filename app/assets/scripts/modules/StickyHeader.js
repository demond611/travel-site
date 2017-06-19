import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {

	constructor(){
		this.lazyImages = $(".lazyload");
		this.siteHeaderButton = $(".site-header__btn-container > a");
		this.siteHeader = $(".site-header");
		this.headerTrigger = $(".large-hero__subtitle");
		this.createHeaderWaypoint();
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a");
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

	refreshWaypoints(){
		this.lazyImages.on('load', function(){
			Waypoint.refreshAll();
		});
	}

	addSmoothScrolling(){
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint(){
		var that = this;
		new Waypoint({
			element: this.headerTrigger[0],
			handler: function(direction){
				if(direction == "down"){
					that.siteHeader.addClass("site-header--dark");
					that.siteHeaderButton.addClass("btn--orange");
				} else {
					that.siteHeader.removeClass("site-header--dark");
					that.siteHeaderButton.removeClass("btn--orange");
				}
			}
		});
	}

	createPageSectionWaypoints(){
		var that = this;
		this.pageSections.each(function(){
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "down"){
						var matchingHeaderLink = $(currentPageSection.getAttribute("data-matching-link"));
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "20%"
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction){
					if (direction == "up"){
						var matchingHeaderLink = $(currentPageSection.getAttribute("data-matching-link"));
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-40%"
			});
		});
	}

}

export default StickyHeader;