# 配置别名

默认官方在vite.config.ts文件中配置好了别名，现在还需要去tsconfig.json再进行一次配置，配置如下：

```json
{
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "baseUrl": ".",
    "isolatedModules": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "module": "ESNext",
    "moduleResolution": "Bundler"
  }
}
```

为了解决不识别vue文件的问题，可以在env.d.ts中加入以下代码:

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
