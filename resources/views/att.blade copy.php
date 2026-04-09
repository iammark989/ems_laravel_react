<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"> 
</head>

<body>




<!-- scanner fingerprint or rfid -->
<input id='scanInput' type='text' autofocus autocomplete="off" style='opacity:0;'></input>
                         

<div class='container bg-light rounded shadow p-4 my-4 align-items-center justify-content-center'>
    <div id="clock" class="m-3 text-success text-center"><p></p></div>
    <!-- <div id="message" class="mt-3 text-success text-center"></div> -->
    <!-- Employee Info Container -->
<div id="employeeInfo" 
     class="container-fluid d-flex flex-column flex-md-row"
     style="max-width: 700px; opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">

        
  <!-- Employee Picture -->
        <div class="text-center border border-secondary rounded p-2 bg-white mb-3 mb-md-0 me-md-4" >
            <img  id='picture' src="/fallback-image.jpg" alt="Employee Picture" bclass="border border-dark rounded" style="width: 200px; height: 200px; object-fit: cover;">
            <div class="fw-semibold mt-2 text-muted"></div>
        </div>

        <!-- Employee Details -->
        <div class="d-flex flex-column w-100">
            <span> Employee ID</span><div class="border border-secondary rounded p-2 text-center mb-3 bg-white fw-semibold" id='empID'>
           <p></p>
            </div>
            <span> Name</span><div class="border border-secondary rounded p-2 text-center mb-3 bg-white fw-semibold" id='empName'>
            <p></p>
            </div>
            <span> Status</span><div class="border border-secondary rounded p-2 text-center bg-white fw-semibold" id='estat'>
           <p></p>
            </div>
        </div>
    
</div>
</div>

<script>
    const scanInput = document.getElementById('scanInput');
    const message = document.getElementById('message');
    const ename = document.getElementById('empName');
    const eid = document.getElementById('empID');
    const estat = document.getElementById('estat');
    const img = document.getElementById('picture');

      //Animation Script 
  // Example: Trigger fade-in when data is loaded or after successful scan
  function showEmployeeInfo() {
    const info = document.getElementById('employeeInfo');
    info.style.opacity = '1';
    info.style.transform = 'translateY(0)';
  }

  // Example trigger (you can replace this with your RFID success event)
  // Simulate delay
  setTimeout(showEmployeeInfo, 500);

    // Always refocus input in case the user clicks somewhere else
    window.addEventListener('click', () => scanInput.focus());

    scanInput.addEventListener('change', async () => {
        const scannedValue = scanInput.value.trim();
        if (!scannedValue) return;

      // Example: send data to Laravel route
        const response = await fetch('/attendance/log/rfid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ rfid: scannedValue })
        });

     
        const result = await response.json();

        if (result.success) {
           // message.textContent = `Welcome!`;
            estat.textContent = result.status;
            ename.textContent = result.employee_name.toUpperCase();
            eid.textContent = result.employeeID;
            if(result.image === null){   
            }
            img.src = result.image;
             function pagereload() {
                location.reload()
            }
            setTimeout(pagereload, 5000);
        } else {
            message.textContent = 'Invalid RFID or employee not found.';

        }
        // Reset input for next scan
        scanInput.value = '';
        scanInput.focus();
    });

    // Ensure focus stays on the input
    window.onload = () => scanInput.focus();



//clock
                const tclock = document.getElementById('clock');
                 function updateclock(){
                        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
                        const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                        let dateNow = new Date();
                        let month = months[dateNow.getMonth()];
                        let getDate = dateNow.getDate();
                        let getYear = dateNow.getFullYear();
                        let weekday = weekDays[dateNow.getDay()];
                        let time = dateNow.getTime();
                        let hour = String(dateNow.getHours()).padStart(2,'0');
                        let minute = String(dateNow.getMinutes()).padStart(2,'0');
                        let second = String(dateNow.getSeconds()).padStart(2,'0');
                        let clock = `${hour}:${minute}:${second}`;
                        let theDate = `${weekday} - ${month} ${getDate}, ${getYear} - ${clock}` ;
                        tclock.textContent = theDate;
                 }
                 
                 setInterval(updateclock,1000);
                       





</script>
@vite(['resources/css/app.css', 'resources/js/app.js'])
</body>
</html>