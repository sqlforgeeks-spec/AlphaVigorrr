/**
 * Prefix a public-folder path with Vite's BASE_URL so images resolve
 * correctly both in local dev (base = "/") and on GitHub Pages
 * (base = "/AlphaVigorrr/") or any custom domain (base = "/").
 *
 * Usage:  assetUrl('/images/logo.png')  →  '/AlphaVigorrr/images/logo.png'
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/'; // always ends with "/"
  return base + path.replace(/^\//, '');
}
