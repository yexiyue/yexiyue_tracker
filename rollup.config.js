import { resolve } from "path";
import ts from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
//查看此官网进行配置 https://www.npmjs.com/package/@rollup/plugin-typescript

export default [
  {
    input: "./src/core/index.ts",
    output: [
      {
        file: resolve(__dirname, "./dist/index.esm.js"),
        format: "es",
      },
      {
        file: resolve(__dirname, "./dist/index.cjs.js"),
        format: "cjs",
      },
      {
        file: resolve(__dirname, "./dist/index.js"),
        format: "umd",
        name: "tracker",
      },
    ],
    plugins: [
      ts(),
      nodeResolve(),
      commonjs({ extensions: [".js", ".ts"] }),
    ],
  },
];
