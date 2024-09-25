import { node } from "./class_node";

class MinHeapTask{
    //Atributos
    private heap : node[]; //Montículo creado como array tipo numérico
    private n : number; //n = cantidad de elementos

    constructor(size: number){ //Recibe el tamaño que tendrá el array
        this.heap = new Array(size + 1); //Se inicializa un nuevo array, si se ingresan 3 elementos, el size debe ser 3 + 1
        this.n = 0;
    }
    //Métodos
    public isEmpty(): boolean{ //Verifica si el array está vacía
        return this.n == 0;

    }

    public checkMin(): string {
        return this.heap[1].getNameTask() +" -"+ "\nPrioridad: "+ this.heap[1].getPriorityTask(); //Se accede a la raíz de las tareas que hay en task
    }

    public getQuantity(): number{ //Es un método porque retorna algo
        return this.n;
    }

    public insert(value: Task): void{ //Es un procedimiento porque es void, recibe un valor de tipo numérico
        if(this.n == this.heap.length - 1) //Lenght da la cantidad de elementos || - 1 para evitar desbordamiento
            this.resize(2 * this.heap.length);
            //this.heap.push  Puede agregar más espacios
            //this.heap.pop   puede eliminar espacios
        this.n ++;
        this.heap[this.n] = value; //En la posición de n se agrega el valor
        this.swap(this.n);
    }

    private swap(i : number): void{ //necesita un valor numérico
        let father: number = Math.floor(i / 2) //La variable padre se obtiene dividiendo la posición de n partido 2
        while ( i > 1 && this.heap[father].getPriorityTask() > this.heap[i].getPriorityTask()){ //Donde los elementos en la posición padre sea menor que la posición i
            let temp: Task = this.heap[father]; //Variable temporal que guarda temporalmente al padre
            this.heap[father] = this.heap[i]; //Padre apunta al objeto de i
            this.heap[i] = temp; //Ahora i apunta a temp, o sea, al Padre
            i = father; //El padre subió y ahora corresponde operar ese valor
            father = Math.floor(i / 2);
        }
    } 

    private resize(newSize: number): void{
        let newHeap: Task[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++){
            newHeap[i] = this.heap[i];
        this.heap = newHeap; //Se cambió la referencia Heap se perdió
        }
    }

    public getNextTask(): string {
        if(this.n == 0)
            return "No hay tareas pendientes"
        let min : Task = this.heap[1]; //Se obtiene el valor de la posición 1
        this.heap[1] = this.heap[this.n]; //Se cambia el valor de la posición 1, con el valor de la última posición
        //delete this.heap[this.n]; //Se elimina el último elemento de la lista
        this.n --;
        this.sink(1) //Es un procedimiento que reestructura el arbol AVL, parte de la posición 1 porque está en la raíz
        return min.getNameandPriority();
    }

    private sink(k: number): void {
        while (2*k <= this.n){ 
            let j: number = 2*k //hijo izquierdo #Empezamos asumiendo que el hijo izquierdo es el menor
            if (j < this.n && this.heap[j].getPriorityTask() >= this.heap[j + 1].getPriorityTask()) //Si El hijo izquiero es menor que la cantidad de numeros ingresados
                j++; //cambia a hijo derecho si este es el menor                   //Y si es mayor que el hijo derecho
            if (this.heap[k].getPriorityTask() <= this.heap[j].getPriorityTask())
                break;
            //Hacemos intercambio burbuja entre los nodos para que el menor quede en la raíz
            let temp : Task = this.heap[k];
            this.heap[k] = this.heap[j];
            this.heap[j] = temp;
            //Verificamos si procede otro intercambio hacia abajo
            k = j;
        }
    }


    public print(): void{
        let tree: string = ""; //cadena vacía
        for (const value of this.heap){
            tree += " " + value.getNameTask() + " ";
        }
        console.log(tree);
    }
}

//main
let pendientes: MinHeapTask = new MinHeapTask(6);
pendientes.insert(new Task("Estudiar estructuras 2", 1))
pendientes.insert(new Task("Escuchar música", 2))
pendientes.insert(new Task("Jugar Valo", 3))
pendientes.insert(new Task("Completar códigos", 1))
pendientes.insert(new Task("Ver videos", 5))
pendientes.insert(new Task("Comer galletita", 2))

console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
console.log(`La siguiente tarea a calificar es: ${pendientes.getNextTask()}`)
