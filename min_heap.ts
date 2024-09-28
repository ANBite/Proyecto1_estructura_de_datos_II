import { Node } from "./class_node";

class Sales{  //clase Ventas
    private sale : Node[]; //Array tipo node
    private items : number; //Cantidad de elementos existentes

    constructor(size: number){ 
        this.sale = new Array(size + 1);
        this.items = 0;
    }

    //Intercambio
    private interchange(i : number): void{ 
        //Se localiza al padre del valor ingresado
        let temp_dad: number = Math.floor(i / 2)
        //Mientras no estemos en la raíz y el valor del padre sea mayor al valor del dato ingresado
        while ( i > 1 && this.sale[temp_dad].getPrice() > this.sale[i].getPrice()){ 
            //Se guarda el padre en una variable momentánea
            let momentary: Node = this.sale[temp_dad]; 
            //El padre se intercambia con el dato ingresado:
            this.sale[temp_dad] = this.sale[i]; 
            this.sale[i] = momentary; 
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
            //Si el valor de la posición del hijo izquierdo es mayor igual al valor de la posición hijo izquierdo + 1 (HIJO DERECHO)
            if (temp_left_soon < this.items && this.sale[temp_left_soon].getPrice() >= this.sale[temp_left_soon + 1].getPrice()){
                //Se cambia a hijo derecho
                temp_left_soon++; 
            }
            //Si el valor de start es menor igual al valor del hijo izquierdo entonces se rompex
            if (this.sale[start].getPrice() <= this.sale[temp_left_soon].getPrice()){
                break;
            }
            //Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp_class : Node = this.sale[start];
            this.sale[start] = this.sale[temp_left_soon];
            this.sale[temp_left_soon] = temp_class;
            //Verificamos si procede otro intercambio hacia abajo
            start = temp_left_soon;
        }
    }

    //Cambiar de tamaño
    private resize(newSize: number): void{
        let newSale: Node[] = new Array(newSize);
        for (let i = 1; i < this.sale.length; i++){
            newSale[i] = this.sale[i];
        this.sale = newSale; //Se cambió la referencia Sales se perdió
        }
    }

    //Insertar
    public insert(value: Node): void{
        //Verifica si la cantidad de items ingresados es igual a la capacidad del array
        if(this.items == this.sale.length - 1) {
            this.resize(2 * this.sale.length);
        }

        this.items ++;
        //En la posición de items se agrega el nuevo valor
        this.sale[this.items] = value; 
        this.interchange(this.items);
    }


    //Mostrar TODO
    public showAll(): string {
        let temp_count : number = this.items;
        while (true) {
            if(temp_count == 0){
                return "No hay productos disponibles";
            }
    
            //Se obtiene el valor de la posición 1 (raíz)
            let minimun : Node = this.sale[1];
            //Se cambia el valor de la posición 1 con la posición útlima
            this.sale[1] = this.sale[temp_count];
            //se elimina el último elemento de la lista 
            //delete this.sale[temp_count]; 
            temp_count --;
            //Se restructura el arbol otra vez, partiendo desde la raíz
            this.restructureTree(1);
            return minimun.getActionAndPrice();
        }
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
        return "Producto: " + this.sale[1].getAction() + "Tiene un costo de: "+ this.sale[1].getPrice();
    }
}

//main
let products: Sales = new Sales(10);
products.insert(new Node("Pollo", 23));
products.insert(new Node("Galletas", 12));
products.insert(new Node("Pizza", 31));
products.insert(new Node("Audifonos", 100));
products.insert(new Node("Higos", 12));
products.insert(new Node("Papas fritas", 5));



let i: number = 0;
let limit: number = products.getQuantity();

while (i < limit){
    console.log(products.showAll());
    i += 1;
}



