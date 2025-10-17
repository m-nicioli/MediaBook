# Documento de Decisões de Design - Diário de Mídia Digital

## Resumo do Projeto
Sistema de diário de mídia digital para organizar e acompanhar o consumo de conteúdo cultural (livros, filmes, séries e anime), seguindo princípios de design centrado no usuário.

## Princípios de Design Aplicados

### 1. Model Human Processor (MHP)
- **Feedback rápido**: Todas as ações geram feedback visual em ~2 segundos
- **Toasts informativos**: Confirmação imediata de ações (adicionar mídia, alterar status, avaliar)
- **Estados visuais**: Loading states e transições suaves para reduzir ansiedade

### 2. Sistema de Cores
- **Branco (#ffffff)**: Fundo principal para máxima legibilidade
- **Laranja (#f97316)**: Cor de destaque para CTAs e elementos interativos
- **Preto/Cinza escuro**: Texto principal para contraste ideal
- **Cinzas**: Elementos secundários e bordas sutis

### 3. Lei de Hick (Redução de Opções)
- **Filtros simples**: Máximo de 5 tipos de mídia e 4 status
- **Grid limpo**: Layout organizado sem excesso de informações
- **Navegação direta**: Ações principais sempre visíveis

### 4. Lei de Fitts (Facilidade de Acesso)
- **Botões grandes**: Mínimo 44px de altura (padrão de acessibilidade)
- **Área de clique expandida**: Padding generoso em elementos interativos
- **Menus fixos**: Filtros sempre acessíveis na lateral
- **Evitar ícones pequenos**: Ícones com pelo menos 16px

### 5. Semiótica (Comunicação Clara)
- **Ícones universais**: Film, TV, Book, Star para fácil reconhecimento
- **Labels descritivos**: "Planejando", "Assistindo/Lendo", "Concluído"
- **Tooltips informativos**: Contexto adicional quando necessário
- **Hierarquia visual clara**: Títulos, subtítulos e texto corpo bem definidos

### 6. Carga Cognitiva Reduzida
- **Informações essenciais**: Apenas poster, título, ano e status principal
- **Progressão visual**: Barras de progresso para acompanhamento
- **Agrupamento lógico**: Filtros organizados por categoria

### 7. Teoria da Atividade (Ações com Propósito)
- **Filtros funcionais**: Organização por tipo e status
- **Compartilhamento futuro**: Preparado para recursos sociais
- **Gestão de estado**: Controle completo sobre progresso e avaliações

### 8. Ciclo de Norman (Execução → Avaliação)
- **Objetivos claros**: Interface intuitiva para diferentes tipos de usuário
- **Execução facilitada**: Formulários simples e validações em tempo real
- **Feedback contínuo**: Estados visuais e confirmações
- **Avaliação dos resultados**: Visualização clara do progresso e coleção

### 9. Princípios da Gestalt
- **Proximidade**: Elementos relacionados agrupados visualmente
- **Similaridade**: Cards de mídia seguem padrão visual consistente
- **Continuidade**: Layout em grid com alinhamento preservado
- **Fechamento**: Cards completos com bordas e sombras definidas

## Especificações Técnicas

### Tipografia
- **Fonte base**: Sistema de fontes padrão do navegador
- **Escala hierárquica**:
  - H1: 24px, weight 500
  - H2: 20px, weight 500
  - H3: 18px, weight 500
  - Body: 16px, weight 400
  - Small: 14px, weight 400

### Espaçamentos
- **Grid principal**: 8px como unidade base
- **Cards**: 16px padding interno
- **Gap entre elementos**: 16px-24px
- **Margens de container**: 32px em desktop, 16px em mobile

### Componentes

#### MediaCard
- **Aspect ratio**: 2:3 para posters (padrão da indústria)
- **Hover states**: Elevação sutil com sombra
- **Progress bars**: Altura 6px, cor laranja
- **Rating stars**: 16px, interativas com hover

#### Filtros
- **Badges com contadores**: Feedback quantitativo
- **Estados ativos**: Fundo laranja com texto branco
- **Layout responsivo**: Stack vertical em mobile

#### Formulários
- **Validação em tempo real**: Campos obrigatórios marcados
- **Placeholders informativos**: Orientação clara
- **Estados de erro**: Bordas vermelhas e mensagens explicativas

### Responsividade
- **Mobile first**: Base 375px
- **Breakpoints**:
  - sm: 640px (2 colunas)
  - md: 768px (3 colunas)
  - lg: 1024px (4 colunas + sidebar)
  - xl: 1280px (5 colunas)

### Acessibilidade
- **Contraste**: Mínimo 4.5:1 para texto normal
- **Navegação por teclado**: Todos os elementos focáveis
- **Screen readers**: Labels e aria-labels adequados
- **Tamanhos de toque**: Mínimo 44px

### Performance
- **Imagens otimizadas**: Lazy loading e fallbacks
- **Estados de loading**: Skeletons para carregamento
- **Debounce**: Filtros com delay de 300ms

## Futuras Melhorias
1. **Backend integration**: Persistência de dados com Supabase
2. **Busca avançada**: Filtros por ano, gênero, avaliação
3. **Recursos sociais**: Compartilhamento de listas e recomendações
4. **Estatísticas**: Dashboards de consumo e tendências
5. **Importação**: Integração com APIs de filmes/livros (TMDB, Google Books)
6. **Modo offline**: Service workers para acesso sem internet