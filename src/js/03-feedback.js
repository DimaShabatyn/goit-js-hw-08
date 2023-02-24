import throttle from 'lodash.throttle';

//Нехай ключем для сховища буде рядок "feedback-form-state"
const KEY_STORAGE = "feedback-form-state";
// console.log(KEY_STORAGE);

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт 
// з полями email і message, у яких зберігай поточні значення полів форми.
const form = document.querySelector('.feedback-form');
// console.log(form);
// reloadPage();
// form.addEventListener('input', onInputData);
form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener("submit", onFormSubmit);




// -----------variant 1--------------
// function onInputData(e) {
//     // let data = localStorage.getItem(KEY_STORAGE);
//     // data = data ? JSON.parse(data) : {};
//     // console.dir(e.currentTarget.elements.email.value);
//     // console.dir(e.currentTarget.elements.message.value);
//     let { email, message } = form.elements;
//     const data = { email: email.value, message: message.value };
//     console.log(data);
//     localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
// }

// // Під час завантаження сторінки перевіряй стан сховища, і якщо там є 
// // збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні 
// // бути порожніми.

// // v1

// // function reloadPage() {
// //     let data = localStorage.getItem(KEY_STORAGE);
// //     if (data) {
// //         data = JSON.parse(data);
// //         Object.entries(data).forEach(([name, value]) => {
// //             form.elements[name].value = value ?? ''; });
// //     }}

// // v2

// function reloadPage() {
//     let data = localStorage.getItem(KEY_STORAGE);
//     if (data) {
//         data = JSON.parse(data);
//         const { email, message } = form.elements;
//         email.value = data.email || ""; 
//         message.value = data.message || "";
//         // console.log(data.message);
//     }
// }

// // Під час сабміту форми очищуй сховище і поля форми, а також виводь у 
// // консоль об'єкт з полями email, message та їхніми поточними значеннями.
// // form.addEventListener("submit", onFormSubmit);
// function onFormSubmit(e) {
//     e.preventDefault();
//     const { email, message } = e.currentTarget.elements;
//     console.log({ email: email.value, message: message.value });
    
//     if (email.value === "" || message.value === "") {
//         return alert("Please fill in all the fields!");
//     }
//     localStorage.removeItem(KEY_STORAGE);
    
//     e.currentTarget.reset();
// }

// // Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. 
// // Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
// // form.addEventListener('input', throttle(onInputData, 500));



// -----------variant 2--------------
// приймає дані з локального сховища, а якщо нічого немає, то пустий об"єкт
let dataForm = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {};
const {email, message} = form.elements;
// console.log(dataForm);
reloadPage();

function onInputData(e) {
    // const {email, message} = form.elements;
    //значення з форми записуємо в об"єкт
    dataForm = {email: email.value, message: message.value};
    //об"єкт записуємо в локал сторедж (сховище)
    localStorage.setItem(KEY_STORAGE, JSON.stringify(dataForm));
};

function reloadPage() {
    if (dataForm) {
        // const {email, message} = form.elements;
        //записуємо у форму значення зі сховища, які збереглися в об"єкті 
        email.value = dataForm.email || "";
        message.value = dataForm.message || "";
    };
};

function onFormSubmit(e) {
    //заборона перезавантаження сторінки
    e.preventDefault();
    //виводио в консоль дані з форми у вигляді об"єкта
    console.log({email: email.value, message: message.value});

    //якщо дані не ввели, то дай повідомлення про заповнення всіх полів
    if (email.value === "" || message.value === "") {
        return alert("Please fill in all the fields!");
    }

    //очистимо локальне сховище
    localStorage.removeItem(KEY_STORAGE);

    //очистимо форму
    e.currentTarget.reset();

    //очистимо сам об"єкт
    dataForm = {};

};