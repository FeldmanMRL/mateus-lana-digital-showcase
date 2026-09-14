# Plano: Interações e animações do portfólio

## Objetivo
Deixar o portfólio mais fluido e interativo, preservando a estética dark luxury atual e sem alterar o conteúdo já aprovado.

## Alterações
- Justificar os textos descritivos com espaçamento e largura controlados para manter boa leitura em telas pequenas.
- Fazer cada porcentagem iniciar em 0 quando sua habilidade entrar na tela, sincronizada com o preenchimento animado da barra.
- Transformar a trajetória em uma sequência visual: a linha vertical será preenchida conforme a rolagem, conectando um cargo ao seguinte, com marcadores e itens entrando em ordem.
- Refinar interações existentes: brilho acompanha o cursor nos cartões, microanimações em links e botões, e movimentos suaves no fundo e nas seções.
- Respeitar a preferência do sistema por movimento reduzido, removendo animações intensas quando necessário.

## Verificação
- Conferir as animações ao rolar no desktop e no celular.
- Validar que os textos não transbordam, os cartões continuam legíveis e todos os botões e projetos funcionam.
- Confirmar que a página carrega sem erros.

## Detalhes técnicos
- Usar `IntersectionObserver` para disparar contadores e entradas apenas quando cada elemento ficar visível.
- Calcular o progresso da linha da trajetória conforme a posição da seção na tela.
- Aplicar efeitos com CSS e eventos leves de ponteiro, sem adicionar dependências pesadas.
