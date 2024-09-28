import { Node } from "./class_node";

class Shopping{  //clase Ventas
    private buy : Node[]; //Array tipo node
    private items : number; //Cantidad de elementos existentes

    constructor(size: number){ 
        this.buy = new Array(size + 1);
        this.items = 0;
    }

    //Intercambio
    private interchange(i : number): void{ 
        //Se localiza al padre del valor ingresado
        let temp_dad: number = Math.floor(i / 2)
        //Mientras no estemos en la raíz y el valor del padre sea menor al valor del dato ingresado
        while ( i > 1 && this.buy[temp_dad].getPrice() < this.buy[i].getPrice()){ 
            //Se guarda el padre en una variable momentánea
            let momentary: Node = this.buy[temp_dad]; 
            //El padre se intercambia con el dato ingresado:
            this.buy[temp_dad] = this.buy[i]; 
            this.buy[i] = momentary; 
            //El padre subió y ahora corresponde operar ese valor
            i = temp_dad; 
            temp_dad = Math.floor(i / 2);
        }
    } 

    //Reestructurar el árbol
    private restructureTree(start: number): void {
        //Mientras que el resultado de la multiplicación sea menor o igual a la cantidad de items existentes
        while (2*start <= this.items){ 
            //Se guarda en una variable temporal la posición 2 * start Y SE ASUME QUE ES EL HIJO IZQUIERDO
            let temp_left_soon: number = 2 * start;
            //Si el valor es menor a la cantidad de elementos existentes Y
            //Si el valor de la posición del hijo izquierdo es menor al valor de la posición hijo izquierdo + 1 (HIJO DERECHO)
            if (temp_left_soon < this.items && this.buy[temp_left_soon].getPrice() < this.buy[temp_left_soon + 1].getPrice()){
                //Se cambia a hijo derecho
                temp_left_soon++; 
            }
            //Si el valor de start es mayor igual al valor del hijo izquierdo entonces se rompex
            if (this.buy[start].getPrice() >= this.buy[temp_left_soon].getPrice()){
                break;
            }
            //Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp_class : Node = this.buy[start];
            this.buy[start] = this.buy[temp_left_soon];
            this.buy[temp_left_soon] = temp_class;
            //Verificamos si procede otro intercambio hacia abajo
            start = temp_left_soon;
        }
    }

    //Cambiar de tamaño
    private resize(newSize: number): void{
        let newSale: Node[] = new Array(newSize);
        for (let i = 1; i < this.buy.length; i++){
            newSale[i] = this.buy[i];
        this.buy = newSale; //Se cambió la referencia Sales se perdió
        }
    }

    //Insertar
    public insert(value: Node): void{
        //Verifica si la cantidad de items ingresados es igual a la capacidad del array
        if(this.items == this.buy.length - 1) {
            this.resize(2 * this.buy.length);
        }

        this.items ++;
        //En la posición de items se agrega el nuevo valor
        this.buy[this.items] = value; 
        this.interchange(this.items);
    }


    //Mostrar TODO
    public showAll(): string {
        if (this.items === 0) {
            return "No hay productos disponibles";
        }
    
        let result: string[] = [];
    
        for (let i = 1; i <= this.items; i++) {
            result.push(this.buy[i].getActionPriceAndAmount());
        }
    
        return result.join("\n");
    }

    //Verifica si está vacía el array
    public isEmpty(): boolean{
        return this.items == 0;
    }

    //Cantidad de elementos existentes
    public getQuantity(): number{ 
        return this.items;
    }

    //Mostrar la raíz
    public seeMin(): string {
        return "Producto: " + this.buy[1].getAction() + "Tiene un costo de: "+ this.buy[1].getPrice();
    }

    //Ver la estructura completa del array
    public showStructureoftheList(): void{
        for (const value of this.buy){
            console.log(value);
        }
    }

    public searchAndDeleteByPrice(price: number, amountToRemove: number): string {
        // Solo se puede operar con el producto en la raíz
        if (this.items === 0 && this.buy[1].getPrice() !== price) {
            return `No se encontró ningún producto con el precio de ${price}`;
        }
    
        // Obtenemos el producto en la raíz
        let product = this.buy[1];
        
        if (product.getPrice() === price) {
            if (product.getAmount() === amountToRemove) {
                // Si la cantidad es igual a la cantidad a eliminar, eliminamos el producto
                this.buy[1] = this.buy[this.items]; // Mover el último producto a la raíz
                this.items--; // Reducir el número de productos
    
                // Reestructuramos el heap desde la raíz
                this.restructureTree(1);
    
                return `Producto vendido: ${product.getActionPriceAndAmount()}`;
            } else if (product.getAmount() > amountToRemove) {
                // Si la cantidad es mayor, solo restamos la cantidad
                // Necesitarás implementar un método para restar la cantidad, o puedes modificar la propiedad directamente
                (product as any).amount -= amountToRemove; // Restamos la cantidad
                return `Cantidad actual: ${product.getActionPriceAndAmount()}`;
            } else {
                return "No hay suficientes productos a comprar\n" +
                `Cantidad solicitada ${amountToRemove}\n` + 
                `Cantidad disponible. ${product.getAmount()}`;
            }
        }
    
        return `No se encontró ningún producto con el precio de ${price}`;
    }
}

//main
let products: Shopping = new Shopping(10);
products.insert(new Node(4,"Pollo", 23));
products.insert(new Node(5,"Galletas", 12));
products.insert(new Node(7,"Pizza", 31));
products.insert(new Node(9,"Audifonos", 100));
products.insert(new Node(12,"Higos", 12));
products.insert(new Node(32,"Papas fritas", 5));

//products.showStructureoftheList()
console.log(products.showAll())