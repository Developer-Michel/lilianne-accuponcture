# Contact email function

The contact form submits to `/.netlify/functions/send-contact-email`. Netlify
discovers the function in its default `netlify/functions/` directory.

Set these environment variables in the Netlify site configuration:

- `RESEND_API_KEY`: the API key from Resend.
- `RESEND_FROM_EMAIL`: a sender address on a domain verified with Resend.
- `CONTACT_TO_EMAIL`: the recipient inbox (`lilianne.dorais.ac@hotmail.com`).

Keep the API key private. To test the form locally with Netlify Functions, run
the site through the Netlify CLI (`netlify dev`) and provide the same variables
in the local environment.
