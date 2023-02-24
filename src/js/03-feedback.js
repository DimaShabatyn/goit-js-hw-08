//Нехай ключем для сховища буде рядок "feedback-form-state"
const KEY_STORAGE = "feedback-form-state";
console.log(KEY_STORAGE);

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт 
// з полями email і message, у яких зберігай поточні значення полів форми.
const form = document.querySelector('.feedback-form');
// console.log(form);
reloadPage();
form.addEventListener('input', onInputData);


function onInputData(e) {
    //console.dir(e.currentTarget.elements.email.value);
    //console.dir(e.currentTarget.elements.message.value);
    const { email, message } = e.currentTarget.elements;
    const data = { email: email.value, message: message.value };
    // console.log(data);
    localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
}

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є 
// збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні 
// бути порожніми.

// v1

// function reloadPage() {
//     let data = localStorage.getItem(KEY_STORAGE);
//     if (data) {
//         data = JSON.parse(data);
//         Object.entries(data).forEach(([name, value]) => {
//             form.elements[name].value = value ?? ''; });
//     }}

// v2

function reloadPage() {
    let data = localStorage.getItem(KEY_STORAGE);
    if (data) {
        data = JSON.parse(data);
        const { email, message } = form.elements;
        email.value = data.email || ""; 
        message.value = data.message || "";
        // console.log(data.message);
    }
}
    