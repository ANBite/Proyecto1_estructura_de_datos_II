export class Node{
    private action : string;
    private price : number;

    constructor(action: string, price: number){
        this.action = action;
        this.price = price;
    }

    public getAction(): string{
        return this.action;
    }

    public getPrice(): number{
        return this.price
    }

    public getActionAndPrice(): string{
        return "Producto " + this.action + " con un costo de: " + this.price
    }
}