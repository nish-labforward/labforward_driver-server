 // Requiring module
const prompt = require('prompt-sync')({ sigint: true });
var io = require('socket.io')();
var crypto = require('crypto')

crypto.getHashes() // [ 'dsa', 'dsa-sha', ..., 'md5', ... ]

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

console.log(' Welcome to the Labforward Driver configuration tool !!\n')
// This variable is used to check the user input validation

io.listen(3000);
console.log('[1] Send stable weight value')
console.log('[2] No Command')
weight_command = 1
no_command = 2

// Get user input and display options to choose
let input_command = prompt('Choose an option to send commands and configure the Instrument:');
input_command = Number(input_command)
if (weight_command === input_command) {

let input_value = prompt('Please type the value to be transmitted to the Instrument:');
checksum_of_input_value= checksum(input_value)

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  

io.on('connection', function (socket) {

    console.log('Driver Online...\n')
    sleep(3000).then(() => {
        socket.emit('clientEvent', input_value, checksum_of_input_value);

    });
    console.log('Command sent to the Instrument...\n');
    socket.once('serverEvent', function (data) {
        console.log('Message from Client:', data);
    });
    

});
} 
else if (no_command === input_command){
    console.log('Sorry, this command is not configured, Please rerun the app \n');  
}
else{
    console.log('Invalid Commmand! Please rerun the app\n');
    }  