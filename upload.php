<?php

$error_message[0] = "Unknown problem with upload.";
$error_message[1] = "Uploaded file too large (load_max_filesize).";
$error_message[2] = "Uploaded file too large (MAX_FILE_SIZE).";
$error_message[3] = "File was only partially uploaded.";
$error_message[4] = "Choose a file to upload.";

$upload_dir  = './tmp/';

$file_type = $_FILES['user_file']['type'];


		if(strpos($file_type,'jpeg'))
			$ext = ".jpg";
		else if(strpos($file_type,'png'))
			$ext = '.png';
		else if(strpos($file_type,'gif'))
			$ext = '.gif';
		else
		{
			echo 'error';
			exit();
		}


$upload_file = $upload_dir . generador(10,true,true,true,false) . $ext;

        if (is_uploaded_file($_FILES['user_file']['tmp_name'])) {
            if (move_uploaded_file($_FILES['user_file']['tmp_name'],$upload_file)) {
               echo  $upload_file;
            } else {
                echo 'error';
            }
        } else {
            echo 'error';
        }   


function generador($longitud,$letras_min,$letras_may,$numeros,$simbolos)
{
	$variacteres = $letras_min?'abdefghijklmnopqrstuvwxyz':'';
	$variacteres .= $letras_may?'ABDCEFGHIJKLMNOPQRSTUVWXYZ':'';
	$variacteres .= $numeros?'0123456789':'';
	$variacteres .= $simbolos?'-_-':'';
	
	$i = 0;
	$clv = '';

	while($i<$longitud)
		{
			$numrad = rand(0,strlen($variacteres)-1);
			$clv .= substr($variacteres,$numrad,1);
			$i++;
		}		
	return $clv;
} 

?>