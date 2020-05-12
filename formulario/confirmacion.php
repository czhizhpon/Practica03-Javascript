<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<link href="css/formulario_layout.css" rel="stylesheet"/>
	<script src="js/validar_formulario.js"></script>
	<title>Formulario</title>
</head>
<body>
	<section>
        <p>
            Bienvenido <?php echo $_POST["i_name"]; 
            echo " ";
            echo $_POST["i_lastname"];
            ?>.
            <br/>
            Pasó las validaciones!
        </p>
	</section>
</body>
</html>
