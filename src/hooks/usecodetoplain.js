
export function decodetoplain(ciphercontent , code) {
    let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']

    let descriptext = ''
    let arrvalue = Array.from(ciphercontent)

    arrvalue.map((e)=>{
        let num = arr.indexOf(e)-code
      if (arr.includes(e)) {
          if (num < arr.length && num >= 0) {
            descriptext +=arr[num]
          }
         else if (num < 0) {
              num = num + arr.length
              descriptext+=arr[num]
          }
      }else{
          descriptext+= e
      }
    })
    return descriptext
}