import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  DEFAULT_CONTACT,
  loadContact, saveContact,
  loadRemovedIds, saveRemovedIds,
  loadExtraProducts, saveExtraProducts,
  type SiteContact, type SiteProduct,
} from '@/lib/site-config';
import { products as defaultProducts } from '@/data/products';

interface SiteConfigCtx {
  contact: SiteContact;
  setContact: (c: SiteContact) => void;
  products: SiteProduct[];
  removedIds: number[];
  removeProduct: (id: number) => void;
  restoreProduct: (id: number) => void;
  extraProducts: SiteProduct[];
  addProduct: (p: Omit<SiteProduct, 'id'>) => void;
  removeExtraProduct: (id: number) => void;
}

const Ctx = createContext<SiteConfigCtx | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [contact, setContactState]       = useState<SiteContact>(() => loadContact());
  const [removedIds, setRemovedIdsState] = useState<number[]>(() => loadRemovedIds());
  const [extraProducts, setExtraState]   = useState<SiteProduct[]>(() => loadExtraProducts());

  function setContact(c: SiteContact) { setContactState(c); saveContact(c); }

  function removeProduct(id: number) {
    const next = [...removedIds, id];
    setRemovedIdsState(next); saveRemovedIds(next);
  }
  function restoreProduct(id: number) {
    const next = removedIds.filter(i => i !== id);
    setRemovedIdsState(next); saveRemovedIds(next);
  }
  function addProduct(p: Omit<SiteProduct, 'id'>) {
    const maxId = Math.max(...defaultProducts.map(x => x.id), ...extraProducts.map(x => x.id), 9000);
    const next = [...extraProducts, { ...p, id: maxId + 1 }];
    setExtraState(next); saveExtraProducts(next);
  }
  function removeExtraProduct(id: number) {
    const next = extraProducts.filter(p => p.id !== id);
    setExtraState(next); saveExtraProducts(next);
  }

  const products: SiteProduct[] = [
    ...defaultProducts.filter(p => !removedIds.includes(p.id)),
    ...extraProducts,
  ];

  return (
    <Ctx.Provider value={{ contact, setContact, products, removedIds, removeProduct, restoreProduct, extraProducts, addProduct, removeExtraProduct }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSiteConfig(): SiteConfigCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSiteConfig must be inside SiteConfigProvider');
  return ctx;
}
