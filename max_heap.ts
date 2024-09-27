import { Node } from "./class_node";

class Shopping{  //clase ventas
    private sale : Node[]; 
    private items : number; 

    constructor(size: number){ 
        this.sale = new Array(size + 1);
        this.items = 0;
    }

    public isEmpty(): boolean{
        return this.items == 0;
    }

    public seeMin(): string {
        return "Producto: " + this.sale[1].getAction() + "Tiene un costo de: "+ this.sale[1].getPrice();
    }

    public getQuantity(): number{ 
        return this.items;
    }

    public insert(value: Node): void{
        if(this.items == this.sale.length - 1) 
            this.resize(2 * this.sale.length);

        this.items ++;
        this.sale[this.items] = value; 
        this.swap(this.items);
    }

    private swap(i : number): void{ 
        let dad: number = Math.floor(i / 2)
        while ( i > 1 && this.sale[dad].getPrice() < this.sale[i].getPrice()){ 
            let temp: Node = this.sale[dad]; 
            this.sale[dad] = this.sale[i]; 
            this.sale[i] = temp; 
            i = dad; 
            dad = Math.floor(i / 2);
        }
    } 

    private resize(newSize: number): void{
        let newSale: Node[] = new Array(newSize);
        for (let i = 1; i < this.sale.length; i++){
            newSale[i] = this.sale[i];
        this.sale = newSale; //Se cambió la referencia Heap se perdió
        }
    }

    public getNextProduct(): string {
        if(this.items == 0){
            return "No hay productos disponibles";
        }
        let min : Node = this.sale[1]; 
        this.sale[1] = this.sale[this.items]; 
        delete this.sale[this.items]; 
        this.items --;
        this.sink(1);
        return min.getActionAndPrice();
    }

    private sink(k: number): void {
        while (2*k <= this.items){ 
            let j: number = 2*k;
            if (j < this.items && this.sale[j].getPrice() < this.sale[j + 1].getPrice()){
                j++; 
            }
            if (this.sale[k].getPrice() >= this.sale[j].getPrice()){
                break;
            }
            
            let temp : Node = this.sale[k];
            this.sale[k] = this.sale[j];
            this.sale[j] = temp;

            k = j;
        }
    }
}

//main
let products: Shopping = new Shopping(10);
products.insert(new Node("Pollo", 23));
products.insert(new Node("Galletas", 12));
products.insert(new Node("Pizza", 31));
products.insert(new Node("Audifonos", 100));
products.insert(new Node("Higos", 12));
products.insert(new Node("Papas fritas", 5));


let i: number = 0;
let limit: number = products.getQuantity();

while (i < limit){
    console.log(products.getNextProduct());
    i += 1;
}

console.log(products.getQuantity())