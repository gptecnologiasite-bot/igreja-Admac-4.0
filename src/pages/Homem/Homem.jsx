import React, { useState, useEffect } from "react";
import {
  LuShield,
  LuTarget,
  LuAnchor,
  LuUsers,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuChevronRight,
  LuArrowRight,
  LuHeart,
  LuCamera
} from "react-icons/lu";
import { motion } from "framer-motion";
import dbService from "../../services/dbService";

const Homem = () => {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const loadContent = () => {
    const pageData = dbService.getPages().find(p => p.slug === 'ministerios/homens');
    if (pageData) {
      setPage(pageData);
      try {
        const parsedContent = typeof pageData.content === 'string' ? JSON.parse(pageData.content) : (pageData.content || {});
        setContent(parsedContent);
      } catch (e) {
        console.error("Error parsing Homens content", e);
        setContent({});
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContent();
    window.addEventListener('contentUpdated', loadContent);
    return () => window.removeEventListener('contentUpdated', loadContent);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center bg-white dark:bg-church-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-primary"></div>
      </div>
    );
  }

  const hero = content.hero || {
    title: "Homens de Honra",
    subtitle: "Apascentai o rebanho de Deus que está entre vós.",
    reference: "1 Pedro 5:2"
  };

  const pillars = content.pillars || [
    {
      icon: <LuShield className="w-8 h-8" />,
      title: "Sacerdócio",
      desc: "Liderando a família com integridade e amor sacrificial."
    },
    {
      icon: <LuTarget className="w-8 h-8" />,
      title: "Paternidade",
      desc: "Deixando um legado de fé para as próximas gerações."
    },
    {
      icon: <LuUsers className="w-8 h-8" />,
      title: "Discipulado",
      desc: "Homens afiando homens, crescendo juntos na Palavra."
    }
  ];

  const agenda = content.agenda || [
    { title: "Café com Oração", date: "Todo 1º Sábado", time: "08:00", location: "Salão Social" },
    { title: "Círculo de Oração Masculino", date: "Segundas-feiras", time: "19:30", location: "Templo Principal" },
    { title: "Congresso de Homens", date: "Novembro/2026", time: "19:00", location: "ADMAC Sede" }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-church-dark transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-church-dark to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2000&auto=format&fit=crop"
            alt="Homens Admac"
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-church-primary/20 text-church-primary dark:text-church-accent font-bold text-xs tracking-widest uppercase mb-6 border border-church-primary/30">
              Ministério de Homens
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
              {hero.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 italic font-medium border-l-4 border-church-primary pl-6">
              &quot;{hero.subtitle}&quot;
              <span className="block not-italic text-sm font-bold text-church-primary mt-2">{hero.reference}</span>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-church-primary/30 transition-all duration-300 group shadow-xl"
            >
              <div className="w-16 h-16 bg-church-primary/10 rounded-2xl flex items-center justify-center text-church-primary mb-8 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Agenda & Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Agenda */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter flex items-center gap-3">
                <LuCalendar className="text-church-primary" /> Nossa Agenda
              </h2>
              <div className="w-16 h-1.5 bg-church-primary rounded-full"></div>
            </div>

            <div className="space-y-4">
              {agenda.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/5 shadow-md flex justify-between items-center group hover:bg-church-primary/5 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{item.title}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><LuCalendar size={14} /> {item.date}</span>
                      <span className="flex items-center gap-1.5"><LuClock size={14} /> {item.time}</span>
                      <span className="flex items-center gap-1.5"><LuMapPin size={14} /> {item.location}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:bg-church-primary group-hover:text-white transition-all">
                    <LuChevronRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured/Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-12 rounded-[3rem] bg-church-primary text-white overflow-hidden shadow-2xl flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <LuAnchor className="w-64 h-64 -rotate-12" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 leading-tight">
                Integridade e Honra: O Chamado do Homem Cristão no Século XXI.
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-12 italic">
                &quot;Como o ferro com o ferro se afia, assim o homem afia o rosto do seu amigo.&quot; - Provérbios 27:17
              </p>
            </div>

            <button className="relative z-10 w-fit px-8 py-4 bg-white text-church-primary font-bold rounded-2xl flex items-center gap-3 hover:gap-5 transition-all shadow-lg active:scale-95">
              Ver Mais Estudos <LuArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Leaders Section - NEW */}
        <section className="mb-32">
          <div className="flex flex-col items-center mb-16">
            <div className="p-3 bg-church-primary/10 rounded-2xl text-church-primary mb-4">
              <LuUsers size={32} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Nossa Equipe</h2>
            <div className="w-16 h-1.5 bg-church-primary rounded-full mt-4"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
            {(content.leaders || [
              { name: "Carlos Rocha", role: "Coordenação", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" },
              { name: "Marcos Oliveira", role: "Líder de Homens", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
              { name: "André Santos", role: "Secretaria", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" }
            ]).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center w-full sm:w-auto"
              >
                <div className="relative mb-6 mx-auto w-48 h-48">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-church-primary/20 rounded-full blur-2xl group-hover:bg-church-primary/40 transition-colors duration-500"></div>

                  {/* Circle Frame */}
                  <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <img
                      src={member.image || member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-church-primary dark:group-hover:text-church-accent transition-colors">
                  {member.name}
                </h4>
                <p className="text-church-accent dark:text-church-accent font-black text-xs tracking-widest uppercase">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery Section - NEW */}
        <section className="mb-32">
          <div className="flex flex-col items-center mb-16">
            <div className="p-3 bg-church-primary/10 rounded-2xl text-church-primary mb-4">
              <LuCamera size={32} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Galeria de Fotos</h2>
            <div className="w-16 h-1.5 bg-church-primary rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(content.gallery || [
              { url: "https://images.unsplash.com/photo-1510003343711-64353896504a?q=80&w=600", caption: "Culto de Homens" },
              { url: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=600", caption: "Comunhão" },
              { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600", caption: "Liderança" },
              { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", caption: "Evento Especial" }
            ]).map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || `Foto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Quote */}
        <div className="mt-40 text-center py-20 border-y border-gray-100 dark:border-white/5">
          <LuHeart className="w-12 h-12 text-church-primary mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight uppercase tracking-tighter">
            Unidos em um só propósito: Servir ao Senhor e à sua Igreja.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Homem;
