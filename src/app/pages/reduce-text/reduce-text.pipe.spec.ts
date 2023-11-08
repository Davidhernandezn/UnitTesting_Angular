import { ReduceTextPipe } from './reduce-text.pipe';
//NO REQUIERE CONFIGURACION
describe('ReduceTextPipe', () =>{
    let pipe: ReduceTextPipe;

    beforeEach(() =>{
        pipe = new ReduceTextPipe();
    });

    it('should create', () =>{
        expect(pipe).toBeTruthy();
    });

    //VALIDAR EL METODO TRANSFORM PARA UN PIPE
    it('use transform correcly',() =>{
        const text = 'HELLO IN  TEXT';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);//VALIDAR QUE EL TAMAÑO SEA IGUAL A 5
    })



});
