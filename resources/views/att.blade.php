<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Login</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100 flex items-center justify-center min-h-screen">

<!-- Hidden RFID Input -->
<input id="scanInput" type="text" autofocus autocomplete="off" class="opacity-0 absolute">

<!-- Main Container -->
<div class="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 mx-4">

    <!-- Clock -->
    <div id="clock" class="text-center text-green-600 font-semibold text-lg md:text-xl mb-4"></div>

    <!-- Employee Info -->
    <div id="employeeInfo"
        class="flex flex-col md:flex-row items-center gap-6 opacity-0 translate-y-5 transition-all duration-500">

        <!-- Image -->
        <div class="bg-gray-50 border rounded-xl p-3">
            <img id="picture"
                src="/fallback-image.jpg"
                class="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg"
            >
        </div>

        <!-- Details -->
        <div class="flex-1 w-full space-y-3">

            <div>
                <p class="text-sm text-gray-500">Employee ID</p>
                <div id="empID" class="bg-gray-100 rounded-lg p-2 text-center font-semibold"></div>
            </div>

            <div>
                <p class="text-sm text-gray-500">Name</p>
                <div id="empName" class="bg-gray-100 rounded-lg p-2 text-center font-semibold"></div>
            </div>

            <div>
                <p class="text-sm text-gray-500">Status</p>
                <div id="estat" class="bg-gray-100 rounded-lg p-2 text-center font-semibold"></div>
            </div>

        </div>
    </div>

</div>

<script>
const scanInput = document.getElementById('scanInput');
const ename = document.getElementById('empName');
const eid = document.getElementById('empID');
const estat = document.getElementById('estat');
const img = document.getElementById('picture');

// Show animation
function showEmployeeInfo() {
    const info = document.getElementById('employeeInfo');
    info.classList.remove('opacity-0', 'translate-y-5');
    info.classList.add('opacity-100', 'translate-y-0');
}

// Always focus scanner
window.addEventListener('click', () => scanInput.focus());
window.onload = () => scanInput.focus();

// RFID Scan
scanInput.addEventListener('change', async () => {
    const scannedValue = scanInput.value.trim();
    if (!scannedValue) return;

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
        estat.textContent = result.status;
        ename.textContent = result.employee_name.toUpperCase();
        eid.textContent = result.employeeID;
        img.src = result.image ?? '/fallback-image.jpg';

        showEmployeeInfo();

        setTimeout(() => location.reload(), 5000);
    }

    scanInput.value = '';
    scanInput.focus();
});

// Clock
const tclock = document.getElementById('clock');

function updateclock() {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let now = new Date();

    let text = `${weekDays[now.getDay()]} - ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} 
    - ${now.toLocaleTimeString()}`;

    tclock.textContent = text;
}

setInterval(updateclock, 1000);
</script>

</body>
</html>