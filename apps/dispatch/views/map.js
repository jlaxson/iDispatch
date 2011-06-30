// ==========================================================================
// Project:   Dispatch.MapView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.MapMarker = GMap.Marker.extend( {
  location: null,
  
  init: function() {
    sc_super();
    
    var that = this;
    google.maps.event.addListener(this._marker, 'dragend', function() {that.updateLocation()});
  },
  
  locationObserver: function() { 
    var loc = this.get('location');
    
    if (!SC.none(loc)) {
      pos = GMap.LatLng(loc.get('latitude'), loc.get('longitude'));
      this.set('position', pos);
    } else {
      this.set('position', GMap.LatLng(0, 0));
    }
  }.observes('*location.latitude', '*location.longitude'),
  
  updateLocation: function(event) {
    var pos = this._marker.getPosition();
    console.log(pos);
    this.setPath('location.latitude', pos.lat());
    this.setPath('location.longitude', pos.lng());
  },
});

Dispatch.MapView = GMap.MapView.extend(
/** @scope Dispatch.MapView.prototype */ {
  
  //mapType: GMap.MapView.MAP_HYBRID,
  center: GMap.LatLng(37.75, -122.45),
  zoom: 13,
  markers: [
   Dispatch.MapMarker.create({
     title: "test",
      locationBinding: "*map.content",
      draggable: YES
    })
  ],
  
  childViews: "setButton clearButton".w(),
  setButton: SC.ButtonView.design({
    layout: {top: 10, right: 10, height: 30, width: 120},
    title: "Set Location",
    controlSize: SC.HUGE_CONTROL_SIZE,
    isEnabledBinding: SC.Binding.notNull('.parentView.content'),
    action: "setLocation"
  }),
  clearButton: SC.ButtonView.design({
    layout: {top: 50, right: 10, height: 30, width: 120},
    title: "Clear Location",
    controlSize: SC.HUGE_CONTROL_SIZE,
    isEnabledBinding: SC.Binding.notNull('.parentView.content'),
    action: "clearLocation"
  }),
  
  setLocation: function(sender) {
    var center = this._map.getCenter();
    this.setPath('content.latitude', center.lat());
    this.setPath('content.longitude', center.lng());
  },
  clearLocation: function() {
    //this.set('content',)
  },
  
  content: null,
  items: [],
  
  exampleItem: Dispatch.MapMarker.extend({
    
  }),
  
  _items: [],
  itemsObserver: function() {
    var newList = this.get('items');
    var oldList = this._items;
    
    var that = this;
    
    //console.log(newList.toString());
    console.log(newList);
    if (SC.none(newList)) return;
    
    var next = [];
    var content = this.get('content');
    
    newList.forEach(function(res) {
      if (content === res)
        return;
      
      console.log("adding marker to " + res.toString());
      
      if (SC.none(res._marker)) {
        var marker = that.exampleItem.create({
          content: res,
          locationBinding: ".content.location"
        });
        
        res._marker = marker;
        that.get('markers').push(marker);
      }
      
      next.push(res);
    });
        
    oldList.removeObjects(next);
    oldList.forEach(function(res) {
      if (SC.none(res._marker)) {
        res._marker.set('content', null);
        that.get('markers').removeObject(res._marker);
        res._marker = null;
      }
    });
    
    this._items = next;
    
  }.observes("*items.[]"),

});
