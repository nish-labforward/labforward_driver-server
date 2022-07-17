
// Requiring module
const prompt = require('prompt-sync')({ sigint: true });

var io = require('socket.io')();


console.log('Driver Online...')
console.log('Welcome to the Labforward Driver configuration tool\n')
// This variable is used to check the user input validation
// let foundCorrectCommand = false;
io.listen(3000);

io.on('connection', function (socket) {
    console.log('connected:', socket.client.id);
    

    console.log('[1] Send stable weight value')
    console.log('[2] No Command')
    weight_command = 1
    no_command = 2
    

function configure_device() {
    // Get user input and display options to choose
    let input_command = prompt('Choose an option to configure and send commands to the Instrument:');
    input_command = Number(input_command)

    // Compare the command input to the options available
    if (weight_command === input_command) {
        let input_value = prompt('Please type the value to be transmitted to the Instrument:');
        socket.emit('clientEvent', input_value);
        console.log('Command sent to the Instrument\n');
        // foundCorrectCommand = true;

    } else if (no_command === input_command){
    console.log('Sorry, this command is not configured\n');
    }
    else {
        console.log('Invalid Commmand!\n');
    }  
} 

configure_device()
prompt('Press Enter if you want to repeat the configuration')
configure_device()

socket.on('serverEvent', function (data) {
    console.log('Client:', data);
});
    // configure_device()
});