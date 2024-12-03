
/* back ground primary #002F39  black blue*/
/* text paragragh #F2F2F2  white*/
/* Title #4FC3F7 blue  */
/* font roboto */
/* assets logo-fundo branco: https://goledger.com.br/wp-content/uploads/2024/01/goledger-newfont-horizontal-1.png */

/* Menu com logo e opções */

/* Cada opção do menu 
- Artista
  |__Sem artista, cadastre um artista 
  |__ Ou, exibe lista de artistas (nome, País de origem, botão ver albums),  
      na lista deve ter botão de ação para: editar e excluir 
    |__Botão cadastra novo artista(Nome, pais)

- Album
  |__Sem Album, cadastre um Album, necessário ter artista cadastrado  
  |__ Ou, exibe lista de Albums order by (nome, Ano do album, artista do album), (clica no artista e abre os albums, tempo?)  
      na lista deve ter botão de ação para: editar(remover ou add musicas) e excluir album 
    |__Botão cadastra novo Album(Nome, ano, vincular à um artista)

- Musicas
  |__Sem Musicas, cadastre uma Musicas, necessário vicular à um Album cadastrado  
  |__ Ou, exibe lista de Musicas order by (nome, album, artista, ano)  
      na lista deve ter botão de ação para: editar e excluir Musica, e adicionar à uma playlist 
    |__Botão cadastra nova Música(Nome, vincular à um Album)

- Playlist
  |__Sem Playlist, cadastre uma musica, necessário ter musicas cadastradas  
  |__ Ou, exibe lista de Playlist order by (nome, listar musicas, private?), 
      na lista deve ter botão de ação para: editar(remover ou add musicas) e excluir Playlist 
    |__Botão cadastra nova Playlist(Nome, private, músicas)
- Dashboard (tempo?)
*/





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
