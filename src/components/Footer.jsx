import React from 'react';
import { LuChurch, LuFacebook, LuInstagram, LuYoutube, LuMapPin, LuPhone, LuMail } from 'react-icons/lu';
import dbService from '../services/dbService';

const Footer = () => {
    const settings = dbService.getSettings();

    return (
        <footer className="bg-church-dark dark:bg-black text-white pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Church Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            {settings.logoUrl ? (
                                <>
                                    <img
                                        src={settings.logoUrl}
                                        alt={settings.siteName}
                                        className="h-10 w-auto object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden p-2 bg-church-primary rounded-lg border border-white/20">
                                        <LuChurch className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight">{settings.siteName}</span>
                                </>
                            ) : (
                                <>
                                    <div className="p-2 bg-church-primary rounded-lg border border-white/20">
                                        <LuChurch className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight">{settings.siteName}</span>
                                </>
                            )}
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Uma comunidade de fé comprometida com a pregação do evangelho e o amor ao próximo. Junte-se a nós em nossa jornada de fé.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-church-primary transition-all">
                                <LuInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-church-primary transition-all">
                                <LuFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-church-primary transition-all">
                                <LuYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
                        <ul className="space-y-4">
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Quem Somos</a></li>
                            <li><a href="#ministries" className="text-gray-400 hover:text-white transition-colors">Ministérios</a></li>
                            <li><a href="#agenda" className="text-gray-400 hover:text-white transition-colors">Programação</a></li>
                            <li><a href="#media" className="text-gray-400 hover:text-white transition-colors">Mídia</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <LuMapPin className="w-5 h-5 text-church-accent shrink-0" />
                                <span className="text-gray-400">Rua da Igreja, 123, Centro, Cidade-UF</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <LuPhone className="w-5 h-5 text-church-accent shrink-0" />
                                <span className="text-gray-400">(00) 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <LuMail className="w-5 h-5 text-church-accent shrink-0" />
                                <span className="text-gray-400">contato@admac.com.br</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} {settings.siteName} - Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
