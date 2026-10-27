# JVS Dedetizadora — site

Site estático (HTML + CSS + JS puro, sem build). Publicado na Vercel.

## Estrutura
```
index.html            conteúdo da página
style.css             estilos, separados por seção (Base, Header, Hero, ...)
main.js               interações, uma função init... por bloco
assets/img/           fotos otimizadas, logo e favicon
assets/video/hero.mp4 vídeo de fundo do hero (não vai neste pacote: mantenha o seu)
```

## Como editar
| O que mudar | Onde |
|---|---|
| Número do WhatsApp | `WHATSAPP` no topo do `main.js` e os links `wa.me/` no `index.html` |
| Cidades atendidas | `.city-list`, a pergunta do FAQ e `areaServed` no `index.html` |
| Cores | variáveis `:root` no começo do `style.css` |
| Foto da seção "Sobre" quadrada | trocar `class="about-media reveal"` por `class="about-media sq reveal"` |
| Mapa | `src` do iframe em `#atuacao` (troque `q=Cianorte,+PR` pelo endereço e use `z=15`) |

## Fotos (assets/img)
| Arquivo | Usado em |
|---|---|
| `sobre-picape.jpg` | Sobre |
| `trabalho-treinamento.jpg`, `trabalho-equipamentos.jpg`, `trabalho-equipe.jpg`, `trabalho-atendimento.jpg` | Nosso trabalho |
| `area-forro.jpg`, `area-caixa-concreto.jpg`, `area-caixa-telhado.jpg`, `area-torre.jpg` | Nosso trabalho > Área de aplicação |
| `frota.jpg` | Onde atuamos |
| `logo.png` | Cabeçalho e rodapé |
| `favicon.png`, `apple-touch-icon.png` | Aba do navegador e atalho no celular |
| `hero-poster.jpg` | Imagem exibida enquanto o vídeo carrega (a sua, já existente) |

Arquivos antigos que não são mais usados e podem ser apagados: `aplicacao-jardim.jpg`, `marcelo-fachada.jpg`, `nebulizacao.jpg`, e as pastas `css` e `js` (os arquivos agora ficam na raiz), além da pasta literal `{css,js,assets\img,assets\video}`.

## Vídeo do hero
```
ffmpeg -i hero.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart hero-otimizado.mp4
```
Um vídeo de até ~3 MB carrega bem no celular.

## Acessibilidade
Link "Pular para o conteúdo", foco visível, menu com `aria-expanded`, botões da calculadora com `aria-pressed` e animações desligadas para quem usa "reduzir movimento" no sistema.
