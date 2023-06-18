import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  schema: process.env.VITE_API_URL,
  documents: ["src/**/*.{ts, tsx}"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        dedupeFragments: true,
        enumsAsTypes: true,
      },
      presetConfig: {
        fragmentMasking: false, // { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
};

export default config;
