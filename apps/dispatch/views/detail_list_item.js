// ==========================================================================
// Project:   Dispatch.IncidentListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.DetailListItemView = SC.View.extend(SC.Control, SC.ContentDisplay,
/** @scope Dispatch.IncidentListItemView.prototype */ {

  // TODO: Add your own code here.
  content: null,
  
  contentTitleKey: null,
  contentSummaryKey: null,
  contentHasIconKey: null,
  contentIconKey: null,
  contentStatusKey: null,
  
  classNames: ['d-incident-list-item-view'],
  contentDisplayProperties: ['description', 'disposition', 'assignments', 'type', 'summaryForListView'],
  
  contentKey: function(key) {
    var del = this.displayDelegate;
    var content = this.get('content');
    
    var k;
    if (k = this.getDelegateProperty(key, del))
      return content.get(k);
    else if (k = this.get(key))
      return content.get(k);
    
    return key;
  },
  
  render: function(context, firstTime) {
    var content = this.get('content');
    var icon_class = "unknown";
    var del = this.get('displayDelegate');
    
    if (this.isSelected)
      context.addClass('sel');
    
    context = context.begin("div").addClass('sc-outline');
    
    context = context.begin("label").push(this.contentKey('contentTitleKey')).end();
    context = context.begin("span").addClass('summary').push(this.contentKey('contentSummaryKey')).end();
    
    context = context.begin("span").addClass('status');
    if (content.get('disposition') == 'New') context = context.addClass('new')
    context = context.push(this.contentKey('contentStatusKey')).end();
    
    context = context.begin("div").addClass('type-icon').addClass(this.contentKey('contentIconKey')).end();
    //context = context.begin("div").addClass('priority-icon').end();
    
    context = context.end();
    return context;
  },
  
  summary: function() {
    var content = this.get('content');
    assignments = content.get('assignments').filter(function(item) {
      return !SC.none(item) && item.get('disposition') !== 'Closed';
    });
    
    var count = assignments.get('length');
    
    if (count == 0) {
      return "No assignments";
    } else if (count >= 2) {
      return "%@ resources assigned".fmt(count);
    } else {
      var ass = assignments.firstObject();
      var when = ass.get('timestamp');
      if (!SC.none(when)) when = "for " + when.formatDuration();
      else when = '';
      
      return "%@ is %@ %@".fmt(ass.getPath("resource.name"), ass.get('disposition'), when);
    }
    
    return "Blah";
  }

});
