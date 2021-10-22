import de from "../lang/locales/de";
import en from "../lang/locales/en";
import es from "../lang/locales/es";
import fr from "../lang/locales/fr";
import it from "../lang/locales/it";
import pt from "../lang/locales/pt-br";

export default class Language
{
    public static readonly ACCEPTABLE_LOCALES = ['de', 'en', 'es', 'fr', 'it', 'pt-br'];
}

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

/**
 * Debug only.
 *
 * Used to console out all keys;
 *
 * @param locale
 *
export function getAllKeys(locale: string)
{
    console.log(useTranslation(locale).toString());
}

export function setTranslation(locale: string, key: string, translation: string)
{
    useTranslation(locale)[key] = translation;
}

export function setVendorName(hash: string, locale: string)
{
    const translated_name = "ZAVALA";
    setTranslation(locale, `${hash}_name`, translated_name);
}

export function getVendorName(hash: string, locale: string): string
{
    return useTranslation(locale)[`${hash}_name`];
}

export function translateVendorsLocation(hash: string, destination: string, bubble_id: number, locale: string)
{
    return {
        destination: "Tower",
        bubble: "Courtyard"
    }
}

export function setVendorLocation(hash: string, destination: string, bubble_id: number, locale: string)
{
    const translated = translateVendorsLocation(hash, destination, bubble_id, locale);
    setTranslation(locale, `${hash}_location`, `${translated.bubble}, ${translated.destination}`);
}

export function getVendorLocation(hash: string, locale: string): string
{
    return useTranslation(locale)[`${hash}_location`];
}
*/