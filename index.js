//FALTA VALIDAR QUE EN EL INPUT DE LAS CANTIDADES NO SE PUEDAN AGREGAR LETRAS Y LA EXPRESION REGULAR EN EL INPUT DE CORREO

//DECLARANDO E INICIALIZANDO LOS ARREGLOS
let codigos=["42514","54114","69874","44444","10366"]; 
let nombres=["Jabon Palmolive","Harina Pan","Azucar Morena","Sal de Mar","Tang"]; 
let precios=[12.5,1.5,5,10.2,20.68]; 
let existencias=[25,55,50,30,42]

//VALIDANDO CORREO ELECTRONICO
function validarCorreo(correo,expReg){
    if(expReg==undefined) expReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (expReg.test(correo))
}
//CAMBIANDO EL COLOR DE FONDO
function cambiarFondo(num){
    switch(num){
        case 1: window.document.bgColor = "blue";
        break;
        case 2: window.document.bgColor = "red";
        break;
        case 3: window.document.bgColor = "white";
        break;
        case 4: window.document.bgColor = "grey";
        break;
        case 5: window.document.bgColor = "black";
        break;
        case 6: window.document.bgColor = "yellow";
        break;
        case 7: window.document.bgColor = "green";
        break;
    }
}
window.onload = function (){
    //INICIALIZANDO CAMPOS Y VARIABLES
    let tabla;
    let acumSubTotal=0,iva=0,total=0;
    document.getElementById("subtotal").disabled="true";
    document.getElementById("iva").disabled="true";
    document.getElementById("total").disabled="true";
    document.getElementById("subtotal").value="0";
    document.getElementById("iva").value="0";
    document.getElementById("total").value="0";
    form_articulos.subtotal.disabled=true;
    form_articulos.precio.disabled=true;
    form_articulos.cantidad.disabled=true;
    
    //------------OBJETIVO 1-------------
    //ACCIONES CON EL ENTER
    form_articulos.codigo.addEventListener("keydown",(event)=>{
        if(event.keyCode==13)
            if(codigos.indexOf(form_articulos.codigo.value)==-1){
                alert("El Producto no ha sido encontrado");
                form_articulos.codigo.value = "";
                form_articulos.cantidad.value="";
                form_articulos.articulo.value="";
                form_articulos.precio.value="";
                form_articulos.subtotal.value="";
            }else{
                let position = codigos.indexOf(form_articulos.codigo.value);
                //COLOCANDO LOS VALORES DEL PRODUCTO EN LOS INPUTS
                form_articulos.articulo.value=nombres[position];
                form_articulos.precio.value=precios[position];
                form_articulos.cantidad.disabled=false;
            }
    })
    //ACCIONES CON EL ONBLUR
    form_articulos.codigo.onblur = function (){
        if(form_articulos.codigo.value.trim().length != 0)
            if(codigos.indexOf(form_articulos.codigo.value)==-1){
                alert("El Producto no ha sido encontrado");
                form_articulos.codigo.value = "";
                form_articulos.cantidad.value="";
                form_articulos.articulo.value="";
                form_articulos.precio.value="";
                form_articulos.subtotal.value="";
            }else{
                let position = codigos.indexOf(form_articulos.codigo.value);
                //COLOCANDO LOS VALORES DEL PRODUCTO EN LOS INPUTS
                form_articulos.articulo.value=nombres[position];
                form_articulos.precio.value=precios[position];
                form_articulos.cantidad.disabled=false;
            }
    }

    //------------OBJETIVO 2--------------
    //VALIDANDO QUE NO SE ESCRIBAN LETRAS NI SE SUPEREN EXISTENCIAS
    //CON EL KEYDOWN
    form_articulos.cantidad.onkeydown = (event)=>{
        //VALIDANDO QUE NO SE INGRESEN LETRAS
        
        let letra = event.key
        if (event.keyCode == 8 || event.keyCode == 9) {
            return true;
        }
        else
            if (event.keyCode == 13) {
                if (form_articulos.cantidad.value < 1) {
                    alert("Debe vender al menos 1 producto")
                    form_articulos.cantidad.value = "";
                    form_articulos.subtotal.value = "";
                } else
                    if (form_articulos.cantidad.value > existencias[codigos.indexOf(form_articulos.codigo.value)]) {
                        alert("La Cantidad Introducida es Mayor que las Existencias Disponibles");
                        form_articulos.cantidad.value = "";
                        form_articulos.subtotal.value = "";
                    }
            } else
                if (!/[0-9]/.test(letra))
                    return false;
                
    }
    //VALIDANDO QUE NO SE SUPEREN EXISTENCIAS CON EL BLUR
    form_articulos.cantidad.addEventListener("blur",()=>{
        if(form_articulos.cantidad.value.trim().length != 0)
            if(form_articulos.cantidad.value<1){
                alert("Debe vender al menos 1 producto")
                form_articulos.cantidad.value="";
                form_articulos.subtotal.value="";
            }else 
                if(form_articulos.cantidad.value>existencias[codigos.indexOf(form_articulos.codigo.value)]){
                    alert("La Cantidad Introducida es Mayor que las Existencias Disponibles");
                    form_articulos.cantidad.value="";
                    form_articulos.subtotal.value="";
                }
    })

    //----------OBJETIVO 3------------
    //ACTUALIZANDO CAMPO DEL SUBTOTAL CON KEYUP
    form_articulos.cantidad.addEventListener("keyup", function (){
        form_articulos.subtotal.value=form_articulos.cantidad.value*form_articulos.precio.value;
    })

    //-----------OBJETIVO 4------------
    //VALIDANDO EL CORREO DANDO ENTER
    document.getElementById("correo").addEventListener("keydown",(event)=>{
        if(document.getElementById("correo").value.trim().length!=0)
            if(event.key == "Enter")
                if (!validarCorreo(document.getElementById("correo").value)){
                    alert("Correo Invalido.")
                    document.getElementById("correo").value="";
                }
    })
    //VALIDANDO EL CORREO CON EL ONBLUR
    document.getElementById("correo").onblur = function (){
        if(document.getElementById("correo").value.trim().length!=0)
            if (!validarCorreo(document.getElementById("correo").value)){
                alert("Correo Invalido.")
                document.getElementById("correo").value="";
            }
    }
    
    //--------OBJETIVO 5-----------
    let m=0,s=0,aux=0;
    setInterval(()=>{
        if(s==60){
            m++;
            s=0;
        }else 
            if(aux==20){
                cambiarFondo(Math.floor(Math.random()*(7-1)+1))
                aux=0;
            }else{
                    aux++
                    s++
                }
        document.title=`${m}:${s}`
    },1000)
//---------- CODIGO DEL DESAFIO ANTERIOR ----------

    //ONCLICK DEL BOTON DE AGREGAR
    document.form_articulos.btn_agregar.onclick = ()=>{
        let articulo = form_articulos.articulo.value;
        let precio = form_articulos.precio.value;
        let cantidad = form_articulos.cantidad.value;
        let codigo = form_articulos.codigo.value;
        tabla = document.getElementById("tabla_fact");

        //VALIDANDO QUE LOS CAMPOS NO ESTEN VACÍOS
        if (articulo.trim().length == 0 || precio.trim().length == 0 || cantidad.trim().length == 0 || codigo.trim().length == 0) {
            alert("Error: No deben haber Campos Vacíos")
        } else
            //VALIDANDO QUE EL PRECIO Y LA CANTIDAD SEAN MAYORES A 0
            if (precio <= 0 || cantidad <= 0)
                alert("Error: El precio y la cantidad deben ser mayores a 0");
            else {
                //ACTUALIZANDO LAS VARIABLES DE LOS ULTIMOS INPUTS
                acumSubTotal+=precio*cantidad;
                iva=acumSubTotal*0.16;
                total=acumSubTotal+iva;
                // INSERTANDO LA NUEVA FILA
                let nuevaFila = tabla.insertRow(-1);
                //INSERTANDO LAS CELDAS A LA FILA
                for (let i = 0; i < 5; i++) {
                    let nuevaCelda = nuevaFila.insertCell(-1);
                }

                //CREANDO EL BOTON Y ASIGNANDOLE EL EVENTO PARA ELIMINAR LA FILA
                let btn = document.createElement("input")
                btn.type = "button"
                btn.value = "Eliminar"
                btn.onclick = function(){
                    tabla.deleteRow(nuevaFila.rowIndex)
                    //ACTUALIZANDO LAS VARIABLES
                    acumSubTotal=acumSubTotal-nuevaFila.cells[3].innerText;
                    iva=acumSubTotal*0.16;
                    total=acumSubTotal+iva;
                    //ACTUALIZANDO LOS CAMPOS
                    document.getElementById("subtotal").value=acumSubTotal;
                    document.getElementById("iva").value=iva;
                    document.getElementById("total").value=total;
                }

                //LLENANDO LAS CELDAS DE LA NUEVA FILA
                nuevaFila.cells[0].innerText = articulo.toUpperCase();
                nuevaFila.cells[1].innerText = precio;
                nuevaFila.cells[2].innerText = cantidad;
                nuevaFila.cells[3].innerText = cantidad * precio;
                nuevaFila.cells[nuevaFila.cells.length - 1].appendChild(btn);

                //LLENANDO LOS INPUTS DEL FINAL
                document.getElementById("subtotal").value=acumSubTotal;
                document.getElementById("iva").value=iva;
                document.getElementById("total").value=total;
            }
    }

    //ONCLICK DEL BOTON DE TERMINAR
    document.getElementById("terminar").onclick = function () {
        tabla = document.getElementById("tabla_fact");
        let finalizar;
        let nombre = document.getElementById("nombre");
        let rif = document.getElementById("rif");
        let direccion = document.getElementById("direccion");
        let correo = document.getElementById("correo");

        if (nombre.value.trim().length == 0 || rif.value.trim().length == 0 || direccion.value.trim().length == 0 || correo.value.trim().length == 0) {
            alert("Los Datos del Usuario no deben estar Vacíos");
        } else {
            if (tabla.rows.length <= 1) {
                alert("La Tabla Debe tener al Menos un Articulo")
            } else {
                finalizar = confirm("¿Desea Terminar La Factura?");
                if (finalizar) {
                    //BORRANDO LOS DATOS DEL CLIENTE
                    nombre.value = "";
                    rif.value = "";
                    direccion.value = "";
                    //ELIMINANDO LOS DATOS DE LA TABLA
                    cantFilas = tabla.rows.length
                    for (let i = 1; i < cantFilas; i++) {
                        tabla.deleteRow(-1);
                    }
                    //REINICIANDO LOS MONTOS TOTALES
                    acumSubTotal = 0
                    iva = 0
                    total = 0;
                    //SETEANDO LOS VALORES A LOS INPUTS
                    document.getElementById("subtotal").value = acumSubTotal;
                    document.getElementById("iva").value = iva;
                    document.getElementById("total").value = total;
                    //SETEANDO VALORES POR DEFECTO DEL FORMULARIO
                    document.form_articulos.articulo.value = "";
                    document.form_articulos.precio.value = "";
                    document.form_articulos.cantidad.value = "";
                    document.form_articulos.codigo.value="";
                    document.form_articulos.subtotal.value = "";
                    document.getElementById("correo").value="";
                }
            }
        }

    }

}