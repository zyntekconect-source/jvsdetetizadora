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
| Região de atendimento | seção `#atuacao`, FAQ e resposta do chat (sem nomes de cidades) |
| Cores | variáveis `:root` no começo do `style.css` |
| Foto da seção "Sobre" quadrada | trocar `class="about-media reveal"` por `class="about-media sq reveal"` |
| Mapa | `src` do iframe em `#atuacao` (troque `q=Cianorte,+PR` pelo endereço e use `z=15`) |

## Fotos (assets/img)
| Arquivo | Usado em |
|---|---|
| `sobre-picape.jpg` | Sobre |
| `trabalho-treinamento.jpg` (foto real do treinamento), `trabalho-equipamentos.jpg`, `trabalho-equipe.jpg`, `trabalho-atendimento.jpg`, `area-forro.jpg`, `area-caixa-concreto.jpg` | Galeria "Nosso trabalho" (6 cards quadrados) |
| `frota.jpg` | Onde atuamos |
| `logo.png` | Cabeçalho e rodapé |
| `favicon.png`, `apple-touch-icon.png` | Aba do navegador e atalho no celular |
| `hero-poster.jpg` | Imagem exibida enquanto o vídeo carrega |

A pasta `_fotos-nao-usadas/` guarda fotos que ficaram fora do site (podem ser apagadas ou usadas depois). Não precisa subir na Vercel.

## Vídeo do hero
```
ffmpeg -i hero.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart hero-otimizado.mp4
```
Um vídeo de até ~3 MB carrega bem no celular.

## Acessibilidade
Link "Pular para o conteúdo", foco visível, menu com `aria-expanded`, botões da calculadora com `aria-pressed` e animações desligadas para quem usa "reduzir movimento" no sistema.
