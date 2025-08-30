# Legal Policy Generator

A modern React web application for generating professional legal policies for businesses. This app guides users through a structured questionnaire to collect business information and then generates customized policy documents.

## Features

- **Multi-step form wizard** with 35 comprehensive questions
- **Smart defaults** for common business scenarios
- **Progress tracking** with visual indicators
- **Data validation** and error handling
- **Policy preview** before generation
- **Multiple policy types** (Shipping, Cookie, Payment, etc.)
- **HTML export** for easy integration into websites
- **Responsive design** that works on all devices

## Policy Types Available

1. **Shipping Policy** - Shipping methods, costs, and delivery times
2. **Cookie Policy** - Information about cookies used on your website
3. **Payment Policy** - Accepted payment methods and billing information
4. **Disclaimer** - Legal disclaimers and limitations of liability
5. **Return and Refund Policy** - Return process, refund policy, and conditions
6. **Billing Terms and Conditions** - Billing procedures and payment terms
7. **Terms of Service** - General terms and conditions for using your service

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd policy-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Answer Questions**: Go through the 35-question form about your business
2. **Review Answers**: Check all your information before proceeding
3. **Select Policies**: Choose which policies you want to generate
4. **Generate & Download**: Create and download HTML files for each policy

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS for responsive design
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks for local state

## Project Structure

```
src/
├── components/          # React components
│   ├── PolicyGenerator.tsx    # Main app component
│   ├── QuestionForm.tsx       # Individual question form
│   ├── ReviewForm.tsx         # Review answers before generation
│   └── PolicySelector.tsx     # Choose and generate policies
├── data/
│   └── questions.ts           # Question definitions and defaults
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Root app component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and TailwindCSS
```

## Customization

### Adding New Questions

Edit `src/data/questions.ts` to add, modify, or remove questions. Each question should include:

- `id`: Unique identifier
- `field`: Field name in the PolicyData interface
- `question`: The question text
- `guidance`: Help text for users
- `type`: Input type (text, email, url, number, select, textarea)
- `required`: Whether the question is mandatory
- `defaultValue`: Default value (use "GO" for special defaults)
- `group`: Question category for organization

### Modifying Policy Templates

Edit the `getPolicyTemplate` function in `PolicySelector.tsx` to customize the HTML output format and styling.

### Styling

The app uses TailwindCSS for styling. Modify `tailwind.config.js` to customize the design system.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please open an issue on the repository or contact the development team. 