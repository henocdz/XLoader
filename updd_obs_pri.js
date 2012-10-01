var cajaQ;
var cajafirst = true;
$(document).on('ready',function (){
	//Seleccionar caja sobre la cual se soltaran archivos.
	var caja = document.getElementById('caja');
	
	//Caja a utilizar con jQuery
	cajaQ = $(caja);

	//Agregar eventos
	caja.addEventListener('dragover',sobreCaja); //Archivo esta sobre la caja
	caja.addEventListener('dragleave', fueraCaja); // Archivo sale de la caja
	caja.addEventListener('drop',suelta); //Se suelta el archivo sobre la caja
});



function sobreCaja()
{
	//Agregar clase cuando el archivo este sobre la caja
	cajaQ.addClass('dragover');
}

function fueraCaja()
{
	//Quitar clase cuando el archivo este sobre la caja
	cajaQ.removeClass('dragover');
}


function suelta(e) {

	//Previene que se abra el archivo por el navegador
	e.preventDefault();
	
	//Quitar clase sober caja.
	cajaQ.removeClass('dragover');

    var f = e.dataTransfer;

    $.each(f.files,function (it,d) {


    	if(cajafirst)
    	{
    		$('#ups').slideDown('fast');
    		cajafirst = false;
    	}

    	var archivo = f.files[it];
		//Objeto que convierte la información a tipo formulario
    	var formdata = new FormData();
    	//Agregar una variable con valor a la informacion enviada por el formulario
    	formdata.append('user_file',archivo);

    	var item = $('<article class="up"></article>');
    	$('#ups').prepend(item);

    	console.log('Archivo: ' + archivo.name + ' Tamaño: ' + archivo.size + ' Tipo: ' + archivo.type)

    	if(!(validarExt(archivo.type)) || archivo.size > 250000)
    	{
    		item.text('El archivo: ' + archivo.name + ' no es valido o es muy grande');
    		item.addClass('error');
    		return true;
    	}

    	//Crear archivo AJAX			
		var xhr = new XMLHttpRequest();
    	
		item.text('Subiendo: ' + archivo.name);

    	//Abrir conexion con archivo PHP (o cualquier tipo 'server side')
	    xhr.open("POST", "upload.php", true);
	    //Enviar informacion del formulario (archivos)
	    xhr.send(formdata);        
	    	
	    //Cuando se haya terminado de subir el archivo se dispara este evento
	    xhr.onload = function(event) { 
	    	if(xhr.responseText != 'error')
	    		item.html('<a href="http://rfdz.mx/lab/updd/'+ xhr.responseText +'" title="'+archivo.name+'" target="_blank">VER IM&Aacute;GEN</a> | Archivo: ' +archivo.name);
	    	else
	    	{
	    		item.text('Error, archivo: ' + archivo.name);
    			item.addClass('error');
	    	}
	    };

    });
}


function validarExt (tipoArchivo) {

	if(tipoArchivo.indexOf('image/jpeg') >= 0 || tipoArchivo.indexOf('image/png') >= 0 || tipoArchivo.indexOf('image/gif') >= 0)
		return true;
	else
		return false;


}
