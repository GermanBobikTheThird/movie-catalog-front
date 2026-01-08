import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { APP_CONSTANTS } from '../utils/constants';

const DEFAULT_LENGUAGE_CODE = 'en';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                login: 'Log In',
                logout: 'Log Out',
                profile: 'Profile',
            },
            home: {
                title: 'Movie Catalog',
                subtitle: 'Watch movies in original or dubbed',
            },
            auth: {
                loginTitle: 'Log in',
                registerTitle: 'Register',
                emailPlaceholder: 'Email address',
                usernamePlaceholder: 'Username',
                passwordPlaceholder: 'Password',
                submitLogin: 'Log in',
                submitRegister: 'Sign up',
                toRegister: "Don't have an account? Create one",
                toLogin: 'Already have an account? Log in',
                successRegister: 'You have successfully registered!',
            },
            profile: {
                title: 'Personal account',
                welcome: 'Welcome, {{name}}!',
                logout: 'Log out of your account',
            },
            catalog: {
                searchPlaceholder: 'Search movies...',
                filters: 'Filters',
                genres: 'Genres',
                year: 'Year',
                from: 'From',
                to: 'To',
                apply: 'Apply',
                reset: 'Reset',
                sortBy: 'Sort by',
                sort: {
                    newest: 'Newest',
                    oldest: 'Oldest',
                    rating: 'Top rated',
                    popular: 'Popular',
                },
                found: 'Found: {{count}}',
                loading: "Loading...",
                notFound: "Nothing found",
                noResultsDesc: "Try changing search parameters or reset filters",
                searchTitle: "Search: \"{{query}}\"",
                type: "Type",
                country: "Country",
                searchFilter: "Search...",
                sortOptions: {
                    year: "Year",
                    rating: "Rating",
                    created_at: "Date added"
                },
                loadMore: 'Show more',
            },
            media: {
                originalTitle: "Original title",
                status: "Status",
                releaseDate: "Release date",
                country: "Country",
                budget: "Budget",
                fees: "Box office",
                duration: "Duration",
                episodes: "Episodes",
                min: "min.",
                synopsis: "Synopsis",
                statuses: {
                    released: "Released",
                    upcoming: "Upcoming",
                    ongoing: "Ongoing",
                },
                bool: {
                    yes: "Yes",
                    no: "No"
                },
                addToList: "Add to list",
                removeFromList: "Remove from list",
                listStatuses: {
                    watching: "Watching",
                    plan_to_watch: "Plan to Watch",
                    completed: "Completed",
                    on_hold: "On Hold",
                    dropped: "Dropped"
                },
                details: "Details",
            },
        },
    },
    ru: {
        translation: {
            nav: {
                home: 'Главная',
                login: 'Войти',
                logout: 'Выйти',
                profile: 'Профиль',
            },
            home: {
                title: 'Каталог фильмов',
                subtitle: 'Смотрите фильмы в оригинале или дубляже',
            },
            auth: {
                loginTitle: 'Вход',
                registerTitle: 'Регистрация',
                emailPlaceholder: 'Email адрес',
                usernamePlaceholder: 'Имя пользователя',
                passwordPlaceholder: 'Пароль',
                submitLogin: 'Войти',
                submitRegister: 'Зарегистрироваться',
                toRegister: 'Нет аккаунта? Создать',
                toLogin: 'Уже есть аккаунт? Войти',
                successRegister: 'Вы успешно зарегистрировались!',
            },
            profile: {
                title: 'Личный кабинет',
                welcome: 'Добро пожаловать, {{name}}!',
                logout: 'Выйти из учетной записи',
            },
            catalog: {
                searchPlaceholder: 'Поиск фильмов...',
                filters: 'Фильтры',
                genres: 'Жанры',
                year: 'Год',
                from: 'От',
                to: 'До',
                apply: 'Применить',
                reset: 'Сброс',
                sortBy: 'Сортировка',
                sort: {
                    newest: 'Новые',
                    oldest: 'Старые',
                    rating: 'Высокий рейтинг',
                    popular: 'Популярные',
                },
                found: 'Найдено: {{count}}',
                loading: "Загрузка...",
                notFound: "Ничего не найдено",
                noResultsDesc: "Попробуйте изменить параметры поиска или сбросить фильтры",
                searchTitle: "Поиск: \"{{query}}\"",
                type: "Тип",
                country: "Страна",
                searchFilter: "Найти...",
                sortOptions: {
                    year: "Год выхода",
                    rating: "Рейтинг",
                    created_at: "Дата добавления"
                },
                loadMore: 'Показать ещё',
            },
            media: {
                originalTitle: "Оригинальное название",
                status: "Статус",
                releaseDate: "Дата выхода",
                country: "Страна",
                budget: "Бюджет",
                fees: "Сборы",
                duration: "Длительность",
                episodes: "Эпизоды",
                min: "мин.",
                synopsis: "Описание",
                statuses: {
                    released: "Вышел",
                    upcoming: "Анонс",
                    ongoing: "Выходит",
                },
                bool: {
                    yes: "Да",
                    no: "Нет"
                },
                addToList: "Добавить в список",
                removeFromList: "Удалить из списка",
                listStatuses: {
                    watching: "Смотрю",
                    plan_to_watch: "Планирую",
                    completed: "Просмотрено",
                    on_hold: "Отложено",
                    dropped: "Брошено"
                },
                details: "Подробности",
            },
        },
    },
    be: {
        translation: {
            nav: {
                home: 'Галоўная',
                login: 'Увайсці',
                logout: 'Выйсці',
                profile: 'Профіль',
            },
            home: {
                title: 'Каталог фільмаў',
                subtitle: 'Глядзіце фільмы ў арыгінале або дубляжы',
            },
            auth: {
                loginTitle: 'Уваход',
                registerTitle: 'Рэгістрацыя',
                emailPlaceholder: 'Адрас электроннай пошты',
                usernamePlaceholder: 'Імя карыстальніка',
                passwordPlaceholder: 'Пароль',
                submitLogin: 'Увайсці',
                submitRegister: 'Зарэгістравацца',
                toRegister: 'Няма ўліковага запісу? Стварыце яго',
                toLogin: 'Ужо ёсць уліковы запіс? Увайсці',
                successRegister: 'Вы паспяхова зарэгістраваліся!',
            },
            profile: {
                title: 'Асабісты кабінет',
                welcome: 'Вітаем, {{name}}!',
                logout: 'Выйсці з уліковага запісу',
            },
            catalog: {
                searchPlaceholder: 'Пошук фільмаў...',
                filters: 'Фільтры',
                genres: 'Жанры',
                year: 'Год',
                from: 'Ад',
                to: 'Да',
                apply: 'Ужыць',
                reset: 'Скінуць',
                sortBy: 'Сартаванне',
                sort: {
                    newest: 'Новыя',
                    oldest: 'Старыя',
                    rating: 'Высокі рэйтынг',
                    popular: 'Папулярныя',
                },
                found: 'Знойдзена: {{count}}',
                loading: "Загрузка...",
                notFound: "Нічога не знойдзена",
                noResultsDesc: "Паспрабуйце змяніць параметры пошуку або скінуць фільтры",
                searchTitle: "Пошук: \"{{query}}\"",
                type: "Тып",
                country: "Краіна",
                searchFilter: "Пошук...",
                sortOptions: {
                    year: "Год выпуску",
                    rating: "Рэйтынг",
                    created_at: "Дата дадання"
                },
                loadMore: 'Паказаць больш',
            },
            media: {
                originalTitle: "Арыгінальная назва",
                status: "Статус",
                releaseDate: "Дата выхаду",
                country: "Страна",
                budget: "Краіна",
                fees: "Збор",
                duration: "Працягласць",
                episodes: "Эпізоды",
                min: "мін.",
                synopsis: "Апісанне",
                details: "Падрабязнасці",
                statuses: {
                    released: "Выпушчаны",
                    upcoming: "Абвешчана",
                    ongoing: "Выходзіць",
                },
                bool: {
                    yes: "Да",
                    no: "Нет"
                },
                addToList: "Дадаць у спіс",
                removeFromList: "Выдаліць са спісу",
                listStatuses: {
                    watching: "Гляджу",
                    plan_to_watch: "Планую",
                    completed: "Прагледжана",
                    on_hold: "Адкладзена",
                    dropped: "Кінута"
                }
            },
        },
    },
};

const savedLanguage =
    localStorage.getItem(APP_CONSTANTS.LANG_KEY) || DEFAULT_LENGUAGE_CODE;

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: DEFAULT_LENGUAGE_CODE,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
