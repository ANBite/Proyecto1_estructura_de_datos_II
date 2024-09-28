export class Node{
    private action : string;
    private price : number;
    private amount: number;

    constructor(amount: number, action: string, price: number){
        this.action = action;
        this.price = price;
        this.amount = amount;
    }

    public getAction(): string{
        return this.action;
    }

    public getPrice(): number{
        return this.price;
    }

    public getAmount(): number{
        return this.amount;
    }

    public getActionPriceAndAmount(): string{
        return "| Nombre: " + this.action + " | existen: " + this.amount + " productos | Con un precio de: " + this.price + "|" 
    }
}