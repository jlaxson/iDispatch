class APRSParser
  def start
    @in, @out, @err = Open3.popen3("perl parser.pl")
  end
  
  def parse_packet input
    @in.puts input
    str = @out.gets
    data = JSON.parse str
    return data
  end
end