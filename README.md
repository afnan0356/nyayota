Nyayota

Nyayota is an educational legal information and research platform designed to make legal materials easier to find, compare, and understand. The project currently focuses on Bangladesh law and selected international legal materials.

«Important: Nyayota provides general educational information, not legal advice. It is not a substitute for a qualified lawyer. Laws change, and summaries or AI-generated explanations may be incomplete or incorrect. Verify important matters against current official sources and seek qualified legal help when needed.»

What the project includes

The current codebase includes pages and components for:

- Searching a structured legal-information catalogue
- Browsing Bangladesh laws and selected international legal materials
- Reading law-detail pages and legal concepts
- Comparing legal materials and conducting guided research
- An educational legal-outcome guide
- An AI-assisted legal explainer
- Privacy, terms, accessibility, and disclaimer pages
- Light and dark theme support

Features and content are still under development. The presence of a page does not necessarily mean every workflow or legal entry is complete.

Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Google Gen AI SDK for the AI-assistant route

Run locally

Requirements: a supported Node.js version and npm.

1. Clone this repository.

2. Install dependencies:
   
   npm install

3. If you want to test the AI assistant, create a ".env.local" file in the project root:
   
   GEMINI_API_KEY=your_google_gemini_api_key
APP_URL=http://localhost:3000
   
   Keep real API keys private. Never commit ".env.local" or secrets to GitHub.

4. Start the development server:
   
   npm run dev

5. Open "http://localhost:3000" (http://localhost:3000).

To create and run a production build:

npm run build
npm run start

The AI assistant depends on the configured Gemini API key and provider availability. If the integration cannot be reached, the application may use a limited fallback response. Do not treat that fallback as authoritative legal analysis.

Legal content and source quality

Nyayota's legal catalogue is maintained in the codebase. Before relying on an entry, check its official source, jurisdiction, effective date, amendment status, and whether the displayed text is complete or only an excerpt.

The project should prioritize primary sources such as official legislation portals, gazettes, courts, and treaty repositories. Verbatim legal text, editorial summaries, translations, and AI-generated explanations should be clearly distinguished.

Privacy and security

- Never commit API keys, passwords, tokens, or personal data.
- Review the deployed privacy notice and the AI provider's data-handling policies before entering sensitive information.
- Avoid submitting confidential case details or identifying information to an AI feature.
- Report suspected security issues privately to the project maintainer.

Contributing

Contributions that improve accessibility, usability, source attribution, legal-content verification, testing, and documentation are welcome.

Keep changes focused and explain the evidence behind legal-content updates. Do not present unverified legal text or AI output as authoritative.

Project status

Nyayota is an evolving project. Legal coverage, citations, completeness indicators, and interactive features require ongoing review and testing. Verify the deployed website and current official legal sources before relying on any content.

Disclaimer

This repository and the website are for educational and informational purposes only. Nothing here creates a lawyer-client relationship or guarantees an outcome in any legal matter.
