<?php

if(isset($_POST['enviar'])){
    $correo = $_POST['correo']; // recipient's email address
    $subject = 'Hola desde PHP'; // email subject
    $message = $_POST['mensaje']; // email body
    $to = 'ortegagivrain@gmail.com';
    $nombre = $_POST['nombre'];
    
    // Additional headers
    // $headers = 'From: yourname@example.com' . "\r\n" .
    //     'Reply-To: yourname@example.com' . "\r\n" .
    //     'X-Mailer: PHP/' . phpversion();
    $contenido = "Nombre: ". $nombre . "\nCorreo: ". $correo . "\nMensaje: ". $mensaje;
    // Send the email
    $mailSent = mail($to, $subject, $message);
    
    // Check if the email was sent successfully
    if ($mailSent) {
        // echo 'Email sent successfully.';
        header("location: contacto.php");
    } else {
        echo 'An error occurred. Email not sent.';
    }
}
?>