class APRSIS
  DESTCALL = "APB2B"
  
  def initialize(params)
    @params = params
  end
  
  def connect(&block)
    @socket = TCPSocket.open(@params[:server], @params[:port])
    puts login_str
    @socket.print login_str
  end
  
  def read
    loop do 
       while line = @socket.gets
         yield(line)
       end
     end
   end
  
  def login_str
    str = "user #{@params[:call]} pass #{@params[:pass]} vers aprs-is.rb 1"
    unless @params[:filter].nil?
      str += " filter #{@params[:filter]}"
    end
    return str + "\n"
  end
  
  def transmit_object(obj)
    if obj[:name].nil? or obj[:latitude].nil? or obj[:longitude].nil?
      return
    end
    
    name = obj[:name]
    if name.length > 9
      name = name[0..8]
    end
    if name.length < 9
      name = name + (" " * (9 - name.length))
    end
    
    t = obj[:time] || Time.now
    t = t.utc
    strTime = t.strftime "%d%H%Mz"
    
    comment = obj[:comment] || ""
    if (comment.length > 43)
      comment = comment[0..43]
    end
    
    str = @params[:call]
    str += ">#{DESTCALL}" #destination
    str += ",#{@params[:path]}" if !@params[:path].nil?
    str += ":;#{name}"
    str += obj[:kill] ? "_" : "*"
    str += strTime
    str += format_lat obj[:latitude]
    str += obj[:sym_table] || '/'
    str += format_lon obj[:longitude]
    str += obj[:symbol] || '+'
    str += comment
    
    puts "prepared to send " + str
    @socket.puts str
    
  end
  
  def format_lat l
    deg = l.abs.to_f
    frac = deg % 1
    deg = deg - frac
    frac = frac * 60
    return "%02d%05.2f%s" % [deg, frac, l > 0 ? 'N' : 'S']
  end
  
  def format_lon l
    deg = l.abs.to_f
    frac = deg % 1
    deg = deg - frac
    frac = frac * 60
    return "%03d%05.2f%s" % [deg, frac, l > 0 ? 'E' : 'W']
  end
end