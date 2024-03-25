export function textformater(input) {
    let output = ""
    for (let index = 0; index < input.length; index++) {
        if (index % 5 == 0) {
            output += " "
        }else{
            output += input[index]
        }
    }

    return output
    
}