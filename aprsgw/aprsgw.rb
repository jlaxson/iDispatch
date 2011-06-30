require 'rubygems'
require 'couchrest'
require 'open3'
require 'json'
require 'date'

require 'aprs-is'
require 'object-beacon'
require 'aprs-parser'

SERVER="http://localhost:5984/dispatch"
#APRS = {:server => "www.aprs2.net", :port=>14580, :call=>"KC0PZN", :pass=>-1, :filter=>'a/40/-130/30/-115'}
APRS = {:server => "localhost", :port=>2023, :call=>"KC0PZN", :pass=>21183, :path=>"WIDE1-1"}
@callsigns = {}
  
@db = CouchRest.database(SERVER)

def main

  # first setup interested callsigns
  Thread.new do
    Thread.current.abort_on_exception = true
    loop do
      load_callsigns
      sleep 300
    end
  end

  # open the APRS_IS client
  @client = APRSIS.new APRS
  @client.connect
  
  @beacon = ObjectBeacon.new(@db, SERVER, @client)
  @beacon.start
  
  @parser = APRSParser.new
  @parser.start
  
  loop do
    begin
      @client.read do |line|
        puts "Received line: " + line
        unless line.start_with? "#"
          data = @parser.parse_packet line
          handle_packet data
        end
      end
    rescue Exception => e
      puts "socket failed"
      puts e.message
    end
    sleep 1
  end
end

def handle_packet packet
  return if @callsigns[packet['srccallsign']].nil?
  
  call = nil
  if packet['type'] == 'location'
    call = packet['srccallsign'].chomp
  elsif packet['type'] == 'object'
    call = packet['objectname'].chomp
  end
  
  return if call.nil?
  id = @callsigns[call]
  return if id.nil?
  
  loc = format_location packet
  
  puts 'updating ' + id
  
  begin
    @db.update_doc(id) do |doc|
      puts call
      if doc['aprsCall'] == call
        # one last check in case the aprs call has been changed on us
        doc['location'] = loc
      end
      puts doc.inspect
      
      doc
    end
  rescue Exception => e
    puts "Error updating callsign"
    puts e.message
    puts e.backtrace.inspect
  end
end

def format_location packet
  obj = {}
  obj[:latitude] = packet['latitude']
  obj[:longitude] = packet['longitude']
  obj[:speed] = packet['speed']
  obj[:heading] = packet['course']
  obj[:updated] = DateTime.now.to_s
  
  return obj
end

def load_callsigns
  resp = @db.view "app/callsigns"
  
  hash = {}
  
  for row in resp['rows']
    hash[row['key']] = row['id']
  end
  
  @callsigns = hash
end

main
