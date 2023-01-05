function BinaryInput(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla == 48 || tecla == 49)) return true;
    else {
        return false;
    }
}
let ascii_array = ["NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "TAB", "LF", "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US", "(sp)", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "DEL"]

function convertToBinary(input) {
    let output = '';
    let number = ascii_array.indexOf(input);
    for (let i = 0; i < 7; i++) {
        output += number % 2;
        number = parseInt(number / 2);
    }
    return output.split("").reverse().map(Number);
}

function isOdd(num) {
    if (num % 2 == 0) {
        return false;
    } else {
        return true;
    }
}

function oneCount(array) {
    let count = 0;
    for (let i of array) {
        if (i == 1) {
            count += 1;
        }
    }
    return count;
}

function convertToAscii(binary) {
     let array = binary.split(" ");
     return array.map(code => String.fromCharCode(parseInt(code, 2))).join("");
}

function HammingCode() {
    let symbol = document.getElementById('symbol').value;
    if (!ascii_array.includes(symbol)) {
        return alert('Введіть символ з таблиці ASCII')
    }
    let binary_code = convertToBinary(symbol);
    let binary_code_string = binary_code.join('');
    let p1 = [binary_code[0], binary_code[1], binary_code[3], binary_code[4], binary_code[6]];
    let p2 = [binary_code[0], binary_code[2], binary_code[3], binary_code[5], binary_code[6]];
    let p3 = [binary_code[1], binary_code[2], binary_code[3]];
    let p4 = [binary_code[4], binary_code[5], binary_code[6]];
    isOdd(oneCount(p1)) ? p1 = '1' : p1 = '0';
    isOdd(oneCount(p2)) ? p2 = '1' : p2 = '0';
    isOdd(oneCount(p3)) ? p3 = '1' : p3 = '0';
    isOdd(oneCount(p4)) ? p4 = '1' : p4 = '0';
    let output_string = '';
    output_string += p1 + p2 + binary_code_string[0] + p3 + binary_code_string.slice(1, 4) + p4 + binary_code_string.slice(4, 7);
    document.getElementById("code").textContent = 'Код:' + ' ' + output_string;
}

function HammingDecode() {
    let binary_code = document.getElementById('binary_code').value;
    let input = binary_code;
    binary_code = binary_code.split('').map(Number);
    let p1, p2, p3, p4;
    let p1_list = [binary_code[2], binary_code[4], binary_code[6], binary_code[8], binary_code[10]];
    let p2_list = [binary_code[2], binary_code[5], binary_code[6], binary_code[9], binary_code[10]];
    let p3_list = [binary_code[4], binary_code[5], binary_code[6]];
    let p4_list = [binary_code[8], binary_code[9], binary_code[10]];
    isOdd(oneCount(p1_list)) ? p1 = 1 : p1 = 0;
    isOdd(oneCount(p2_list)) ? p2 = 1 : p2 = 0;
    isOdd(oneCount(p3_list)) ? p3 = 1 : p3 = 0;
    isOdd(oneCount(p4_list)) ? p4 = 1 : p4 = 0;
    let parity_bits = [p1, p2, p3, p4];
    let bits_check = {
        1: 1,
        2: 2,
        4: 4,
        8: 8
    };
    binary_code[0] == parity_bits[0] ? bits_check[1] = true : bits_check[1] = false;
    binary_code[1] == parity_bits[1] ? bits_check[2] = true : bits_check[2] = false;
    binary_code[3] == parity_bits[2] ? bits_check[4] = true : bits_check[4] = false;
    binary_code[7] == parity_bits[3] ? bits_check[8] = true : bits_check[8] = false;
    let bits_check_numlist = [];
    for (let i in bits_check) {
        bits_check_numlist.push(+!bits_check[i])
    }

    let bad_bit = 0;
    for (let i in bits_check) {
        if (bits_check[i] == false) {
            bad_bit += Number(i)
        }
    }
    binary_code[bad_bit - 1] == 1 ? binary_code[bad_bit - 1] = 0 : binary_code[bad_bit - 1] = 1;
    let output = binary_code.join('');
    let binary = '';
    binary += output[2] + output.slice(4, 7) + output.slice(8, 11);
    console.log(binary);
    binary = convertToAscii(binary);
    console.log(binary);
    document.getElementById('bad-bit').textContent = 'Помилковий біт:' + ' ' + (bad_bit == 0 ? 'немає' : bad_bit);
    document.getElementById('right-code').textContent = 'Правильний код:' + ' ' + output;
    document.getElementById('coded-symbol').textContent = 'Закодований символ:' + ' ' + binary;
    let big_table = document.getElementById('big-table');
    //big table fill
    for (let i = 1; i < 12; i++) {
        big_table.rows[3].cells[i].textContent = input[i - 1];
    }
    for (let i = 1; i < 12; i += 2) {
        big_table.rows[4].cells[i].textContent = input[i - 1];
    }
    for (let i = 2; i < 12; i += 4) {
        big_table.rows[5].cells[i].textContent = input[i - 1];
        big_table.rows[5].cells[i + 1].textContent = input[i];
    }
    for (let i = 4; i < 8; i++) {
        big_table.rows[6].cells[i].textContent = input[i - 1];
    }
    for (let i = 8; i < 12; i++) {
        big_table.rows[7].cells[i].textContent = input[i - 1];
    }
    //Colors set
    if (bits_check[1] == false) {
        document.getElementById('p1').style.backgroundColor = 'red'
        document.getElementById('p1').textContent = 'Fail';
        document.getElementById('k1').textContent = 1;
    } else {
        document.getElementById('p1').style.backgroundColor = 'green'
        document.getElementById('p1').textContent = 'Pass';
        document.getElementById('k1').textContent = 0;
    }
    if (bits_check[2] == false) {
        document.getElementById('p2').style.backgroundColor = 'red'
        document.getElementById('p2').textContent = 'Fail';
        document.getElementById('k2').textContent = 1;
    } else {
        document.getElementById('p2').style.backgroundColor = 'green'
        document.getElementById('p2').textContent = 'Pass';
        document.getElementById('k2').textContent = 0;
    }
    if (bits_check[4] == false) {
        document.getElementById('p3').style.backgroundColor = 'red'
        document.getElementById('p3').textContent = 'Fail';
        document.getElementById('k3').textContent = 1;
    } else {
        document.getElementById('p3').style.backgroundColor = 'green'
        document.getElementById('p3').textContent = 'Pass';
        document.getElementById('k3').textContent = 0;
    }
    if (bits_check[8] == false) {
        document.getElementById('p4').style.backgroundColor = 'red'
        document.getElementById('p4').textContent = 'Fail';
        document.getElementById('k4').textContent = 1;
    } else {
        document.getElementById('p4').style.backgroundColor = 'green'
        document.getElementById('p4').textContent = 'Pass';
        document.getElementById('k4').textContent = 0;
    }
    //small table fill
    let small_table = document.getElementById('small-table');
    for (let i = 1; i < 5; i++) {
        small_table.rows[1].cells[i].textContent = bits_check_numlist[i - 1]
    }
    let count = 0;
    if (bits_check[1] == false) {
        small_table.rows[2].cells[1].textContent = 1;
        count += 1;
    } else {
        small_table.rows[2].cells[1].textContent = '0'
    }
    if (bits_check[2] == false) {
        small_table.rows[2].cells[2].textContent = 2;
        count += 2;
    } else {
        small_table.rows[2].cells[2].textContent = '0'
    }
    if (bits_check[4] == false) {
        small_table.rows[2].cells[3].textContent = 4;
        count += 4;
    } else {
        small_table.rows[2].cells[3].textContent = '0'
    }
    if (bits_check[8] == false) {
        small_table.rows[2].cells[4].textContent = 8;
        count += 8;
    } else {
        small_table.rows[2].cells[4].textContent = '0'
    }
    small_table.rows[2].cells[5].textContent = count;
}