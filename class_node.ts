export class node{
    private action : string;
    private price : number;

    constructor(action: string, price: number){
        this.action = action;
        this.price = price;
    }

    public getaction(): string{
        return this.action;
    }

    public getprice(): number{
        return this.price
    }

    public getactionandprice(): string{
        return "Producto " + this.action + " con un costo de: " + this.price
    }
}