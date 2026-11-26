# IA para Anúncios Inteligentes

**Assistente inteligente para criação e melhoria de anúncios de produtos em marketplaces.**

## Sobre o projeto

Uma aplicação que utiliza inteligência artificial generativa para auxiliar vendedores na criação de anúncios de produtos.

A partir das informações fornecidas pelo usuário, a solução gera títulos, descrições, características e sugestões de melhoria para anúncios em marketplaces.

## Problema e objetivo

Criar anúncios exige tempo e organização para elaborar títulos, descrições e informações dos produtos.

O objetivo do projeto é simplificar esse processo por meio da inteligência artificial, tornando a criação de conteúdo mais prática e estruturada.

## Público-alvo

- Pequenos e médios vendedores.
- Empreendedores digitais.
- Lojistas de marketplaces.

## Funcionalidades

- Geração de títulos para produtos.
- Criação de descrições.
- Organização de características.
- Sugestões de melhoria para anúncios.

## Tecnologias utilizadas

- **Lovable:** interface e publicação.
- **Supabase:** backend e Edge Functions.
- **Google Gemini:** inteligência artificial generativa.
- **GitHub:** versionamento do código.

## Arquitetura e funcionamento

O usuário informa os dados do produto pela interface. A aplicação encaminha as informações ao backend no Supabase, que utiliza a API do Google Gemini para gerar o conteúdo e retornar os resultados.

A chave da API é mantida nos Secrets do Supabase, sem exposição no frontend.

## Testes e validação

Foram realizados testes com diferentes cenários, incluindo informações completas, incompletas, contraditórias e situações de erro.

Os cenários testados apresentaram o comportamento esperado durante as validações realizadas.

## Limitações e melhorias futuras

O conteúdo gerado precisa ser revisado pelo usuário, pois a IA pode produzir informações imprecisas.

Como evoluções futuras, estão previstas possibilidades como integração com marketplaces, histórico de anúncios e personalização por categoria de produto.

## Processo de desenvolvimento

O projeto passou pelas etapas de concepção, definição de funcionalidades, desenvolvimento da interface, integração com IA, testes, validação e publicação.

## Autor

Projeto idealizado e desenvolvido por **Willian Scher**, explorando aplicações práticas de inteligência artificial generativa, tecnologia e soluções digitais para o comércio eletrônico.
