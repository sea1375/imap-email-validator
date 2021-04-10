<?php 
    // $host = "{imap.yahoo.co.uk:993/imap/ssl}INBOX";
    // $username = "kusnohadie-hangman";
    // $password = "787DrmLnr1708241092";

    // $inbox = imap_open($host,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());

    // var_dump($inbox);
    $imap_server = $_POST['imap_server'];
    $host = "{" . $imap_server . ":993/imap/ssl/novalidate-cert}";
    $username = $_POST['imap_server'];
    $password = $_POST['imap_server'];

    try {
        $inbox = imap_open($host,$username,$password);
        if ($inbox) {
            echo json_encode(array(
                'success' => true
            ));
        } else {
            echo json_encode(array(
                'success' => false
            ));
        }
        
    } catch (Exception $e) {
        echo json_encode(array(
            'success' => false
        ));
    }
?>