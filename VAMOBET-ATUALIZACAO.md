# Vamobet — atualização visual

- Logo oficial verde e branca aplicada ao cabeçalho, login, menu e painel admin.
- 18 artes de banners e login atualizadas, preservando as ofertas existentes.
- 11 capas de jogos atualizadas, com a logo dentro das próprias artes.
- Identidade aplicada aos títulos, mensagens, compartilhamentos e ícones.
- Correção de configurações antigas de identidade recebidas do servidor.
- Acabamento dos cartões, navegação, foco e exibição das capas em celulares e computadores.

## Validação

Compilação de produção e sintaxe do servidor verificadas. Interface de login e lobby verificada em 1440 × 1000 e 390 × 844, usando dados simulados somente no navegador de teste. Sem erros de JavaScript ou rolagem horizontal nessas verificações. Isso não testa depósitos, saques ou o funcionamento dos provedores.

## Executar

Com Node.js compatível instalado, execute na pasta do projeto:

```bash
npm install
npm run build
npm start
```

Abra http://localhost:3000. O painel permanece em /admin. As configurações originais de banco e acesso foram preservadas. Esta atualização não publica o site automaticamente.

## Limpeza do pacote

Removidos 103 arquivos redundantes ou históricos (24.57 MiB). As 11 capas duplicadas foram consolidadas em public/games, com os caminhos do frontend e do servidor atualizados. Foram preservados os scripts operacionais, testes, configurações de hospedagem, migrações e assets referenciados.
