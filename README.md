# PhotoApp

## Site link and server repo

**Deployed site (Render):** https://photo24-frontend.onrender.com<br />
Server repo: https://github.com/piogru/photo24_backend

## Description

React Typescript application meant to be a study of Instagram, with features limited to photo sharing and basic user interaction. I'm using this app as an opportunity to learn `react-query`, `MongoDB` integration and `React Router`'s v6 data router.

## Libs

- Forms
  - React Hook Form
  - Zod

* State management
  - React Query / TanStack Query (async state)
  - Zustand

* Styles
  - TailwindCSS

* Other
  - Axios
  - date-fns

## Features (ver. 0.2.1)

0.2.0: This version's focus is on making core features usable, which means that select functionalities may have been left out and will be finished later (e.g. missing crop/aspect ratio menus in Post creation flow).
0.2.1: Refactoring to make existing components easier to maintain and minor adjustments/fixes to existing features

- Post creation/Photo upload
- Likes
- User follows
- Feed
  - "For you" tab which pulls from all existing recent posts
  - "Following" tab which pulls recent posts from followed users
- Profile picture upload
- Dark/light theme, with user preference detection
- Responsive layouts
- 'Guest' login to allow site preview without an account
- Testing utilities and integration tests for select components with React Testing Library

## Planned features

- Further test coverage with React Testing Library
- Post comments and replies
- Infinite scroll/pagination in Feed/Explore pages
- Saved posts
- Additional photo upload features (aspect ratio/crop) and QoL (modifying photos included in a post)
- Accessibility pass
- UX/RWD improvements
