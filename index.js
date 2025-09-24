function RPS()
{
    const readline = require('node:readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.log("ROCK PAPER SCISSORS")

    pick = ["Rock", "Paper", "Scissors"]
    i = 1
    for(a of pick)
    {
        console.log(i +". " + a)
        i++
    }
    
    rl.question(`What's your choice?`, choice => {
        console.log(choice);
        const auto = Math.floor(Math.random() * 3+1)
        console.log(auto);


        Check(choice, auto)

        rl.close();
    });
}

function Check(choice, auto)
{
    result = ""
    if(choice == auto)
    {
        result = "draw"
    }
    if((choice == 1 && auto == 2) || (choice == 2 && auto == 3) || (choice ==3 && auto ==1))
    {
        result = "You lose"
    }
    if((choice == 1 && auto == 3) || (choice == 2 && auto == 1) || (choice ==3 && auto ==2))
    {
        result = "You win"
    }
    console.log(result);
}

RPS()
