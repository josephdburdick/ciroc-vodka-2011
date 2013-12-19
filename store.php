<?php
$mysql_host = 'db398792411.db.1and1.com';
$mysql_user = 'dbo398792411';
$mysql_password = 'sgc12345';
$mysql_database = 'db398792411';

@mysql_connect($mysql_host, $mysql_user, $mysql_password);
@mysql_select_db($mysql_database);
@mysql_set_charset('utf8');

$city = strtoupper(str_replace(array('%', '?'), '', trim($_POST['city'])));
$state = strtoupper(str_replace(array('%', '?'), '', trim($_POST['state'])));

if ( $city != '' || $state != '' ) {
	$where = $city != '' ? "UPPER(city) LIKE '$city%'" : '';
	$where .= $where == '' ? "UPPER(state) LIKE '$state%'" : ( $state != '' ? " AND UPPER(state) LIKE '$state%'" : '' );

	$result = @mysql_query("SELECT name, address, city, state FROM store WHERE $where");
	if ( @mysql_num_rows($result) > 0 ) {
		while ( $row = @mysql_fetch_row( $result ) )
			echo '<p>'.$row[0].'<em>'.$row[1].'<br>'.$row[2].', '.$row[3].'</em><a href="http://maps.google.com/?q='.str_replace(array(',', ' '), '+', $row[0].' '.$row[1].' '.$row[2].' '.$row[3]).'&output=embed" target="_blank">View map</a></p>';
	} else {
		echo '1';
	}
} else {
	echo '1';
}
?>