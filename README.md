## ADMIN PANEL

This serves as an admin panel for my portfolio/blog/whatever I want website, [dippingsauce.net](https://www.dippingsauce.net).
It is only viewable by admins.

It uses [bulma.io](https://bulma.io/) as a css framework.

The repo for the backend, a SQLite database connected to FastAPI with python, can be viewed [here](https://github.com/j-cucuzza/blog_backend).

## Why an Admin Panel?

I wanted a place to easily upload recipes, reviews, or whatever I wanted to [dippingsauce.net](https://www.dippingsauce.net). However, I didn't feel like it was necessary to add a "login" button to a "read-only" site. That would be confusing, firstly, and secondly, I wouldn't want people to try and login. I figured it was best to keep it separate.

## TODO
- implement editing recipes
- implement creating reviews
- implement editing reviews
- remove any remaining next.js "artifacts"

### Extra
- make login page "prettier"
- fully implement posts tab? this might be delegated to the main website itself, instead of here.
--- 
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
