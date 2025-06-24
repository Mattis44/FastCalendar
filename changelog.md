# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0-alpha.8] - 2025-06-23

### ✨ Features

- **Internationalization (i18n)**
    - Introduced translation system using `TranslationContext`.
    - New `useTranslation()` hook for accessing keys like `"header.today"`.
    - Default translations available in `translations/en.json`.
    - Consumers can override translations via the `translations` prop on `<FastCalendar />`.

### 🧩 API Example

```tsx
<FastCalendar
  translations={{
    header: {
      today: "Today",
      month: "Month",
      addEvent: "Add Event",
    },
    addEvent: {
      title: "Event Title",
      ...
    }
  }}
/>

## [1.0.0-alpha.4] - 2025-06-23

### Added

- 📡 `apiRef` support via `useApiRef()`
  Developers can now imperatively control the calendar (e.g., `goToToday`, `setMonth`, `setDate`) using an external ref.

- 📖 JSDoc enhancements for better DX
  Improved documentation of props like `locale`, with a reference to [BCP 47 language tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).

## [1.0.0-alpha.3] - 2025-06-23

### Added

- 🎯 Drag & Drop for calendar events
- 🧩 onEventChange callback
- 📦 Duration-preserving event drop logic
```
