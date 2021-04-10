<?php 
    $host = "{imap.mail.ru:993/imap/ssl/novalidate-cert}";
    $username = "maksim.matveev98@mail.ru";
    $password = "ryddlf199082";

    $inbox = imap_open($host,$username,$password, NULL, 1, array('DISABLE_AUTHENTICATOR' => 'GSSAPI')) or die('Cannot connect: ' . imap_last_error());

    var_dump($inbox);
	
	imap_close($inbox);

    // $imap_server = $_POST['imap_server'];
    // $host = "{" . $imap_server . ":993/imap/ssl/novalidate-cert}";
    // $username = $_POST['imap_server'];
    // $password = $_POST['imap_server'];

    // try {
    //     $inbox = imap_open($host,$username,$password);
    //     if ($inbox) {
    //         echo json_encode(array(
    //             'success' => true
    //         ));
    //     } else {
    //         echo json_encode(array(
    //             'success' => false
    //         ));
    //     }
        
    // } catch (Exception $e) {
    //     echo json_encode(array(
    //         'success' => false
    //     ));
    // }
?>