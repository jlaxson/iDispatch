use JSON;
use Ham::APRS::FAP qw(parseaprs);

select(STDOUT);
$| = 1;

while ($packet = <>) {
    %decodedPacket = {};
    parseaprs($packet, \%decodedPacket);
    $json = encode_json(\%decodedPacket);
    printf $json . "\n";
}