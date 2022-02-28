//determina el elemento que se quiere
const form=document.getElementsByTagName("form")[0];
/** @type{HTMLInputElement} */
const inputNombre=document.getElementById("nombre");
/** @type{HTMLInputElement} */
const inputPrecio=document.getElementById("precio");
/** @type{HTMLInputElement} */
const inputCantidad=document.getElementById("cantidad");
/** @type{HTMLInputElement} */
const selectCategoria=document.getElementById("categoria");
/** @type{HTMLInputElement} */
const inputCodigo=document.getElementById("codigo");
const tbody =document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");


let indice=0;
let cantidadTotal=0;
let preciosTotales=0;
let granTotal=0;
let currentRow=0;

//buscando el evento que se quiere modificar, nombre del evento, más la función que se quiere modificar
form.addEventListener("submit",onSubmit);

//función que sustituye a evento
// cuando a un comentario  multilinea se le agrega otro asterisco al inicio es para identificar el tipo de parametro es una nomencaltura oficial
/**
 * 
 * @param {Event} event 
 */
function onSubmit(event){
    event.preventDefault();//ignora lo que tiene programado por defecto y haga lo que se pide acontinuación 

    const data=new FormData(form);  //formata es un objeto propio de javascript que almacena la información de un form 
    const values =Array.from(data.entries());//obtiene la data del formulario 
    
    const [fromCodigo,frmNombre, frmCantidad, frmPrecio, frmCategoria]=values;
    
    let codigo=fromCodigo[1];
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;

    cantidadTotal=parseFloat(cantidad)+cantidadTotal;
    preciosTotales=parseFloat( precio)+preciosTotales;
    granTotal=parseFloat(total)+granTotal;
    let tr;
    if(!codigo){
        indice++;
        codigo=indice;
        tr=document.createElement("tr");
        //tr.innerHTML="<td>x</td><td>"+nombre+"</td><td>"+cantidad+"</td><td>"+precio+"</td><td>"+cantidad*precio+"</td>"+'<td><a href="#">Editar</a>|<a href="#">Eliminar</a></td>';
        tbody.appendChild(tr);
    }
    else{
        tr=currentRow;
    }
    
    
    tr.dataset.categoria=categoria; 
    //string literals, string interpolations se abre con ` y se agregan variables con ${nombre variable}
    tr.innerHTML=`
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#" onclick ="onEdit(event)">Editar</a>|<a href="#" onclick ="onDelete(event)">Eliminar</a></td>
    `;
    

    cantidadTotalElement.innerText=cantidadTotal;
    precioTotalElement.innerText=preciosTotales;
    granTotalElement.innerText=granTotal;
    form.reset();
    
}


/**
 * 
 * @param {Event} event 
 */
function onEdit(event){
    event.preventDefault();
    /** @type{HTMLAnchorElement} */
    const anchor = event.target;
    //fila
    const tr = anchor.parentElement.parentElement;
    
    const celdas=tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre,tdCantidad, tdPrecio]=celdas;
    inputCodigo.value=tdCodigo.innerText;
    inputNombre.value=tdNombre.innerText;
    inputCantidad.value=tdCantidad.innerText;
    inputPrecio.value=tdPrecio.innerText;
    selectCategoria.value=tr.dataset.categoria;

    currentRow=tr;
}

/**
 * 
 * @param {Event} event 
 */
 function onDelete(event){
    
    event.preventDefault();
    /** @type{HTMLAnchorElement} */
    const anchor = event.target;
    //fila
    const tr = anchor.parentElement.parentElement;
    tbody.removeChild(tr);



}

/*Diferencia entre const y let:
let que se pueden cambiar valores
const es para valores que se van a mantener
*/
