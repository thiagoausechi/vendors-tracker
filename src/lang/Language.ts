import de from "../lang/locales/de";
import en from "../lang/locales/en";
import es from "../lang/locales/es";
import fr from "../lang/locales/fr";
import it from "../lang/locales/it";
import pt from "../lang/locales/pt-br";

export const ACCEPTABLE_LOCALES: string[] = ['en', 'de', 'es', 'fr', 'it', 'pt-br'];

/**
 * const t = useTranslation('en');
 *
 * Setting key and translation
 * t['key'] = 'Translation';
 *
 * Using translation from key
 * t['key']
 */
export function useTranslation(locale: string)
{
    switch (locale)
    {
        case 'de': return de;
        case 'en': return en;
        case 'es': return es;
        case 'fr': return fr;
        case 'it': return it;
        case 'pt-br': return pt;
        default: return en;
    }
}

export function setTranslation(locale: string, key: string, translation: string)
{
    useTranslation(locale)[key] = translation;
}