# ===========================================================================
# Project:   Menu
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :"sproutcore/animation", "sproutcore/forms", :"iweb/iweb"]
config :all, :url_prefix => "/dispatch/_design/app"

config :dispatch, :required => [:sproutcore, :'sproutcore/foundation', :'sproutcore/datastore', 'sproutcore/desktop', 'sproutcore/animation', 'g_map', 'scuds/couch_db', :"iweb/iweb", :'sproutcore/forms'], :theme => :"sproutcore/ace"

proxy '/dispatch-dev', :to => 'localhost:5984'
proxy '/dispatch', :to => 'localhost:5984'
proxy '/_uuids', :to => 'localhost:5984'