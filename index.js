const paraghaphs = document.getElementsByTagName("p");
console.log("parrafos en el documento: "+paraghaphs.length);

if(paraghaphs.length>0){

    const paragraph =paraghaphs[0];
    paragraph.innerText="Bienvenidos al bootcamp";
}

