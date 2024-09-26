import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    base: "/",
    build: {
      // cssCodeSplit: false,
      // target: "es2015",
    },
    server: {
      watch: {
        // usePolling: true
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // icon: true,
          // typescript: true,
        },
      }),
    ],
    css: {
      modules: {
        // hashPrefix: 'hash',
        // generateScopedName: "[name]__[local]__[hash:base64:2]",
        // globalModulePaths: [
        //   /.*\\.global\\..*/
        // ]
      },
      postcss: {
        plugins: [],
      },
    },
  }
})
