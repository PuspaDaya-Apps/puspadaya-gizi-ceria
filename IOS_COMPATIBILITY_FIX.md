# iOS Compatibility Fix Documentation

## Masalah yang Ditemukan

Website tidak berfungsi dengan baik di iPhone (iOS Safari) karena beberapa masalah kompatibilitas:

### 1. **Script Eksternal GPTEngineer**
- Script dari `cdn.gpteng.co/gptengineer.js` diblokir oleh Intelligent Tracking Prevention (ITP) di Safari iOS
- Script dimuat secara sinkronus sehingga menghalangi rendering aplikasi
- Error dari script ini dapat menghentikan seluruh aplikasi

### 2. **Viewport Meta Tag Tidak Lengkap**
-缺少 properti penting untuk iOS seperti `viewport-fit=cover`
- Tidak ada meta tag untuk iOS web app capability

### 3. **Font Loading Issues**
- Google Fonts tidak memiliki preconnect yang proper
- Dapat menyebabkan FOIT (Flash of Invisible Text) di iOS

### 4. **CSS Compatibility**
- Tidak ada CSS reset untuk iOS Safari
- Input zoom pada iOS tidak ditangani
- Safe area insets untuk iPhone X dan model terbaru tidak didukung

## Perbaikan yang Dilakukan

### 1. Index.html Updates

#### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```
- `viewport-fit=cover`: Mendukung full-screen display di iPhone X dan model terbaru
- `maximum-scale=1.0, user-scalable=no`: Mencegah zoom tidak diinginkan

#### iOS-Specific Meta Tags
```html
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```
- Mencegah deteksi otomatis nomor telepon
- Mengaktifkan mode web app standalone
- Mengatur style status bar

#### Preconnect untuk Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
- Mempercepat loading font di iOS

#### Async Script Loading
```javascript
// Script GPTEngineer sekarang dimuat secara asynchronous setelah window load
window.addEventListener('load', function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.gpteng.co/gptengineer.js';
  script.async = true;
  script.onerror = function() {
    console.warn('GPTEngineer script failed to load, continuing without it');
  };
  document.body.appendChild(script);
});
```
- Aplikasi tetap berfungsi meskipun script eksternal gagal dimuat
- Tidak menghalangi rendering awal

### 2. CSS Fixes (index.css)

#### iOS Safari Text Rendering
```css
body {
  -webkit-text-size-adjust: 100%;        /* Mencegah auto-resize text */
  -webkit-tap-highlight-color: transparent; /* Menghilangkan highlight tap */
  -webkit-font-smoothing: antialiased;   /* Font lebih halus di iOS */
  -moz-osx-font-smoothing: grayscale;
}
```

#### Input Zoom Prevention
```css
input, select, textarea, button {
  font-size: 16px; /* Mencegah zoom otomatis saat focus di iOS */
}
```

#### Safe Area Insets
```css
@supports (padding: max(0px)) {
  body {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}
```
- Mendukung notched devices (iPhone X, 11, 12, 13, 14, 15, dll)

### 3. Error Boundary Component

File baru: `src/components/error/ErrorBoundary.tsx`
- Menangkap error React di seluruh aplikasi
- Menampilkan fallback UI yang user-friendly
- Mencegah aplikasi crash sepenuhnya

### 4. Main.tsx Updates

#### Global Error Handlers
```typescript
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  if (event.target && (event.target as HTMLElement).tagName === 'SCRIPT') {
    console.warn('Script load error detected, continuing without external script');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

#### Fallback UI
- Jika rendering gagal, tampilkan UI sederhana dengan tombol reload
- Aplikasi tetap dapat digunakan meskipun ada error

### 5. App.tsx Updates

#### ErrorBoundary Wrapper
```tsx
<ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    {/* ... rest of app */}
  </QueryClientProvider>
</ErrorBoundary>
```
- Semua komponen sekarang dilindungi oleh ErrorBoundary

## Testing di iOS

### Cara Testing:
1. **Build aplikasi:**
   ```bash
   npm run build
   ```

2. **Preview hasil build:**
   ```bash
   npm run preview
   ```

3. **Test di iPhone:**
   - Buka website di Safari iOS
   - Test di berbagai model iPhone (dengan dan tanpa notch)
   - Test interaksi (scroll, tap, input forms)
   - Test orientasi (portrait dan landscape)

### Checklist Testing iOS:
- [ ] Homepage loads tanpa error
- [ ] Navigasi berfungsi dengan baik
- [ ] Form inputs tidak zoom otomatis
- [ ] Text terbaca dengan jelas
- [ ] Layout responsive di berbagai ukuran layar
- [ ] Safe area insets berfungsi (tidak ada content terpotong)
- [ ] Script eksternal yang gagal tidak crash aplikasi
- [ ] Error boundary menampilkan fallback UI jika ada error

## Browser iOS yang Didukung

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Safari iOS | 12+ | Fully supported |
| Chrome iOS | 12+ | Uses WebKit, fully supported |
| Firefox iOS | 12+ | Uses WebKit, fully supported |
| Edge iOS | 12+ | Uses WebKit, fully supported |

**Catatan:** Semua browser di iOS menggunakan WebKit engine, jadi kompatibilitas sama across all browsers.

## Performance Optimizations

### Bundle Size
- Code splitting dengan lazy loading
- Vendor chunks terpisah untuk caching yang lebih baik
- Compression enabled

### Loading Strategy
- Critical CSS inlined
- Scripts dimuat secara asynchronous
- Fallback UI untuk loading states

## Troubleshooting

### Jika masih ada masalah di iOS:

1. **Clear Safari cache:**
   - Settings > Safari > Clear History and Website Data

2. **Disable ITP untuk testing:**
   - Settings > Safari > Advanced > Feature Flags
   - Disable "Intelligent Tracking Prevention"

3. **Check Console Errors:**
   - Settings > Safari > Advanced > Web Inspector
   - Connect iPhone ke Mac
   - Buka Web Inspector di Mac

4. **Test dengan Network Throttling:**
   - iOS memiliki network stack yang berbeda
   - Test dengan koneksi lambat untuk simulasi kondisi nyata

## Monitoring

### Error Tracking
- Global error handlers sudah diimplementasikan
- Error boundary menangkap React errors
- Console logs untuk debugging

### Performance Metrics
- Monitor First Contentful Paint (FCP)
- Monitor Time to Interactive (TTI)
- Monitor error rates di iOS devices

## Referensi

- [iOS Safari Web Content Guidelines](https://developer.apple.com/documentation/safari-web-extension-api/)
- [Responsive Design in iOS Safari](https://webkit.org/blog/7929/designing-for-iphone-x/)
- [Intelligent Tracking Prevention](https://webkit.org/intelligent-tracking-prevention/)
- [Viewport Meta Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
