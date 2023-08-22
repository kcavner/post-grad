class gate{
    constructor(sig1,sig2){
        this.sig1 = sig1;
        this.sig2 = sig2
}
    and(){
        if(this.sig1&&this.sig2 === true){
            return true
        }else{
            return false
        }
    }
    or(){
        if(this.sig1 || this.sig2 === true){
            return true
        }else{
            return false
        }
    }
    xnor(){
        if(this.sig1&&this.sig2 === true || this.sig1&&this.sig2 === false){
            return true
        }else{
            return false
        }
    }
    nand(){
        if(this.sig1&&this.sig2 === true){
            return false
        }else{
            return true
        }
    }
    nor(){
        if(this.sig1 || this.sig2 === true){
            return false
        }else{
            return true
        }


    }


    
}
const sig1 = true
const sig2 = false

const gate1 = new gate(sig1,sig2)

console.log(gate1.sig1)