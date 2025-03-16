document.getElementById('generateReal').addEventListener('click', generateRealNationalCode);
document.getElementById('generateRandom').addEventListener('click', generateRandomNationalCode);
document.getElementById('copyButton').addEventListener('click', copyNationalCode);

function generateRealNationalCode() {
    let code = generateNationalCode(true);
    document.getElementById('nationalCode').value = code;
}

function generateRandomNationalCode() {
    let code = generateNationalCode(false);
    document.getElementById('nationalCode').value = code;
}

function generateNationalCode(isReal) {
    let code = '';
    if (isReal) {
        // Generate a real national code
        code = generateRealCode();
    } else {
        // Generate a random national code
        code = generateRandomCode();
    }
    return code;
}

function generateRealCode() {
    let code = '';
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let digit = Math.floor(Math.random() * 10);
        code += digit;
        sum += digit * (10 - i);
    }
    let remainder = sum % 11;
    let controlDigit = remainder < 2 ? remainder : 11 - remainder;
    code += controlDigit;
    return code;
}

function generateRandomCode() {
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

function copyNationalCode() {
    let nationalCode = document.getElementById('nationalCode');
    nationalCode.select();
    document.execCommand('copy');
    showNotification('کد ملی کپی شد: ' + nationalCode.value);
}

function showNotification(message) {
    // ایجاد عنصر اعلان
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // اضافه کردن اعلان به بدنه صفحه
    document.body.appendChild(notification);

    // نمایش اعلان با انیمیشن
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // مخفی کردن اعلان پس از 3 ثانیه
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');

        // حذف اعلان از DOM پس از پایان انیمیشن
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}