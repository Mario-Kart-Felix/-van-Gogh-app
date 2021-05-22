The easiest way to deploy Next.js to production is to use the Vercel platform from the creators of Next.js. Vercel is a cloud platform for static sites, hybrid apps, and Serverless Functions.

Getting started
If you haven’t already done so, push your Next.js app to a Git provider of your choice: GitHub, GitLab, or BitBucket. Your repository can be private or public.

Then, follow these steps:

Sign up to Vercel (no credit card is required).
After signing up, you’ll arrive on the “Import Project” page. Under “From Git Repository”, choose the Git provider you use and set up an integration. (Instructions: GitHub / GitLab / BitBucket).
Once that’s set up, click “Import Project From …” and import your Next.js app. It auto-detects that your app is using Next.js and sets up the build configuration for you. No need to change anything — everything should work just fine!
After importing, it’ll deploy your Next.js app and provide you with a deployment URL. Click “Visit” to see your app in production.
Congratulations! You’ve just deployed your Next.js app! If you have questions, take a look at the Vercel documentation.

If you’re using a custom server, we strongly recommend migrating away from it (for example, by using dynamic routing). If you cannot migrate, consider other hosting options.

DPS: Develop, Preview, Ship
Let’s talk about the workflow we recommend using. Vercel supports what we call the DPS workflow: Develop, Preview, and Ship:

Develop: Write code in Next.js. Keep the development server running and take advantage of React Fast Refresh.
Preview: Every time you push changes to a branch on GitHub / GitLab / BitBucket, Vercel automatically creates a new deployment with a unique URL. You can view them on GitHub when you open a pull request, or under “Preview Deployments” on your project page on Vercel. Learn more about it here.
Ship: When you’re ready to ship, merge the pull request to your default branch (e.g. main). Vercel will automatically create a production deployment.
By using the DPS workflow, in addition to doing code reviews, you can do deployment previews. Each deployment creates a unique URL that can be shared or used for integration tests.

Optimized for Next.js
Vercel is made by the creators of Next.js and has first-class support for Next.js.

For example, the hybrid pages approach is fully supported out of the box.

Every page can either use Static Generation or Server-Side Rendering.
Pages that use Static Generation and assets (JS, CSS, images, fonts, etc) will automatically be served from Vercel's Edge Network, which is blazingly fast.
Pages that use Server-Side Rendering and API routes will automatically become isolated Serverless Functions. This allows page rendering and API requests to scale infinitely.
Custom Domains, Environment Variables, Automatic HTTPS, and more
Custom Domains: Once deployed on Vercel, you can assign a custom domain to your Next.js app. Take a look at our documentation here.
Environment Variables: You can also set environment variables on Vercel. Take a look at our documentation here. You can then use those environment variables in your Next.js app.
Automatic HTTPS: HTTPS is enabled by default (including custom domains) and doesn't require extra configuration. We auto-renew SSL certificates.
More: Read our documentation to learn more about the Vercel platform.
Automatic Updates
When you deploy your Next.js application, you want to see the latest version without needing to reload.

Next.js will automatically load the latest version of your application in the background when routing. For client-side navigation, next/link will temporarily function as a normal <a> tag.

If a new page (with an old version) has already been prefetched by next/link, Next.js will use the old version. Then, after either a full page refresh or multiple client-side transitions, Next.js will show the latest version.

Other hosting options
Node.js Server
Next.js can be deployed to any hosting provider that supports Node.js. This is the approach you should take if you’re using a custom server.

Make sure your package.json has the "build" and "start" scripts:

{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
next build builds the production application in the .next folder. After building, next start starts a Node.js server that supports hybrid pages, serving both statically generated and server-side rendered pages.

Docker Image
Examples
with-docker
Next.js can be deployed to any hosting provider that supports Docker containers. You can use this approach when deploying to container orchestrators such as Kubernetes or HashiCorp Nomad, or when running inside a single node in any cloud provider.

Here is a multi-stage Dockerfile using node:alpine that you can use:

# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
Make sure to place this Dockerfile in the root folder of your project.

You can build your container with docker build . -t my-next-js-app and run it with docker run -p 3000:3000 my-next-js-app.

Static HTML Export
If you’d like to do a static HTML export of your Next.js app, follow the directions on our documentation.

