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

* Data fetching

  - React Query / TanStack Query
  - Axios

* Styles

  - TailwindCSS

* Other
  - date-fns

## Features (ver. 0.1.0)

This version's focus is on making core features usable, which means that select functionalities may have been left out and will be finished later (e.g. missing crop/aspect ratio menus in Post creation flow).

- Post creation/Photo upload
- Likes
- User follows
- Feed
  - "For you" tab which pulls from all existing recent posts
  - "Following" tab which pulls recent posts from followed users
- Profile picture upload
- Dark/light theme, with user preference detection
- Responsive layouts

## Planned features

- Tests with React Testing Library
- Comments and replies
- Additional photo upload features (aspect ratio/crop) and QoL (modifying photos included in a post)
- Improved semantic html
- Accessibility pass
- UX/responsiveness improvements
- And possibly more...
