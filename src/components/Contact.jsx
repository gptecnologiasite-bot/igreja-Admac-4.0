import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend } from 'react-icons/lu';
import dbService from '../services/dbService';

const Contact = () => {
    const [contactData, setContactData] = useState({
        address: 'Rua da Igreja, 123, Centro\nCidade - UF, 00000-000',
        phone: '(00) 1234-5678\n(00) 98765-4321',
        email: 'contato@admac.com.br\nsecretaria@admac.com.br',
        hours: 'Segunda a Sexta\n09:00 - 17:00'
    });

    useEffect(() => {
        const loadContact = () => {
            try {
                const page = dbService.getPageBySlug('inicio');
                if (page && page.content) {
                    const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
                    if (content.contact) {
                        setContactData(content.contact);
                    }
                }
            } catch (error) {
                console.error("Error loading contact:", error);
            }
        };

        loadContact();
        window.addEventListener('contentUpdated', loadContact);
        return () => window.removeEventListener('contentUpdated', loadContact);
    }, []);

    const renderLines = (text) => {
        if (!text) return '';
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <section id="contact" className="section-container">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-church-primary dark:text-white mb-4">Fale Conosco</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Tem alguma dúvida, pedido de oração ou quer nos visitar? Entre em contato conosco.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-church-light dark:bg-white/5 border border-gray-100 dark:border-white/10"
                        >
                            <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-church-primary dark:text-church-accent mb-4 shadow-sm">
                                <LuMapPin className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-church-primary dark:text-white mb-2">Endereço</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {renderLines(contactData.address)}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-church-light dark:bg-white/5 border border-gray-100 dark:border-white/10"
                        >
                            <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-church-primary dark:text-church-accent mb-4 shadow-sm">
                                <LuPhone className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-church-primary dark:text-white mb-2">Telefone</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {renderLines(contactData.phone)}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-church-light dark:bg-white/5 border border-gray-100 dark:border-white/10"
                        >
                            <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-church-primary dark:text-church-accent mb-4 shadow-sm">
                                <LuMail className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-church-primary dark:text-white mb-2">E-mail</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {renderLines(contactData.email)}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-2xl bg-church-light dark:bg-white/5 border border-gray-100 dark:border-white/10"
                        >
                            <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-lg flex items-center justify-center text-church-primary dark:text-church-accent mb-4 shadow-sm">
                                <LuClock className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-church-primary dark:text-white mb-2">Horário Secretaria</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {renderLines(contactData.hours)}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl shadow-church-primary/5"
                >
                    <h3 className="text-2xl font-bold text-church-primary dark:text-white mb-8">Envie uma Mensagem</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-church-primary dark:focus:border-church-accent focus:ring-0 transition-all dark:text-white" placeholder="Seu nome" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-church-primary dark:focus:border-church-accent focus:ring-0 transition-all dark:text-white" placeholder="seu@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assunto</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-church-primary dark:focus:border-church-accent focus:ring-0 transition-all dark:text-white">
                                <option className="dark:bg-church-dark">Dúvida Geral</option>
                                <option className="dark:bg-church-dark">Pedido de Oração</option>
                                <option className="dark:bg-church-dark">Visita pastoral</option>
                                <option className="dark:bg-church-dark">Informação sobre Ministérios</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-church-primary dark:focus:border-church-accent focus:ring-0 transition-all dark:text-white" placeholder="Escreva sua mensagem aqui..."></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary bg-church-primary dark:bg-church-accent dark:text-church-dark flex items-center justify-center gap-2 group">
                            Enviar Mensagem
                            <LuSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
