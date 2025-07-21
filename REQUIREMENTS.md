# Requirements

## General overview

The following describes the functional and non-functional features, as well as the technical requirements, for regional event display website named "Kärnten Kompass". The slogan is: "Entdecke, was Kärnten bewegt". The website's content is in German.


## Top-level: The requirements in one line

An nuxt.js website that servers as an event browser and event listing/directory application.

## High-level: Use-case and motivation, raison d'etre

Kärnten Kompass is a website that lists regional events in Kärnten (German for Carinthia, a state in Austria). The main target audience are tourists visiting the area. Besides listing the events, the events can be filtered so tourists can find a suitable regional event. It should use state-of-the-art technology.


## Mid-level: General architecture, tech stack, technological contraints

The following tech stack should be used:
- The website is based an Nuxt.js and Vue.js. Use best-practice Nuxt/Vue style.
- Tailwind CSS should be used for CSS styling. Do not use a third-party animation library. Stick to Tailwind CSS styles and animations.
- The programming language is TypeScript and therefore you should follow standard guidelines for good TypeScript code.
- A database is not required. All content is loaded from a predefined API (which is mocked).
- No CMS is required. Hard coding the content is acceptable.
- No analytics tracking is needed.
- The theme is light (no dark mode required).
- Use a responsive layout.

Do SEO optimization where possible and sensible (e.g., meta tags).

Besides node and npm, no other external tooling should be required to run the web page. Deployment will be done a self-owned server that has node, npm and an nginx web server available. 


## Low-level: the web page and its sub pages
Do not include a navigation bar/element. 

The project should feature the following page structure:

1. Main Page
The main page should feature the Kärnten Kompass logo (assets/logo-compass.svg), centered, and include the slogan "Entdecke, was Kärnten bewegt.". Use modern and professional styling, with big headings. Use light background colors (mainly white, or rarely very light blue or grey). Below the logo, there is an image carousel. Below that, the event ("Veranstaltungen") section starts, where the list of events is shown. For each event, a thumbnail image, the event's name, location and date should be shown. Clicking on an event leads to the detail page of the clicked event.

There should be filters for the date (only per day, use the react-calendar widget for start- and end-date selection), for the event name (free text search) and the event category (selection). The filters should work with AND-logic (e.g. selecting two criteria shows only events where both apply).


2. Event Detail Page
The detail page includes additional information about an event. It features an image spinner to showcase the event's images (usually 2-5 images per event). Clicking on an image opens a larger image viewer (modal, carousel; clicking on background closes the viewer, additionally a close button; navigations buttons left/right). The detail page should further include the event's title, the description, the location and date(s). In a detail section, more information of the event is shown: the organizer's contact information and the event categories. Event detail pages should be routed as /events/slug


The footer should include a link to the "Impressum". For now, only develop a dummy Impressum.


## Low-level: the data
Dummy data is available in src/data/events.ts. You should only use this data, so do not make any API calls for now. 
Note that the event description is HTML code (containing paragraphs and some formatting). So use the description accordingly, so the formatting gets shown properly. All the image and thumbnail links are working, so use these.

## Code quality requirements and practices
The codebase must adhere to strict quality standards to ensure maintainability, readability, and correctness. 


## First steps

You are provided with a project structure where Nuxt.js, Tailwind and the vcalendar package are already set up. You are allowed to make modificiation to the project structure.
