<?php

$error_message[0] = "Unknown problem with upload.";
$error_message[1] = "Uploaded file too large (load_max_filesize).";
$error_message[2] = "Uploaded file too large (MAX_FILE_SIZE).";
$error_message[3] = "File was only partially uploaded.";
$error_message[4] = "Choose a file to upload.";

$upload_dir  = './tmp/';
$upload_file = $upload_dir . basename($_FILES['user_file']['name']);

        if (is_uploaded_file($_FILES['user_file']['tmp_name'])) {
            if (move_uploaded_file($_FILES['user_file']['tmp_name'],$upload_file)) {
                /* Great success... */
            } else {
                echo $_FILES['user_file']['error'];
            }
        } else {
            echo $_FILES['user_file']['error'];
        }    

?>