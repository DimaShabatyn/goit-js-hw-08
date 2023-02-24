import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_PLAYER = "videoplayer-current-time";
const iframe = document.querySelector('#vimeo-player');
console.log(iframe);

// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player
const player = new Player(iframe);

// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// player.on('timeupdate', getCurrentTime);
// player.on('timeupdate', throttle(getCurrentTime, 1000));
// player.on('play', function() {
//     console.log('played the video!');
// });

// Зберігай час відтворення у локальне сховище.
// Нехай ключем для сховища буде рядок "videoplayer-current-time".
function getCurrentTime(currentTime) {
    // console.log(currentTime.seconds);
    const seconds = currentTime.seconds;
    console.log(seconds);
    localStorage.setItem(KEY_PLAYER, JSON.stringify(seconds));
};

// Під час перезавантаження сторінки скористайся методом
// setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
player.setCurrentTime(JSON.parse(localStorage.getItem(KEY_PLAYER)) || 0);

// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався 
// у сховищі не частіше, ніж раз на секунду.
player.on('timeupdate', throttle(getCurrentTime, 1000));