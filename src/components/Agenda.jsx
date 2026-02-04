import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import dbService from '../services/dbService';

const Agenda = () => {
    const [agendaData, setAgendaData] = useState({
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
            },
            {
                day: 'Quinta-feira',
                sessions: [
                    { time: '19:30', title: 'Reunião de Ministérios', type: 'Liderança' }
                ]
            },
            {
                day: 'Sábado',
                sessions: [
                    { time: '19:00', title: 'Jovens Aliança (Quinzenal)', type: 'Juventude' }
                ]
            }
        ]
    });

    useEffect(() => {
        const loadAgenda = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.agenda) {
                        setAgendaData(content.agenda);
                    }
                }
            } catch (error) {
                console.error("Error loading agenda:", error);
            }
        };

        loadAgenda();
        window.addEventListener('storage', loadAgenda);
        // Custom event for immediate updates within same tab
        window.addEventListener('settingsUpdated', loadAgenda);

        return () => {
            window.removeEventListener('storage', loadAgenda);
            window.removeEventListener('settingsUpdated', loadAgenda);
        };
    }, []);

    const { title, description, nextEvent, events } = agendaData;

    return (
        <section id="agenda" className="section-container bg-church-primary dark:bg-church-dark text-white transition-colors duration-300">
            <div className="lg:flex lg:items-start lg:gap-20">
                <div className="lg:w-1/3 mb-16 lg:mb-0">
                    <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        {description}
                    </p>
                    <div className="inline-flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-church-accent rounded-xl flex items-center justify-center text-church-dark">
                            <CalendarIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">{nextEvent?.label || 'Próximo Evento Especial'}</p>
                            <p className="font-bold">{nextEvent?.title || 'Conferência de Família - Março 15'}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.day}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all"
                        >
                            <h3 className="text-xl font-bold text-church-accent mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                {event.day}
                            </h3>
                            <div className="space-y-6">
                                {event.sessions.map((session, sIdx) => (
                                    <div key={sIdx} className="relative pl-6 border-l-2 border-white/20">
                                        <div className="absolute top-0 -left-[5px] w-2 h-2 bg-church-accent rounded-full"></div>
                                        <p className="text-church-accent font-mono font-bold leading-none mb-1">{session.time}</p>
                                        <p className="font-semibold text-lg">{session.title}</p>
                                        <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">{session.type}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Agenda;
