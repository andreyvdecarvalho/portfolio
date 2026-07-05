CONTEXTO — NÃO ALTERAR A SEÇÃO 1 EXISTENTE:
A Seção 1 (hero/showcase) já está implementada e funcionando: usa 3 imagens de um homem cibernético na mesma pose exata (mesmo enquadramento/posição), com efeito interativo próprio. Preserve 100% da lógica, estrutura e comportamento dela. NÃO reescreva, refatore ou modifique esse componente existente.

A ÚNICA exceção permitida: adicionar um elemento de transição no limite inferior da Seção 1 (ver "CONTINUIDADE" abaixo), para conectar visualmente com a Seção 2 que vem a seguir.

---

NOVAS SEÇÕES (2 a 5) — narrativa de aproximação progressiva:

Adicione 4 novas seções full-height (100vh cada) IMEDIATAMENTE após a Seção 1 existente, cada uma com uma imagem do mesmo universo visual (personagem cibernético, armadura preta, detalhes verde neon, visor com HUD), formando uma sequência de câmera se aproximando:

- Seção 2 → imagem "1.jpeg": plano mais aberto, personagem de perfil, ainda distante/misterioso
- Seção 3 → imagem "2.jpeg": câmera gira para 3/4, aproxima o enquadramento, primeiro contato com o visor
- Seção 4 → imagem "3.jpeg": aproximação maior, quase frontal, detalhes do HUD mais visíveis
- Seção 5 → imagem "4.jpeg": frontal total, close extremo, contato visual direto — momento de "revelação"

Cada seção deve conter a imagem em destaque (enquadramento cinematográfico) + espaço para título curto e uma linha de texto (pode usar placeholder por enquanto, definimos o conteúdo depois).

---

CONTINUIDADE ENTRE SEÇÃO 1 E SEÇÃO 2:
- Antes de implementar, inspecione a Seção 1 para identificar: (a) qual biblioteca de animação ela usa (Framer Motion, CSS puro, JS nativo etc.) e (b) qual é a cor de fundo dela
- Adicione um indicador de scroll sutil e animado no rodapé da Seção 1 (ex: chevron pulsante + texto pequeno "role para continuar"), sinalizando que há mais conteúdo abaixo
- Se o fundo da Seção 1 for claro e o das novas seções for escuro (ver Estética abaixo), crie uma faixa de transição em gradiente entre o final da Seção 1 e o início da Seção 2, evitando um corte abrupto de tom
- Garanta que a biblioteca usada nas novas seções (GSAP + ScrollTrigger) não entre em conflito com a lógica de scroll/mouse já existente na Seção 1 (sem listeners duplicados, sem jank de performance)

---

EFEITOS DE SCROLL (a partir da Seção 2):
- Use GSAP com ScrollTrigger para orquestrar as transições entre as seções 2 a 5
- Parallax: a imagem de cada seção se move em velocidade diferente do texto/background ao scrollar (imagem mais lenta, criando profundidade)
- Transição entre seções: crossfade + leve scale up (zoom sutil), reforçando a sensação de "aproximação" já presente na sequência das imagens
- Cada imagem entra com fade-in + leve movimento vertical (de baixo para cima) ao entrar no viewport, e sai com fade-out ao ser substituída pela próxima
- Brilho/glow sutil pulsante nos elementos verdes da imagem (via CSS filter/box-shadow animado), reforçando a estética tech/neon
- Scroll suave (smooth scroll) entre as seções
- Respeite prefers-reduced-motion: reduza ou remova parallax/zoom para quem tem essa preferência ativada, mantendo apenas um fade simples

---

ESTÉTICA:
- Fundo escuro (tons de preto/cinza-chumbo) nas seções 2 a 5, contrastando com o fundo claro das imagens e destacando o brilho verde neon
- Tipografia tech/futurista, texto em branco ou verde neon (#00ff88 ou similar)
- Visual minimalista — o foco é a imagem e a sensação de imersão progressiva
- Mantenha consistência de paleta com a Seção 1 (reaproveite as mesmas cores de destaque, se já existirem)

---

RESPONSIVIDADE:
- Funcionar bem em mobile, adaptando o parallax para ser mais sutil em telas pequenas (performance)
- Testar que a transição de continuidade entre Seção 1 e 2 também funcione bem em mobile, sem elementos cortados

Comece inspecionando a Seção 1 atual e implementando a transição de continuidade, depois construa a estrutura das seções 2 a 5 com a lógica de scroll/parallax do GSAP.