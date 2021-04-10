<?php 
    $host = "{imap.yahoo.co.uk:993/imap/ssl}INBOX";
    $username = "kusnohadie-hangman";
    $password = "787DrmLnr1708241092";

    $inbox = imap_open($host,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());

    var_dump($inbox);
?>