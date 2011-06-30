require 'aprs-is'
require 'net/http'
require 'uri'
require 'json'

class ObjectBeacon
  
  @transmit_interval = 20
  attr_accessor :transmit_interval
  
  def initialize(server, url, aprs_client)
    @db = server
    @url = url
    @client = aprs_client
    
    @seq = 0
    @transmit_interval = 20
    
    @objects = {}
  end
  
  def start
    
    # load objects and do initial xmit, then setup peridoic timers + polling system
    incidents = @db.view("app/incidentsToTransmit")
    incidents['rows'].each do |r|
      inc = r['value']
      if inc['disposition'] != 'Closed'
        @objects[inc['_id']] = inc
      end
    end

    @transmit_thread = Thread.new do
      Thread.current.abort_on_exception = true
      loop do
        transmit_incidents
        sleep @transmit_interval
      end
    end
    
    @poll_thread = Thread.new do
      Thread.current.abort_on_exception = true
      url = URI.parse @url
      
      Net::HTTP.start(url.host, url.port) do |http|
        http.request_get(url.path + '/_changes') do |resp|
          data = JSON.parse(resp.body)
          @seq = data['last_seq']
        end
      end
      
      loop do
        poll_loop
      end
    end
    
  end
  
  def transmit_incidents
    @objects.each do |id, inc|
      prepare_incident inc
    end
  end
  
  def prepare_incident(incident, kill = false)
    loc = incident['location']

    return if loc.nil?

    out = {}
    out[:name] = incident['description']
    out[:longitude] = loc['longitude']
    out[:latitude] = loc['latitude']
    out[:kill] = (incident['disposition'] == 'Closed') || kill
    out[:comment] = incident['disposition']||'' + " iCAD APRS-GW"

    puts out.inspect

    @client.transmit_object out
  end
  
  def poll_loop
    begin
      url = URI.parse @url
      
      Net::HTTP.start(url.host, url.port) do |http|
        #todo: include filter here
        http.request_get(url.path + "/_changes?feed=continuous&include_docs=true&since=#{@seq}&heartbeat=5") do |resp|
          resp.read_body do |str|
            if str != "\n"
              data = JSON.parse str
              puts 'received ' + data.inspect
              @seq = data['seq']
              handle_update data['doc']
            end
          end
        end
      end
    end
  end
  
  def handle_update(data) 
    return if data['recordType'] != 'incident'
    
    if data['disposition'] == 'Closed'
      # if we still know about it, need to send a kill
      if !@objects[data['_id']].nil?
        prepare_incident data
        @objects.delete data['_id']
      end
    else
      old = @objects[data['_id']]
      if old.nil? || old['location'].nil?
        #this is a new object
        prepare_incident data
      elsif data['description'] != old['description']
        puts 'must change name'
        #must delete old one and create new one
        prepare_incident old, true
        prepare_incident data
      elsif data['disposition']==old['disposition'] && data['location']['longitude']==old['location']['longitude'] && data['location']['latitude']==old['location']['latitude']
        return;
      else
        prepare_incident data
      end
      @objects[data['_id']] = data
    end
  end
end