import { Node } from "./class_node";

class Sales{  //clase ventas
    private heap : Node[]; 
    private n : number; //Cantidad de elementos en la lista

    constructor(size: number){ 
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public isEmpty(): boolean{
        return this.n == 0;

    }

    public checkMin(): string {
        return "Producto: " + this.heap[1].getAction() + "Tiene un costo de: "+ this.heap[1].getPrice();
    }

    public getQuantity(): number{ 
        return this.n;
    }

    public insert(value: Node): void{
        if(this.n == this.heap.length - 1) 
            this.resize(2 * this.heap.length);
            //this.heap.push  Puede agregar más espacios
            //this.heap.pop   puede eliminar espacios
        this.n ++;
        this.heap[this.n] = value; 
        this.swap(this.n);
    }

    private swap(i : number): void{ 
        let father: number = Math.floor(i / 2) 
        while ( i > 1 && this.heap[father].getPrice() > this.heap[i].getPrice()){ 
            let temp: Node = this.heap[father]; //Variable temporal que guarda temporalmente al padre
            this.heap[father] = this.heap[i]; //Padre apunta al objeto de i
            this.heap[i] = temp; //Ahora i apunta a temp, o sea, al Padre
            i = father; //El padre subió y ahora corresponde operar ese valor
            father = Math.floor(i / 2);
        }
    } 

    private resize(newSize: number): void{
        let newHeap: Node[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++){
            newHeap[i] = this.heap[i];
        this.heap = newHeap; //Se cambió la referencia Heap se perdió
        }
    }

    public getNextTask(): string {
        if(this.n == 0)
            return "No hay productos disponibles"
        let min : Node = this.heap[1]; //Se obtiene el valor de la posición 1
        this.heap[1] = this.heap[this.n]; //Se cambia el valor de la posición 1, con el valor de la última posición
        //delete this.heap[this.n]; //Se elimina el último elemento de la lista
        this.n --;
        this.sink(1) //Es un procedimiento que reestructura el arbol AVL, parte de la posición 1 porque está en la raíz
        return min.getActionAndPrice();
    }

    private sink(k: number): void {
        while (2*k <= this.n){ 
            let j: number = 2*k //hijo izquierdo #Empezamos asumiendo que el hijo izquierdo es el menor
            if (j < this.n && this.heap[j].getPrice() >= this.heap[j + 1].getPrice()) //Si El hijo izquiero es menor que la cantidad de numeros ingresados
                j++; //cambia a hijo derecho si este es el menor                   //Y si es mayor que el hijo derecho
            if (this.heap[k].getPrice() <= this.heap[j].getPrice())
                break;
            //Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp : Node = this.heap[k];
            this.heap[k] = this.heap[j];
            this.heap[j] = temp;
            //Verificamos si procede otro intercambio hacia abajo
            k = j;
        }
    }


    public print(): void{
        let tree: string = ""; 
        for (const value of this.heap){
            tree += " " + value.getAction() + " ";
        }
        console.log(tree);
    }
}

//main
let pendientes: Sales = new Sales(10);
pendientes.insert(new Node("Estudiar estructuras 2", 1))
pendientes.insert(new Node("Escuchar música", 2))
pendientes.insert(new Node("Jugar Valo", 3))
pendientes.insert(new Node("Completar códigos", 1))
pendientes.insert(new Node("Ver videos", 5))
pendientes.insert(new Node("Comer galletita", 2))

console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)