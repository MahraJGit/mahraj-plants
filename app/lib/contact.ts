/** Canonical Mahraj Plants phone / WhatsApp / email contact. */
export const PHONE_DISPLAY = "+966 55 689 1877";
export const PHONE_HREF = "tel:+966556891877";
export const WHATSAPP_NUMBER = "966556891877";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const EMAIL_DISPLAY = "landscape@mahraj.com";
export const EMAIL_HREF = `mailto:${EMAIL_DISPLAY}`;

export const FACEBOOK_HREF = "https://www.facebook.com/MahrajPlants/";
export const X_HREF = "https://x.com/mahrajplants";
export const INSTAGRAM_HREF =
    "https://www.instagram.com/mahraj_plantsandlandscaping/";

export function getWhatsAppHref(message: string) {
    return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

export const CONSULTATION_WHATSAPP_HREF = getWhatsAppHref(
    "Hello, I would like to get a free consultation from Mahraj Plants.",
);
