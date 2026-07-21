import type { Product } from '@/data/products';

export type SiteProduct = Product;

export interface SiteContact {
  whatsapp: string;   // phone number e.g. '919773323613'
  telegram: string;   // username without @, e.g. 'sam11890'
  email: string;
  instagram: string;  // username without @, e.g. 'sam11890'
  address: string;
}

export const DEFAULT_CONTACT: SiteContact = {
  whatsapp: '919773323613',
  telegram: 'sam11890',
  email: 'export@alphavigor.com',
  instagram: 'alpha_vigorrr',
  address: 'Badlapur, Mumbai, Maharashtra, India',
};

const KEY_CONTACT  = 'av_contact';
const KEY_REMOVED  = 'av_removed_ids';
const KEY_EXTRA    = 'av_extra_products';

export function loadContact(): SiteContact {
  try {
    const raw = localStorage.getItem(KEY_CONTACT);
    if (raw) return { ...DEFAULT_CONTACT, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_CONTACT };
}

export function saveContact(c: SiteContact) {
  localStorage.setItem(KEY_CONTACT, JSON.stringify(c));
}

export function loadRemovedIds(): number[] {
  try {
    const raw = localStorage.getItem(KEY_REMOVED);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveRemovedIds(ids: number[]) {
  localStorage.setItem(KEY_REMOVED, JSON.stringify(ids));
}

export function loadExtraProducts(): SiteProduct[] {
  try {
    const raw = localStorage.getItem(KEY_EXTRA);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveExtraProducts(prods: SiteProduct[]) {
  localStorage.setItem(KEY_EXTRA, JSON.stringify(prods));
}
