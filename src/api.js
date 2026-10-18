// Función para obtener el JSON de productos

export function getProducts (){
    let products = fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())            
            .then((data)=>data);
    return products;
}