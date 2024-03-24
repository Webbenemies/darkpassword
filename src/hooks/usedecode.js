import Dataserv from "../appwrite/Data";

export   async function usecretecode(plaintext, id) {
    let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']
    let ciphertext = '';
    let ramdom = Number(Math.round((Math.random()*15)+5))
    const setramdom = await Dataserv.updatetodo(id, { code: ramdom })
    if (setramdom) {
        let arrvalue = Array.from(plaintext)
    arrvalue.map((e)=>{
      if (arr.includes(e)) {
          let num = arr.indexOf(e)+ramdom
          if (num < arr.length) {
            ciphertext += arr[num];

        }
        if (num >= arr.length) {
            num = num % arr.length
            ciphertext += arr[num];
            
        }
    }else{
        ciphertext += e;
    }
})
return ciphertext
}
}