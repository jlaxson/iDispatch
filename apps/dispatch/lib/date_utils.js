Dispatch.DateUtils = {
  formatDuration: function(since) {
    if (SC.none(since))
      since = SC.DateTime.create();
      
    var elapsed = since.get('milliseconds') - this.get('milliseconds');
    elapsed = elapsed / 1000;
    if (elapsed < 60) {
      return "< one minute";
    } else {
      var mins = elapsed / 60;
      return "%@ minute%@".fmt(parseInt(mins), mins < 2 ? '' : 's');
    }
  }
}

SC.DateTime = SC.DateTime.extend(Dispatch.DateUtils);