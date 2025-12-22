/**
 * Spreadsheet formula definitions and utilities
 */

export interface FormulaDefinition {
  /** Formula name (e.g., SUM, AVERAGE) */
  name: string;
  /** Category for grouping */
  category: FormulaCategory;
  /** Brief description */
  description: string;
  /** Syntax example */
  syntax: string;
  /** Detailed usage examples */
  examples: string[];
  /** Function implementation */
  evaluate: (args: unknown[]) => unknown;
}

export type FormulaCategory =
  | 'Math'
  | 'Statistical'
  | 'Text'
  | 'Logical'
  | 'Date'
  | 'Lookup'
  | 'Financial';

/**
 * Built-in formula definitions
 */
export const FORMULA_DEFINITIONS: FormulaDefinition[] = [
  // Math formulas
  {
    name: 'SUM',
    category: 'Math',
    description: 'Adds all numbers in a range',
    syntax: 'SUM(number1, [number2], ...)',
    examples: ['SUM(1, 2, 3)', 'SUM(A1:A10)'],
    evaluate: (args) => {
      const nums = args.flat(Infinity).filter((v): v is number => typeof v === 'number');
      return nums.reduce((sum, n) => sum + n, 0);
    },
  },
  {
    name: 'AVERAGE',
    category: 'Statistical',
    description: 'Returns the average of numbers',
    syntax: 'AVERAGE(number1, [number2], ...)',
    examples: ['AVERAGE(1, 2, 3, 4, 5)', 'AVERAGE(A1:A10)'],
    evaluate: (args) => {
      const nums = args.flat(Infinity).filter((v): v is number => typeof v === 'number');
      return nums.length ? nums.reduce((sum, n) => sum + n, 0) / nums.length : 0;
    },
  },
  {
    name: 'MIN',
    category: 'Statistical',
    description: 'Returns the smallest number',
    syntax: 'MIN(number1, [number2], ...)',
    examples: ['MIN(1, 2, 3)', 'MIN(A1:A10)'],
    evaluate: (args) => {
      const nums = args.flat(Infinity).filter((v): v is number => typeof v === 'number');
      return nums.length ? Math.min(...nums) : 0;
    },
  },
  {
    name: 'MAX',
    category: 'Statistical',
    description: 'Returns the largest number',
    syntax: 'MAX(number1, [number2], ...)',
    examples: ['MAX(1, 2, 3)', 'MAX(A1:A10)'],
    evaluate: (args) => {
      const nums = args.flat(Infinity).filter((v): v is number => typeof v === 'number');
      return nums.length ? Math.max(...nums) : 0;
    },
  },
  {
    name: 'COUNT',
    category: 'Statistical',
    description: 'Counts cells containing numbers',
    syntax: 'COUNT(value1, [value2], ...)',
    examples: ['COUNT(A1:A10)', 'COUNT(1, "text", 3)'],
    evaluate: (args) => {
      return args.flat(Infinity).filter((v) => typeof v === 'number').length;
    },
  },
  {
    name: 'COUNTA',
    category: 'Statistical',
    description: 'Counts non-empty cells',
    syntax: 'COUNTA(value1, [value2], ...)',
    examples: ['COUNTA(A1:A10)'],
    evaluate: (args) => {
      return args.flat(Infinity).filter((v) => v !== null && v !== undefined && v !== '').length;
    },
  },
  {
    name: 'ABS',
    category: 'Math',
    description: 'Returns the absolute value',
    syntax: 'ABS(number)',
    examples: ['ABS(-5)', 'ABS(A1)'],
    evaluate: (args) => Math.abs(Number(args[0]) || 0),
  },
  {
    name: 'ROUND',
    category: 'Math',
    description: 'Rounds a number to specified digits',
    syntax: 'ROUND(number, num_digits)',
    examples: ['ROUND(3.14159, 2)', 'ROUND(A1, 0)'],
    evaluate: (args) => {
      const num = Number(args[0]) || 0;
      const digits = Number(args[1]) || 0;
      return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
    },
  },
  {
    name: 'FLOOR',
    category: 'Math',
    description: 'Rounds down to nearest integer',
    syntax: 'FLOOR(number)',
    examples: ['FLOOR(3.7)', 'FLOOR(A1)'],
    evaluate: (args) => Math.floor(Number(args[0]) || 0),
  },
  {
    name: 'CEIL',
    category: 'Math',
    description: 'Rounds up to nearest integer',
    syntax: 'CEIL(number)',
    examples: ['CEIL(3.2)', 'CEIL(A1)'],
    evaluate: (args) => Math.ceil(Number(args[0]) || 0),
  },
  {
    name: 'POWER',
    category: 'Math',
    description: 'Returns number raised to power',
    syntax: 'POWER(number, power)',
    examples: ['POWER(2, 3)', 'POWER(A1, 2)'],
    evaluate: (args) => Math.pow(Number(args[0]) || 0, Number(args[1]) || 1),
  },
  {
    name: 'SQRT',
    category: 'Math',
    description: 'Returns the square root',
    syntax: 'SQRT(number)',
    examples: ['SQRT(16)', 'SQRT(A1)'],
    evaluate: (args) => Math.sqrt(Number(args[0]) || 0),
  },

  // Text formulas
  {
    name: 'CONCAT',
    category: 'Text',
    description: 'Joins text strings',
    syntax: 'CONCAT(text1, [text2], ...)',
    examples: ['CONCAT("Hello", " ", "World")', 'CONCAT(A1, B1)'],
    evaluate: (args) => args.flat(Infinity).map(String).join(''),
  },
  {
    name: 'UPPER',
    category: 'Text',
    description: 'Converts text to uppercase',
    syntax: 'UPPER(text)',
    examples: ['UPPER("hello")', 'UPPER(A1)'],
    evaluate: (args) => String(args[0] || '').toUpperCase(),
  },
  {
    name: 'LOWER',
    category: 'Text',
    description: 'Converts text to lowercase',
    syntax: 'LOWER(text)',
    examples: ['LOWER("HELLO")', 'LOWER(A1)'],
    evaluate: (args) => String(args[0] || '').toLowerCase(),
  },
  {
    name: 'LEN',
    category: 'Text',
    description: 'Returns the length of text',
    syntax: 'LEN(text)',
    examples: ['LEN("Hello")', 'LEN(A1)'],
    evaluate: (args) => String(args[0] || '').length,
  },
  {
    name: 'TRIM',
    category: 'Text',
    description: 'Removes extra spaces',
    syntax: 'TRIM(text)',
    examples: ['TRIM("  hello  ")', 'TRIM(A1)'],
    evaluate: (args) => String(args[0] || '').trim(),
  },
  {
    name: 'LEFT',
    category: 'Text',
    description: 'Returns leftmost characters',
    syntax: 'LEFT(text, num_chars)',
    examples: ['LEFT("Hello", 2)', 'LEFT(A1, 3)'],
    evaluate: (args) => String(args[0] || '').slice(0, Number(args[1]) || 1),
  },
  {
    name: 'RIGHT',
    category: 'Text',
    description: 'Returns rightmost characters',
    syntax: 'RIGHT(text, num_chars)',
    examples: ['RIGHT("Hello", 2)', 'RIGHT(A1, 3)'],
    evaluate: (args) => {
      const text = String(args[0] || '');
      const num = Number(args[1]) || 1;
      return text.slice(-num);
    },
  },

  // Logical formulas
  {
    name: 'IF',
    category: 'Logical',
    description: 'Returns value based on condition',
    syntax: 'IF(condition, value_if_true, value_if_false)',
    examples: ['IF(A1>10, "Yes", "No")', 'IF(B1=0, 0, A1/B1)'],
    evaluate: (args) => (args[0] ? args[1] : args[2]),
  },
  {
    name: 'AND',
    category: 'Logical',
    description: 'Returns TRUE if all are true',
    syntax: 'AND(logical1, [logical2], ...)',
    examples: ['AND(A1>0, B1>0)', 'AND(TRUE, TRUE, FALSE)'],
    evaluate: (args) => args.flat(Infinity).every(Boolean),
  },
  {
    name: 'OR',
    category: 'Logical',
    description: 'Returns TRUE if any is true',
    syntax: 'OR(logical1, [logical2], ...)',
    examples: ['OR(A1>0, B1>0)', 'OR(TRUE, FALSE)'],
    evaluate: (args) => args.flat(Infinity).some(Boolean),
  },
  {
    name: 'NOT',
    category: 'Logical',
    description: 'Returns opposite boolean',
    syntax: 'NOT(logical)',
    examples: ['NOT(TRUE)', 'NOT(A1>10)'],
    evaluate: (args) => !args[0],
  },

  // Date formulas
  {
    name: 'NOW',
    category: 'Date',
    description: 'Returns current date and time',
    syntax: 'NOW()',
    examples: ['NOW()'],
    evaluate: () => new Date(),
  },
  {
    name: 'TODAY',
    category: 'Date',
    description: 'Returns current date',
    syntax: 'TODAY()',
    examples: ['TODAY()'],
    evaluate: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
  },
  {
    name: 'YEAR',
    category: 'Date',
    description: 'Returns year from date',
    syntax: 'YEAR(date)',
    examples: ['YEAR(NOW())', 'YEAR(A1)'],
    evaluate: (args) => {
      const date = args[0] instanceof Date ? args[0] : new Date(String(args[0]));
      return date.getFullYear();
    },
  },
  {
    name: 'MONTH',
    category: 'Date',
    description: 'Returns month from date (1-12)',
    syntax: 'MONTH(date)',
    examples: ['MONTH(NOW())', 'MONTH(A1)'],
    evaluate: (args) => {
      const date = args[0] instanceof Date ? args[0] : new Date(String(args[0]));
      return date.getMonth() + 1;
    },
  },
  {
    name: 'DAY',
    category: 'Date',
    description: 'Returns day from date (1-31)',
    syntax: 'DAY(date)',
    examples: ['DAY(NOW())', 'DAY(A1)'],
    evaluate: (args) => {
      const date = args[0] instanceof Date ? args[0] : new Date(String(args[0]));
      return date.getDate();
    },
  },
];

/**
 * List of all formula names
 */
export const FORMULA_NAMES: string[] = FORMULA_DEFINITIONS.map((f) => f.name);

/**
 * List of all formula categories
 */
export const FORMULA_CATEGORIES: FormulaCategory[] = [
  'Math',
  'Statistical',
  'Text',
  'Logical',
  'Date',
  'Lookup',
  'Financial',
];

/**
 * Get formulas by category
 */
export function getFormulasByCategory(category: FormulaCategory): FormulaDefinition[] {
  return FORMULA_DEFINITIONS.filter((f) => f.category === category);
}

/**
 * Search formulas by name or description
 */
export function searchFormulas(query: string): FormulaDefinition[] {
  const lowerQuery = query.toLowerCase();
  return FORMULA_DEFINITIONS.filter(
    (f) =>
      f.name.toLowerCase().includes(lowerQuery) ||
      f.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get a formula by name
 */
export function getFormula(name: string): FormulaDefinition | undefined {
  return FORMULA_DEFINITIONS.find((f) => f.name.toUpperCase() === name.toUpperCase());
}

/**
 * Evaluate a formula by name with arguments
 */
export function evaluateFormula(name: string, args: unknown[]): unknown {
  const formula = getFormula(name);
  if (!formula) {
    throw new Error(`Unknown formula: ${name}`);
  }
  return formula.evaluate(args);
}
