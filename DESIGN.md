# Forwarding Desk — Design System

## Overview

Forwarding Desk is an airmail sorting counter for local redirect rules. Rules read like labels moving through a station: write a source and destination, test an exact path, then inspect the stack.

## Colors

- Paper: #EEE4D2 with deep paper edge #DFD0B8.
- Ink navy: #182C3B and quiet ink #496070.
- Stamp red: #B83A2F with deep red #812B26.
- White label stock: #FBF7EE.
- Red is reserved for route status, stamps, and active actions.

## Typography

- Georgia carries the editorial headline and section titles.
- Geist Sans is used for explanatory copy and form labels.
- Geist Mono marks paths, codes, stations, and storage boundaries.
- Large headlines are high-contrast and compressed; route data stays compact.

## Layout

- The paper sheet uses masthead, forwarding thesis, split write/test ledger, and route stack.
- The write desk and test desk are side by side on wide screens, then stack on mobile.
- The route stack is a full-width sorting belt with code, source, destination, and remove action.

## Elevation & Depth

- One soft paper shadow separates the sheet from the desk surface.
- The test result is an inset label, not a floating card.
- The red stamp uses rotation as physical evidence, not as a repeated decoration.

## Shapes

- Square inputs and hairline ruled rows echo postal forms.
- Diagonal paper marks and perforation-like stripes are used only on the sorting stack.
- Avoid rounded SaaS controls and pill badges.

## Components

- Station masthead: identity, station number, and local-sort boundary.
- Forwarding form: source path, destination, status code, and add action.
- Exact-match test: request path with route-found/no-route state.
- Route row: ordinal, HTTP code, source, destination, and clear action.

## Do's and Don'ts

- Do make 301/302/307 meaning and exact-match behavior obvious.
- Do keep persistence described as browser-local.
- Don't suggest the rules alter a live CDN or server.
- Don't turn the stack into a generic table or use traffic-light status colors.
