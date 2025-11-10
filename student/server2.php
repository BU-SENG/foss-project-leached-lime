<?php 
session_start();

// Initialize variables
$Student_Id = "";
$roomno = "";
$errors = array(); 
$_SESSION['success'] = "";

// Connect to database
$db1 = mysqli_connect('localhost', 'root', '', 'dbms');

// Check connection
if (!$db1) {
    die("Database connection failed: " . mysqli_connect_error());
}

// Handle form submission
if (isset($_POST['sub_user'])) {
    // Sanitize and collect inputs
    $complaint_date = mysqli_real_escape_string($db1, $_POST['complaint_date']);
    $Student_Id     = mysqli_real_escape_string($db1, $_POST['Student_Id']);
    $phoneno        = mysqli_real_escape_string($db1, $_POST['phoneno']);
    $roomno         = mysqli_real_escape_string($db1, $_POST['roomno']);
    $complaint_type = mysqli_real_escape_string($db1, $_POST['complaint_type']);
    $description    = mysqli_real_escape_string($db1, $_POST['description']);

    // Form validation
    if (empty($Student_Id)) array_push($errors, "Student ID is required");
    if (empty($complaint_type)) array_push($errors, "Complaint type is required");
    if (empty($roomno)) array_push($errors, "Room number is required");
    if (empty($complaint_date)) array_push($errors, "Complaint date is required");

    // Proceed only if there are no validation errors
    if (count($errors) == 0) {

        // Check if the same student has already submitted the same type of complaint
        $check_query = "SELECT * FROM complaints 
                        WHERE Student_Id='$Student_Id' 
                        AND complaint_type='$complaint_type'";
        $check_result = mysqli_query($db1, $check_query);

        if (!$check_result) {
            array_push($errors, "Error checking existing complaints: " . mysqli_error($db1));
        } elseif (mysqli_num_rows($check_result) > 0) {
            array_push($errors, "You have already submitted a complaint for this issue type.");
        } else {
            // Insert complaint into database
            $insert_query = "INSERT INTO complaints 
                (complaint_date, Student_Id, phoneno, roomno, complaint_type, description) 
                VALUES 
                ('$complaint_date', '$Student_Id', '$phoneno', '$roomno', '$complaint_type', '$description')";

            $insert_result = mysqli_query($db1, $insert_query);

            if ($insert_result) {
                $_SESSION['success'] = "Your complaint has been successfully registered.";
                header('Location: problem.php');
                exit();
            } else {
                array_push($errors, "Database error while inserting: " . mysqli_error($db1));
            }
        }
    } else {
        array_push($errors, "Please fill all required fields correctly.");
    }
}

// Optionally, you can display errors for debugging (remove in production)
if (count($errors) > 0) {
    foreach ($errors as $error) {
        echo "<p style='color:red;'>$error</p>";
    }
}
?>
