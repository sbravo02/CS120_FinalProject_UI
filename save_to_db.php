<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
    <h1 style="text-align:center">Your Reminder has been set!<h1>
    <?php
        // Not sure how to decode the input right away
        $reminder = json_decode($_POST, true);
        // might need to edit the above line

        $server = 'localhost';
        $userid = 'ump6i4brv6bsk';
        $pw = 'ShoppingBagger29';
        $db= 'dbwez9qpwg0spa';

        // Will probably need to change some of these things too
        $conn = new mysqli($server, $userid, $pw);
        $conn->select_db($db);

        if ($conn->connect_error){
            die("Connection failed: ".$conn->connect_error);
        }


        $sql_command = "INSERT INTO Reminders (`Subject`, `Message`, `Day`, `Month`, `Year`, `Hour`, `Minute`, `Mode`, `Frequency`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql_command);
        $stmt->bind_param(
            "iiiiiiiii", 
            // FIX BELOW
            $reminder['Subject'], 
            $reminder['Message'], 
            $reminder['Day'], 
            $reminder['Month'], 
            $reminder['Year'],
            $reminder['Hour'],
            $reminder['Minute'],
            $reminder['Mode'],
            $reminder['Frequency'],
        );
        $stmt->execute();


    ?>

    <!-- This will navigate to the previous page -->
    <button>Make another!</button>
    
</body>
</html>