<?php
    include("connect.php");
    //per togliere i caratteri problematici tipo apostrofi
    $testo =  $_POST['testo'];
    //per l'apostrofo
    $testo = pg_escape_string($testo);
    //per prendere tutte le righe
    //$textList = preg_split('/\r\n|\r|\n/', $testo);

    $textList = json_encode($testo);
    echo $textList;
    echo $testo;
    
    foreach($textList as $row){
        echo $row;
        $query = "INSERT INTO Post (testo, categoria) VALUES ('$row', 1)";
        $result = pg_query($conn, $query);
        echo pg_fetch_all($result);
    }

    include("disconnect.php");
?>
<script>
    //window.location.replace("https://im2drunk4u.herokuapp.com");
</script>
<div>
    <a href="https://im2drunk4u.herokuapp.com"> HOME </a>
</div>