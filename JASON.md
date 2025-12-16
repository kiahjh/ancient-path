# Instructions for Working with Jason

## Session Startup

When you detect Jason is the user (path does not contain `jared`, `kiah`, or
`miciah`), perform these startup tasks automatically:

1. **Run `npm install`** to ensure all dependencies are installed
2. **Start the development server** in the background with `npm run dev`
3. **Greet Jason** with a welcome message like:

   > Hi Jason! I've started up a local copy of the Ancient Path website for you
   > at http://localhost:3000 - you can view it in your browser. Let me know
   > what you want to work on.

4. **Wait for the server to be ready** before telling Jason it's available
5. **Check if Playwright MCP is available** (see below)

## Playwright Browser Tools

This project has a Playwright MCP server that lets Claude control a browser to
view and interact with the site. This is useful for verifying visual changes,
reproducing bugs, and testing functionality.

### Detecting Playwright

At session startup, check if the Playwright MCP tools are available by looking
for tools like `mcp__playwright__browser_navigate` or
`mcp__playwright__browser_snapshot`.

- **If Playwright tools ARE available**: Great! You can use them when needed.
- **If Playwright tools are NOT available**: Tell Jason: "It looks like the
  Playwright browser tools aren't set up on your machine. You'll want to talk to
  Jared about getting that configured - it helps me view and test the website
  directly."

### When to Use Playwright

**DO use Playwright for:**

- Verifying visual/UI changes look correct
- Reproducing bugs that Jason describes
- Checking how something looks on the actual rendered page
- Taking screenshots to show Jason what you see
- Testing interactive elements (clicks, forms, navigation)

**DON'T use Playwright for:**

- Simple code changes where you already know what to do
- Reading or editing code (use the normal file tools)
- Every single change - only when visual verification is helpful
- Tasks where Jason can easily check the browser himself

### How to Use Playwright

1. **Navigate to the page**: `browser_navigate` to `http://localhost:3000/path`
2. **Get a snapshot**: `browser_snapshot` to see the page structure
3. **Take a screenshot**: `browser_take_screenshot` if you need to show Jason
4. **Interact**: `browser_click`, `browser_type`, etc. for testing

Remember: The dev server must be running for Playwright to view the local site.

## Working Style

Jason is good with computers but not a programmer. Keep these guidelines in
mind:

- **Explain what you're doing** in plain language, avoiding jargon when possible
- **Handle all git operations** - Jason knows what a commit is but you should do
  the actual git commands
- **Be proactive about troubleshooting** - if something isn't working,
  investigate and fix it
- **Keep the dev server running** - restart it if needed after changes

## Bug Fixes

When Jason reports a bug:

1. **Ask clarifying questions** to understand the issue
2. **Try to reproduce the bug first** - view it in the browser, check console
   errors
3. **Write a test if possible** to verify the fix works
4. **Fix the bug**
5. **Verify the fix** by running the test and/or checking in the browser
6. **Show Jason the fix is working** before moving on

## Visual/UI Changes

When Jason wants to change how something looks or add a new screen:

1. **Review the existing design patterns** in the codebase first
2. **Ensure design consistency** with the rest of the site (colors, spacing,
   typography, component styles)
3. **Use existing components** when possible (Button, PostPreview, etc.)
4. **Follow Tailwind conventions** already established in the project
5. **Test on both desktop and mobile** viewport sizes
6. **Show Jason the changes** in the browser before committing

## Saving Work (Git Commits)

When Jason finishes a task or says he's done:

1. **Prompt him to save his work** - say something like "Would you like me to
   save these changes?"
2. **Before committing, always:**
   - Run `npm run prettier` to format code
   - Run `npm test` to ensure tests pass
   - Run `npm run build` to ensure everything builds
3. **If any of the above fail**, fix the issues before committing
4. **Create a clear commit message** describing what was changed
5. **Offer to open a PR** - say something like "I've saved your changes. Would
   you like me to open a pull request so these can go live?"

## Opening Pull Requests

When Jason wants to open a PR:

1. **Create a new branch** if not already on one (use a descriptive name)
2. **Push the branch** to GitHub
3. **Create the PR** with a clear title and description
4. **Share the PR link** with Jason so he can see it

## Troubleshooting

Common issues and how to handle them:

### Server won't start

- Check if port 3000 is already in use
- Try killing any existing node processes
- Run `npm install` again in case dependencies are missing

### Build errors

- Read the error message carefully
- Fix TypeScript errors before anything else
- Check for missing imports or typos

### Tests failing

- Run the specific failing test to see details
- Check if it's a real bug or just a test that needs updating

### Changes not showing up

- Make sure the dev server is running
- Try a hard refresh in the browser (Cmd+Shift+R)
- Check if there are any build errors in the terminal

## Environment Setup

If Jason is on a new machine or the project isn't set up:

1. Ensure `.env.local` exists with the required environment variables
2. Run `npm install`
3. Verify the dev server starts with `npm run dev`

If `.env.local` is missing, ask Jason to check with Jared for the credentials.

## Key Commands Reference

These are the commands you'll run on Jason's behalf:

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production (to verify everything works)
- `npm test` - Run tests
- `npm run prettier` - Format code
- `npm run lint` - Check for code issues

## If you need to understand more about the Cosmic API and data types/fetching

- read: https://www.cosmicjs.com/docs/api/objects
- read: https://www.cosmicjs.com/docs/api/object-types

Or, if you need more information about something else, you may consult:
https://www.cosmicjs.com/docs
