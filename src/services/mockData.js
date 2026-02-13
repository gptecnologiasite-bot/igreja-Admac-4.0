export const mockStats = {
  totalPages: 42,
  activePages: 38,
  totalVisits: 15420,
  registeredUsers: 1250,
};

export const visitData = [
  { name: 'Jan', visits: 4000 },
  { name: 'Fev', visits: 3000 },
  { name: 'Mar', visits: 2000 },
  { name: 'Abr', visits: 2780 },
  { name: 'Mai', visits: 1890 },
  { name: 'Jun', visits: 2390 },
  { name: 'Jul', visits: 3490 },
];

export const distributionData = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablet', value: 300 },
  { name: 'Outros', value: 200 },
];

export const pagesData = [
  { 
    id: 1, 
    title: 'Início', 
    slug: 'inicio', 
    status: 'Ativo', 
    visits: 5420, 
    lastUpdated: '2024-03-15',
    content: {
      hero: {
        badge: 'Bem-vindo à ADMAC',
        title: 'Uma Família para Pertencer',
        subtitle: 'Nós acreditamos no amor que transforma e na fé que renova. Venha fazer parte de uma comunidade apaixonada por Deus e comprometida com as pessoas.'
      },
      about: {
        title: 'Quem Somos',
        text1: 'A ADMAC (Assembléia de Deus Ministério Aliança Comunitária) é mais do que uma igreja, é um lugar onde você encontra propósito, esperança e uma família de fé.',
        text2: 'Fundada com o objetivo de ser um farol de luz em nossa comunidade, temos nos dedicado ao ensino das escrituras e ao cuidado mútuo.',
        mission: 'Levar a mensagem do evangelho a todas as nações, transformando vidas através do amor de Cristo.',
        vision: 'Ser uma igreja relevante, acolhedora e referencia na pregação da palavra e serviço social.',
        values: 'Amor incondicional, integridade, serviço ao próximo, adoração genuína e fidelidade bíblica.'
      },
      agenda: {
        title: 'Programação',
        description: 'Nossa programação semanal é pensada para que você e sua família possam desfrutar de momentos de comunhão e aprendizado.',
        nextEvent: {
          title: 'Conferência de Família - Março 15',
          label: 'Próximo Evento Especial'
        },
        events: [
          {
            day: 'Domingo',
            sessions: [
              { time: '09:00', title: 'Escola Bíblica Dominical', type: 'Ensino' },
              { time: '18:00', title: 'Culto de Celebração', type: 'Celebração' }
            ]
          },
          {
            day: 'Terça-feira',
            sessions: [
              { time: '19:30', title: 'Culto de Ensino & Oração', type: 'Oração' }
            ]
          }
        ]
      }
    }
  },
  { id: 2, title: 'Ministérios', slug: 'ministerios', status: 'Ativo', visits: 3400, lastUpdated: '2024-03-12' },
  { id: 3, title: 'Revista', slug: 'revista', status: 'Ativo', visits: 2100, lastUpdated: '2024-03-15' },
  { id: 4, title: 'Contato', slug: 'contato', status: 'Ativo', visits: 670, lastUpdated: '2024-03-14' },
  
  // Ministérios
  { 
    id: 10, 
    title: 'Liderança', 
    slug: 'ministerios/lideranca', 
    status: 'Ativo', 
    visits: 1200, 
    lastUpdated: '2024-03-15',
    content: {
      pastoralMessage: {
        text: "Nossa liderança não é sobre posição, é sobre serviço. Cada líder nesta igreja está comprometido em servir você e sua família.",
        author: "Pr. João Silva",
        role: "Pastor Presidente"
      },
      leaders: [
        { name: 'Pr. João Silva', role: 'Pastor Presidente', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Pra. Maria Silva', role: 'Pastora Vice-Presidente', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      testimonials: [
        { text: "A liderança desta igreja tem sido um exemplo de integridade e amor.", author: "Carlos Mendes", role: "Membro há 5 anos" }
      ],
      obreiros: {
        title: 'Corpo de Obreiros',
        text: 'Além do ministério pastoral, contamos com uma equipe dedicada de diáconos, presbíteros e evangelistas.'
      },
      chamado: {
        title: 'Nosso Chamado',
        text: 'Apascentai o rebanho de Deus, que está entre vós...',
        reference: '1 Pedro 5:2'
      }
    }
  },
  { 
    id: 11, 
    title: 'Casais', 
    slug: 'ministerios/casais', 
    status: 'Ativo', 
    visits: 850, 
    lastUpdated: '2024-03-15',
    content: {
      pastoralMessage: {
        text: "O casamento é um projeto de Deus para a felicidade do ser humano.",
        author: "Pr. João & Pra. Maria",
        role: "Coordenação de Casais"
      },
      leaders: [
        { name: 'Pr. João & Pra. Maria', role: 'Coordenação Geral', image: 'https://images.unsplash.com/photo-1516589174184-c68526674fd6?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      testimonials: [
        { text: "Participar do ministério de casais salvou nosso casamento.", author: "Marcos & Fernanda", role: "Casados há 12 anos" }
      ]
    }
  },
  { 
    id: 12, 
    title: 'Infantil', 
    slug: 'ministerios/infantil', 
    status: 'Ativo', 
    visits: 980, 
    lastUpdated: '2024-03-15',
    content: {
      leaders: [
        { name: 'Pra. Ana Oliveira', role: 'Coordenação Geral', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop' },
        { name: 'Tia Bete', role: 'Líder Berçário', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      pastoralMessage: {
        text: "Ensinar a uma criança sobre o amor de Jesus é plantar uma semente que dará frutos para a eternidade.",
        author: "Pra. Ana Oliveira",
        role: "Líder do Ministério Infantil"
      },
      testimonials: [
        { text: "Meus filhos amam vir para a igreja por causa do ministério infantil.", author: "Fernanda Lima", role: "Mãe do Theo e da Alice" }
      ]
    }
  },
  { 
    id: 13, 
    title: 'Louvor', 
    slug: 'ministerios/louvor', 
    status: 'Ativo', 
    visits: 1560, 
    lastUpdated: '2024-03-15',
    content: {
      pastoralMessage: {
        text: "O louvor é a expressão máxima do nosso amor e gratidão ao Criador.",
        author: "Pr. Carlos Oliveira",
        role: "Pastor de Adoração"
      },
      leaders: [
        { name: 'Pr. Carlos Oliveira', role: 'Ministro de Louvor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      testimonials: [
        { text: "O louvor da ADMAC me ajuda a focar inteiramente em Deus.", author: "Fabio Mendes", role: "Membro da Igreja" }
      ]
    }
  },
  { 
    id: 14, 
    title: 'Intercessão', 
    slug: 'ministerios/intercessao', 
    status: 'Ativo', 
    visits: 450, 
    lastUpdated: '2024-03-15',
    content: {
      pastoralMessage: {
        text: "A intercessão é o combustível que mantém a chama da igreja acesa.",
        author: "Ev. Roberto Silva",
        role: "Coordenador de Intercessão"
      },
      leaders: [
        { name: 'Ev. Roberto Silva', role: 'Líder Geral', image: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      testimonials: [
        { text: "Pedi oração em um momento de doença grave e recebi a cura.", author: "Beatriz Oliveira", role: "Membro ADMAC" }
      ]
    }
  },
  { 
    id: 15, 
    title: 'Escola Bíblica', 
    slug: 'ministerios/ebd', 
    status: 'Ativo', 
    visits: 2100, 
    lastUpdated: '2024-03-15',
    content: {
      pastoralMessage: {
        text: "A Escola Bíblica é o coração da igreja.",
        author: "Presb. Marcos André",
        role: "Superintendente da EBD"
      },
      leaders: [
        { name: 'Presb. Marcos André', role: 'Superintendente', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop' }
      ],
      classes: [
        { title: "Classe Adultos", theme: "As Epístolas de Paulo", teacher: "Prof. Cláudio Santos", time: "09:00" },
        { title: "Classe Juvenis", theme: "A Vida Escolhida", teacher: "Tia Sarah", time: "09:00" }
      ]
    }
  },

  // Revista
  { 
    id: 20, 
    title: 'Revista Kids', 
    slug: 'revista/kids', 
    status: 'Ativo', 
    visits: 300, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-blue-500/10 text-blue-500',
          title: 'Colorindo a Fé',
          excerpt: 'Atividades lúdicas para memorização de versículos básicos de forma criativa.',
          author: 'Profª Ana Paula',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800',
          content: '<h2>Colorindo a Fé: Atividades Criativas para Crianças</h2><p>A memorização de versículos bíblicos é fundamental para o desenvolvimento espiritual das crianças.</p>'
        }
      ]
    }
  },
  { 
    id: 21, 
    title: 'Revista Jovens', 
    slug: 'revista/jovens', 
    status: 'Ativo', 
    visits: 540, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-purple-500/10 text-purple-500',
          title: 'Propósito na Adolescência',
          excerpt: 'Descobrindo o plano de Deus para sua vida desde cedo.',
          author: 'Pr. Lucas Martins',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800',
          content: '<h2>Propósito na Adolescência</h2><p>Ser jovem cristão é descobrir sua identidade em Cristo.</p>'
        }
      ]
    }
  },
  { 
    id: 22, 
    title: 'Revista Louvor', 
    slug: 'revista/louvor', 
    status: 'Ativo', 
    visits: 420, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-indigo-500/10 text-indigo-500',
          title: 'Adoração Verdadeira',
          excerpt: 'O significado do louvor e adoração na vida cristã.',
          author: 'Ministério de Louvor',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1510832842230-87253f48d74f?q=80&w=800',
          content: '<h2>Adoração Verdadeira</h2><p>Louvor vai além de cantar músicas, é um estilo de vida.</p>'
        }
      ]
    }
  },
  { 
    id: 23, 
    title: 'Revista Mulheres', 
    slug: 'revista/mulheres', 
    status: 'Ativo', 
    visits: 670, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-pink-500/10 text-pink-500',
          title: 'Mulheres de Fé',
          excerpt: 'O papel da mulher cristã na família e na sociedade.',
          author: 'Pra. Maria Santos',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800',
          content: '<h2>Mulheres de Fé</h2><p>Mulheres que transformaram a história bíblica.</p>'
        },
        {
          id: 2,
          iconColor: 'bg-emerald-500/10 text-emerald-500',
          title: 'Grande Vigília das Mulheres',
          excerpt: 'Uma noite de adoração e clamor na direção das mulheres. "O fogo arderá continuamente..."',
          author: 'Pra. Celi Gomes & Pr. Roberto',
          date: '13 Fev 2026',
          image: '/vigilha.jpeg',
          content: '<h2>Grande Vigília das Mulheres</h2><p><strong>"O fogo arderá continuamente sobre o altar; não se apagará." (Lv 6:13)</strong></p><p>Participe conosco desta poderosa noite de busca e renovação espiritual.</p><ul><li><strong>Data:</strong> Sexta-feira, dia 13</li><li><strong>Horário:</strong> 20:00h às 00:00h</li><li><strong>Local:</strong> QN 516 Conj 1 Lote 1 - Samambaia Sul</li><li><strong>Preletores e Louvor:</strong> Pr. Roberto da Silva, Pra. Celi Gomes, Miss. Marcos e Banda, Lev. Ralisson, Lev. Thetullaine, Lev. Patricia.</li></ul>'
        }
      ]
    }
  },
  { 
    id: 24, 
    title: 'Revista Homens', 
    slug: 'revista/homens', 
    status: 'Ativo', 
    visits: 390, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-cyan-500/10 text-cyan-500',
          title: 'Homens de Coragem',
          excerpt: 'Liderança cristã e paternidade responsável.',
          author: 'Pr. João Silva',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
          content: '<h2>Homens de Coragem</h2><p>Ser um homem de Deus no século XXI.</p>'
        }
      ]
    }
  },
  { 
    id: 25, 
    title: 'Revista Lares', 
    slug: 'revista/lares', 
    status: 'Ativo', 
    visits: 280, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-emerald-500/10 text-emerald-500',
          title: 'Família Cristã',
          excerpt: 'Construindo um lar fundamentado nos princípios bíblicos.',
          author: 'Casal Silva',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800',
          content: '<h2>Família Cristã</h2><p>O lar é o primeiro campo missionário.</p>'
        }
      ],
      gallery: [
        { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600", caption: "Culto nos Lares" },
        { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600", caption: "Comunhão" },
        { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600", caption: "Estudo Bíblico" },
        { url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=600", caption: "Família ADMAC" }
      ]
    }
  },
  { 
    id: 26, 
    title: 'Revista Retiros', 
    slug: 'revista/retiros', 
    status: 'Ativo', 
    visits: 150, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-teal-500/10 text-teal-500',
          title: 'Descanso Espiritual',
          excerpt: 'A importância dos retiros para renovação da fé.',
          author: 'Equipe de Retiros',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800',
          content: '<h2>Descanso Espiritual</h2><p>Momentos de comunhão e renovação com Deus.</p>'
        }
      ]
    }
  },
  { 
    id: 27, 
    title: 'Revista Ação Social', 
    slug: 'revista/acao-social', 
    status: 'Ativo', 
    visits: 220, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-orange-500/10 text-orange-500',
          title: 'Amor em Ação',
          excerpt: 'Projetos sociais que transformam vidas na comunidade.',
          author: 'Equipe Social ADMAC',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
          content: '<h2>Amor em Ação</h2><p>Servir ao próximo é servir a Cristo.</p>'
        },
        {
          id: 2,
          iconColor: 'bg-blue-500/10 text-blue-500',
          title: 'Culto de Missões',
          excerpt: 'Missões é o coração de Deus batendo pelo mundo. Venha viver este chamado conosco!',
          author: 'Departamento de Missões',
          date: '15 Fev 2026',
          image: '/missao.jpeg',
          content: '<h2>Culto de Missões</h2><p><strong>"Ide por todo o mundo e pregai o evangelho a toda criatura."</strong></p><p>Missões é o coração de Deus batendo pelo mundo. Venha viver este chamado conosco!</p><ul><li><strong>Horário:</strong> Domingo, 19:00hs</li><li><strong>Local:</strong> ADMAC Sede - Samambaia Sul (QN 516 Conjunto 1 Lote 1)</li></ul>'
        }
      ]
    }
  },
  { 
    id: 28, 
    title: 'Revista EBD', 
    slug: 'revista/ebd', 
    status: 'Ativo', 
    visits: 560, 
    lastUpdated: '2024-03-15',
    content: {
      articles: [
        {
          id: 1,
          iconColor: 'bg-amber-500/10 text-amber-500',
          title: 'Ensino Bíblico',
          excerpt: 'Lições semanais para crescimento espiritual.',
          author: 'Superintendência EBD',
          date: '15 Jan 2026',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800',
          content: '<h2>Ensino Bíblico</h2><p>A Escola Bíblica fortalece nossa fé.</p>'
        }
      ]
    }
  },

  // Mídia
  {
    id: 30,
    title: 'Mídia',
    slug: 'midia',
    status: 'Ativo',
    visits: 3400,
    lastUpdated: '2024-03-15',
    content: {
      social: [
        { platform: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
        { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
        { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
      ],
      gallery: [
        { 
          id: 1,
          title: 'Culto de Domingo - 10/03', 
          url: 'https://youtube.com/watch?v=example1', 
          thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop'
        },
        { 
          id: 2,
          title: 'Conferência de Jovens', 
          url: 'https://youtube.com/watch?v=example2', 
          thumbnail: 'https://images.unsplash.com/photo-1519794206461-cccd885bf225?q=80&w=800&auto=format&fit=crop'
        }
      ],
      videos: [
        { id: 1, titulo: 'Culto de Domingo - 10/03', url: 'https://youtube.com/watch?v=example1', thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop' },
        { id: 2, titulo: 'Conferência de Jovens', url: 'https://youtube.com/watch?v=example2', thumbnail: 'https://images.unsplash.com/photo-1519794206461-cccd885bf225?q=80&w=800&auto=format&fit=crop' }
      ],
      audios: [
        { id: 1, titulo: 'Podcast #01 - Fé e Esperança', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { id: 2, titulo: 'Mensagem Pastoral - Março', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
      ],
      photos: [
        'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800',
        'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800',
        'https://images.unsplash.com/photo-1519794206461-cccd885bf225?q=80&w=800'
      ]
    }
  }
];
// Dados atualizados em 08/02/2026
