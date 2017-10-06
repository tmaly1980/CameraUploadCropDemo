<?php
# Run via:
# php -S 192.168.0.2:6000 -t phpUpload
# (Customize with your actual IP address)
#
if(!empty($_FILES['file']))
{
  if(move_uploaded_file($_FILES['file']['tmp_name'], './file.jpeg')) {
    echo "it worked";
  } else{
    exit;
  }
}
