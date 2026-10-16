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

## Correção de banners antigos

O carrossel local podia ser substituído por campanhas de banner_campaigns vindas do banco. A correção anterior reconhecia somente nomes exatos de arquivos e não cobria nomes numerados ou URLs do Firebase com caminhos codificados. As campanhas com nomes desconhecidos continuavam carregando arquivos da marca antiga.

Agora o frontend e o endpoint público usam a mesma normalização: nomes conhecidos são convertidos para artes locais; nomes com (2), (3) e caminhos codificados são reconhecidos. Campanhas antigas cuja imagem não pode ser identificada ficam ocultas e a home usa o carrossel oficial. Bônus preservam suas regras, mas escondem imagens antigas desconhecidas. No admin, basta selecionar/enviar a nova imagem e salvar para usar campanhas personalizadas. Alterar apenas o status da campanha não reativa uma arte antiga.

As 18 artes estão em public/banners/vamobet-20261017-v2, com caminhos novos que evitam o cache dos arquivos anteriores. Nenhum registro do banco foi excluído ou alterado nesta entrega. É necessário publicar o pacote e reiniciar o servidor para aplicar.

Validação da correção: 7 testes de normalização e 6 cenários no navegador (campanha antiga reconhecida, antiga desconhecida e nova personalizada, em 1440 e 390 px). Nenhuma requisição às URLs antigas, erro de JavaScript ou rolagem horizontal nesses cenários simulados. Compilação de produção e verificação do painel admin aprovadas.
