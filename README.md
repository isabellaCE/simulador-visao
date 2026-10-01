# Simulador de Visão

Veja como a sua interface aparece para pessoas com daltonismo ou baixa visão,
e confira o contraste das cores pelas regras da WCAG — tudo dentro do navegador.

> 🚧 Em desenvolvimento. Acompanhe o progresso no [roadmap](#roadmap).

## Por que este projeto
Acessibilidade costuma ser verificada tarde demais, quando a interface já está pronta.
Quero uma ferramenta simples para testar um print de tela antes de publicar,
sem enviar a imagem para nenhum servidor.

Também é meu laboratório para praticar conceitos de arquitetura de front-end
que estudo na pós-graduação: WebAssembly, Web Workers, PWA e arquitetura modular.

## O que ele vai fazer
- Simular protanopia, deuteranopia e tritanopia
- Simular baixa visão (desfoque e perda de contraste)
- Checar o contraste entre duas cores (AA e AAA)
- Funcionar offline, instalável como app

As simulações são aproximações visuais, não diagnóstico.

## Arquitetura
**SPA + PWA, organizada em arquitetura modular.**

- **SPA:** uma única tela, toda executada no navegador.
- **PWA:** instalável e funciona offline, com service worker.
- **Arquitetura modular:** a lógica de cores e filtros é TypeScript puro, sem dependência do Vue,
  e testada sem navegador. Os filtros existem em JavaScript e em WebAssembly com o mesmo contrato,
  e rodam num Web Worker para não travar a interface.

As decisões estão registradas em [`docs/adr`](./docs/adr).

## Stack
Vue 3 · TypeScript · Vite · AssemblyScript · Vitest · vite-plugin-pwa

## Roadmap
- [x] Projeto criado
- [ ] Upload e visualização da imagem
- [ ] Filtros em JavaScript
- [ ] Checador de contraste
- [ ] Filtros em WebAssembly + comparação de desempenho
- [ ] PWA e publicação