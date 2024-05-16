module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		'next',
		'next/core-web-vitals',
		"plugin:prettier/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parser": "@typescript-eslint/parser", 
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint" ,
		"prettier"
	],
	"rules": {
		"max-len": ["error", { "code": 160 }],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars":"warn",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"no-mixed-spaces-and-tabs": "off",
		"@next/next/no-img-element": "off",
		"react-hooks/exhaustive-deps": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"indent": ["error", "tab"],
		"no-tabs": "off"
	},
	"ignorePatterns": [
		"components/ui/**",
		".eslintrc.js",
		"next.config.js",
		"postcss.config.js",
		"**/*.mdx",
		"mdx-components.tsx",
		"*.config.ts"
	  ],
}  

