import { useTranslation } from 'react-i18next';
import { APP_CONSTANTS } from '../utils/constants';
import Select from './ui/Select';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem(APP_CONSTANTS.LANG_KEY, lang);
    };

    const languages = [
        { value: 'ru', label: '🇷🇺 Русский' },
        { value: 'en', label: '🇺🇸 English' },
        { value: 'be', label: '🇧🇾 Беларуская' }
    ];

    return (
        <div>
            <Select
                value={i18n.language}
                onChange={changeLanguage}
                options={languages}
            />
        </div>
    );
};

export default LanguageSwitcher;